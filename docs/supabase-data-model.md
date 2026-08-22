# Modelo de datos futuro para Supabase — Credencial Digital M.T.C.P.

## Control del documento

| Campo | Valor |
| --- | --- |
| Producto | Credencial Digital M.T.C.P. |
| Versión | 1.0 |
| Estado | Borrador para validación con M.T.C.P. |
| Alcance | Modelo conceptual futuro para Supabase |
| Proyecto previsto | `credencial-mtcp` (`sa-east-1`) |
| Implementación | No incluida en este documento |

## 1. Objetivo del modelo

El modelo debe sostener una aplicación con dos ámbitos claramente separados:

1. Una experiencia pública para cualquier visitante, con contenido administrable y publicado por M.T.C.P.
2. Un área privada para cuentas autenticadas que hayan sido vinculadas y aprobadas contra un registro oficial de afiliado.

Debe permitir:

- Contenido público administrable.
- Registro y autenticación de cuentas.
- Perfiles básicos declarados por los usuarios.
- Beneficios y convenios públicos.
- Turismo y paquetes públicos.
- Novedades públicas.
- Sedes y delegaciones públicas.
- Afiliados reales y sus datos privados.
- Credenciales digitales privadas.
- Vinculación entre una cuenta y un afiliado.
- Estados de cuenta, afiliación, credencial y validación.
- Auditoría de aprobaciones, rechazos, revocaciones y accesos sensibles.
- Separación técnica y de permisos entre contenido público y datos privados.
- Migración progresiva desde los mocks actuales sin exigir un reemplazo total en una sola etapa.

Este documento no crea tablas, SQL, migraciones, políticas ni conexiones. Define la base para diseñarlas y revisarlas antes de implementar.

### 1.1 Principios rectores

- **Registrarse no prueba afiliación.** Nombre, apellido, DNI y email son datos declarados hasta que M.T.C.P. los valide.
- **Autenticación no equivale a autorización.** Una sesión válida identifica una cuenta; no habilita por sí sola una credencial.
- **La fuente oficial prevalece.** `affiliates` representa registros aportados o validados por M.T.C.P.; `profiles` no puede sustituirlos.
- **Denegación por defecto.** Todo acceso privado debe estar cerrado salvo una regla explícita que lo autorice.
- **Mínimo dato necesario.** Se almacena y expone solamente lo necesario para la finalidad definida.
- **Trazabilidad.** Las decisiones administrativas sensibles deben indicar quién actuó, cuándo y sobre qué registro.
- **Revocación independiente.** M.T.C.P. debe poder revocar el acceso privado sin eliminar la cuenta pública del usuario.

## 2. Separación principal

### A. Identidad y autenticación

- `auth.users`: identidad, contraseña, verificación de email y sesiones administradas por Supabase Auth.
- `profiles`: datos básicos declarados y estado operativo de la cuenta.

### B. Contenido público

- `benefit_categories`.
- `benefits`.
- `benefit_locations`.
- `delegations`.
- `tourism_items`.
- `news_items`.
- `institutional_content`.
- `app_config`.

### C. Datos privados

- `affiliates`.
- `credentials`.
- `user_affiliates`.
- `affiliate_status_history`.
- `credential_status_history`.

### D. Validación y auditoría

- `affiliate_validation_requests`.
- `access_audit_logs`.
- `admin_audit_logs`.
- `contact_verification_events`.
- `activation_codes`, únicamente si el mecanismo de activación elegido lo requiere.

```text
visitante ───────────────► contenido publicado

auth.users ──1:1────────► profiles
     │
     ├──1:N─────────────► affiliate_validation_requests
     │                              │ revisión M.T.C.P.
     │                              ▼
     └──1:N─────────────► user_affiliates ◄────────N:1── affiliates
                                  status=approved           │
                                           │                ├──1:N── affiliate_status_history
                                           │                └──1:N── credentials
                                           │                            │
                                           └──── habilita lectura ──────┘
                                                                        └──1:N── credential_status_history
```

La relación `user_affiliates` es la frontera de autorización. Una coincidencia entre `profiles.declared_dni` y `affiliates.dni` puede ayudar a revisar una solicitud, pero nunca debe crear una aprobación automática.

## 3. Convenciones de diseño recomendadas

Estas convenciones deben confirmarse al preparar la migración real:

- Identificadores y nombres en minúsculas con `snake_case`.
- `auth_user_id` debe usar el mismo tipo UUID que `auth.users.id`.
- Para identificadores internos de las demás tablas se recomienda `bigint identity`; si un identificador se expone y se necesita que sea opaco, se puede optar por UUID ordenable. La decisión debe ser uniforme.
- DNI, teléfonos, números de socio y códigos son texto, no números: pueden requerir ceros, normalización o formatos no aritméticos.
- Fechas con hora se almacenan como `timestamptz` en UTC; fechas civiles sin hora, como `date`.
- Estados finitos deben validarse mediante `check` o tipos controlados, sin aceptar texto arbitrario.
- Todas las claves foráneas deben tener una política explícita de borrado y un índice cuando participen en joins, filtros o RLS.
- Los campos `created_at` y `updated_at` deben ser definidos por backend/base de datos, no confiados al cliente.
- Los slugs, identificadores oficiales y relaciones uno-a-uno deben tener restricciones de unicidad donde corresponda.
- En datos oficiales y auditoría se prefiere desactivar el borrado físico desde clientes y usar estados, revocación o retención controlada.
- Toda tabla en un esquema expuesto a la Data API debe tener RLS habilitada y privilegios mínimos. RLS controla filas; los privilegios controlan si una operación sobre la tabla está disponible.

### 3.1 Índices mínimos a evaluar

Sin definir SQL todavía, la futura migración deberá evaluar al menos índices sobre:

- Todas las claves foráneas.
- `profiles.auth_user_id` como único.
- `profiles.declared_dni` normalizado, solo para procesos internos autorizados.
- `benefits.slug`, `tourism_items.slug` y `news_items.slug` como únicos.
- Publicación y vigencia de contenido: `is_published`, `is_active`, `valid_from`, `valid_until`, `published_at`.
- `user_affiliates.auth_user_id`, `affiliate_id` y `status`, incluyendo una regla que evite más de un vínculo aprobado incompatible.
- `affiliate_validation_requests.auth_user_id`, `status` y `created_at`.
- `affiliates.internal_affiliate_id`, `member_number` y DNI normalizado según las reglas de la fuente oficial.
- Columnas usadas en RLS y búsquedas frecuentes.
- Auditorías por actor, recurso y fecha.

Los índices no sustituyen restricciones de unicidad ni reglas de integridad.

## 4. Identidad y cuentas

### 4.1 `auth.users`

**Propósito:** representar la identidad autenticable administrada por Supabase Auth.

**Responsabilidades:**

- Email de login y su verificación.
- Contraseña con el tratamiento seguro provisto por Auth.
- Sesiones y tokens.
- Recuperación de acceso.
- Identificador estable de la cuenta (`auth.users.id`).

**No debe contener ni decidir:**

- Afiliación oficial.
- Estado oficial del afiliado.
- Número de socio o credencial como fuente de autorización.
- Permiso de acceso a la credencial basado en `user_metadata`.

El esquema `auth` es administrado por Supabase y no se expone como una tabla pública de aplicación. No debe editarse directamente desde el frontend.

### 4.2 `profiles`

**Propósito:** guardar el perfil básico declarado de una cuenta y su estado operativo de negocio. No representa afiliación oficial.

| Campo | Tipo conceptual | Regla o uso |
| --- | --- | --- |
| `id` | ID interno | Clave primaria. |
| `auth_user_id` | UUID | FK única a `auth.users.id`; una cuenta tiene un perfil. |
| `first_name` | Texto | Nombre declarado y normalizado. |
| `last_name` | Texto | Apellido declarado y normalizado. |
| `declared_dni` | Texto sensible | Declaración para solicitar validación; no autoriza. |
| `email` | Texto | Copia operativa normalizada si el producto la necesita; Auth continúa siendo fuente de identidad de login. |
| `account_status` | Estado controlado | Estado operativo de negocio. |
| `created_at` | Fecha/hora | Creación del perfil. |
| `updated_at` | Fecha/hora | Última modificación. |

Estados previstos:

- `pending_email_verification`.
- `active_non_affiliate`.
- `pending_affiliate_validation`.
- `blocked`.
- `rejected`.

`rejected` debe definirse con precisión: se recomienda que describa el resultado de una validación, no una cuenta irrecuperable. Si el rechazo pertenece a una solicitud, la fuente detallada debe ser `affiliate_validation_requests`, evitando mezclar estado de cuenta con estado del trámite.

**Lectura:** el usuario autenticado puede leer su propio perfil; personal autorizado puede leer lo necesario para soporte o revisión.

**Modificación:** el usuario puede actualizar solamente campos declarativos habilitados. `account_status`, `auth_user_id` y cualquier atributo de autorización son inmutables desde el cliente. Los cambios de email deben pasar por el flujo de Supabase Auth y sincronizarse de manera controlada si existe la copia en `profiles`.

**RLS conceptual:** `SELECT` propio mediante identidad de sesión; `UPDATE` propio con lista limitada de columnas y validación del propietario tanto antes como después del cambio. Crear el perfil requiere un flujo controlado vinculado al usuario autenticado.

**Riesgos:** usar el perfil como fuente oficial, permitir editar el estado, filtrar por DNI desde el cliente, duplicar emails sin sincronización o exponer perfiles ajenos.

## 5. Contenido público

"Público" significa que los roles `anon` y `authenticated` pueden leer únicamente registros expresamente publicables. No significa que puedan listar borradores, editar tablas ni leer campos internos. Las escrituras corresponden a personal autorizado o a un backend seguro.

### 5.1 `benefit_categories`

**Propósito:** clasificar beneficios y convenios, ordenar filtros y definir su presentación.

**Campos:** `id`, `name`, `slug`, `icon`, `color`, `sort_order`, `is_active`, `created_at`, `updated_at`.

**Reglas:** `slug` único; `sort_order` con valor válido; color e icono deben seguir formatos permitidos. Una categoría inactiva no se ofrece como filtro público, aunque su historial puede conservarse.

**Acceso/RLS:** visitantes y usuarios autenticados leen filas con `is_active = true`. Personal con permiso de contenidos crea, modifica y desactiva. No se habilita escritura pública.

### 5.2 `benefits`

**Propósito:** almacenar beneficios y convenios publicados por M.T.C.P.

**Campos requeridos:** `id`, `title`, `slug`, `category_id`, `summary`, `description`, `highlight`, `discount_text`, `conditions`, `image_url`, `logo_url`, `contact_phone`, `contact_whatsapp`, `contact_email`, `instagram`, `website_url`, `is_featured`, `is_published`, `valid_from`, `valid_until`, `created_at`, `updated_at`.

**Campo adicional recomendado:** `content_type`, con valores controlados como `benefit` y `agreement`, para distinguir beneficios de convenios sin duplicar tablas ni perder semántica.

**Relaciones:** `category_id` referencia `benefit_categories`; sus ubicaciones se registran en `benefit_locations`.

**Reglas de publicación:** `slug` único; solo es público cuando `is_published = true`; las fechas de vigencia deben ser coherentes. Debe definirse si un contenido vencido deja de mostrarse automáticamente o permanece visible marcado como vencido. `is_featured` no reemplaza `is_published`.

**Acceso/RLS:** `anon` y `authenticated` leen filas publicadas. Personal de contenidos puede crear, editar, publicar y despublicar según su rol. Borradores y notas internas no se exponen.

### 5.3 `benefit_locations`

**Propósito:** expresar dónde aplica un beneficio o convenio, permitiendo múltiples ubicaciones por registro.

**Campos:** `id`, `benefit_id`, `delegation_id`, `city`, `address`, `latitude`, `longitude`, `availability_text`, `created_at`, `updated_at`.

**Relaciones:** `benefit_id` referencia `benefits`; `delegation_id` referencia `delegations` y puede ser nulo si la ubicación no corresponde a una delegación.

**Reglas de publicación:** una ubicación es pública únicamente cuando el beneficio padre está publicado. Debe evitarse una fila duplicada para la misma combinación de beneficio y ubicación. Latitud y longitud requieren rangos válidos.

**Acceso/RLS:** lectura pública condicionada a la publicación del beneficio padre; escritura solo para personal autorizado de contenidos.

### 5.4 `delegations`

**Propósito:** almacenar sedes y delegaciones oficiales para contacto, filtros y asociación con afiliados o beneficios.

**Campos:** `id`, `name`, `province`, `city`, `address`, `phone`, `whatsapp`, `email`, `opening_hours`, `is_active`, `created_at`, `updated_at`.

**Reglas de publicación:** las filas activas son visibles; datos de contacto deben validarse y mantenerse. Si una sede deja de operar se desactiva, preservando relaciones históricas.

**Acceso/RLS:** lectura pública de `is_active = true`; altas y cambios solo por personal autorizado. Datos internos de una delegación, si aparecen en el futuro, deben almacenarse fuera de esta proyección pública.

### 5.5 `tourism_items`

**Propósito:** publicar propuestas de turismo y paquetes.

**Campos requeridos:** `id`, `title`, `slug`, `summary`, `description`, `image_url`, `price_text`, `financing_text`, `valid_from`, `valid_until`, `is_published`, `is_featured`, `created_at`, `updated_at`.

**Campo adicional recomendado:** `item_type`, con valores controlados como `tourism` y `package`, si la interfaz o las reglas requieren diferenciarlos.

**Reglas de publicación:** `slug` único; lectura pública solamente si está publicado y de acuerdo con la política de vigencia. `price_text` y `financing_text` son contenido informativo, no un sistema de pagos ni una fuente contable.

**Acceso/RLS:** lectura pública de filas publicadas; escritura y publicación solo por personal de contenidos.

### 5.6 `news_items`

**Propósito:** publicar novedades institucionales.

**Campos:** `id`, `title`, `slug`, `summary`, `body`, `image_url`, `published_at`, `is_published`, `created_at`, `updated_at`.

**Reglas de publicación:** `slug` único; una novedad es pública cuando `is_published = true` y `published_at` no está en el futuro, salvo que se defina prepublicación. Despublicar no elimina el registro.

**Acceso/RLS:** lectura pública de filas publicadas; gestión solo por personal autorizado.

### 5.7 `institutional_content`

**Propósito:** mantener bloques institucionales identificados por una clave estable, por ejemplo términos, privacidad, contacto o información sobre M.T.C.P.

**Campos requeridos:** `key`, `title`, `body`, `updated_at`.

**Campos adicionales recomendados:** `is_published`, `updated_by` y, si habrá versiones legales, `version` y `effective_at`.

**Reglas de publicación:** `key` es clave primaria o única. Solo las claves expresamente publicadas se exponen. Los textos legales aceptados por usuarios no deben sobrescribirse sin versionado cuando se requiera prueba de aceptación.

**Acceso/RLS:** lectura pública de contenido publicado; modificación solo por personal autorizado con auditoría en contenido legal.

### 5.8 `app_config`

**Propósito:** almacenar configuración funcional administrable y no secreta.

**Campos requeridos:** `key`, `value`, `updated_at`.

**Campos adicionales recomendados:** `is_public`, `description` y `updated_by`. `value` puede ser JSON estructurado, con validación por clave.

**Reglas de publicación:** únicamente filas marcadas `is_public = true` pueden llegar al cliente. Nunca debe contener claves secretas, `service_role`, credenciales, reglas internas de fraude ni datos personales.

**Acceso/RLS:** lectura pública solo de la lista permitida; modificación administrativa controlada. Configuración sensible debe vivir en secretos del entorno o infraestructura, no en esta tabla expuesta.

### 5.9 Resumen de acceso público

| Tabla | Lectura visitante | Lectura autenticada | Escritura |
| --- | --- | --- | --- |
| `benefit_categories` | Solo activas | Solo activas | Personal de contenidos |
| `benefits` | Solo publicados | Solo publicados | Personal de contenidos |
| `benefit_locations` | Solo de beneficios publicados | Igual | Personal de contenidos |
| `delegations` | Solo activas | Solo activas | Personal autorizado |
| `tourism_items` | Solo publicados | Solo publicados | Personal de contenidos |
| `news_items` | Solo publicadas | Solo publicadas | Personal de contenidos |
| `institutional_content` | Solo publicado | Solo publicado | Personal autorizado |
| `app_config` | Solo claves públicas | Solo claves públicas | Personal técnico autorizado |

## 6. Datos privados

Las tablas de esta sección contienen datos personales u operativos que no deben estar disponibles para visitantes ni para cualquier cuenta autenticada. Si se ubican en un esquema expuesto, deben tener RLS estricta y privilegios mínimos; para operaciones exclusivamente administrativas debe evaluarse un esquema no expuesto y acceso por backend seguro.

### 6.1 `affiliates`

**Propósito:** representar los afiliados reales provenientes de la fuente oficial de M.T.C.P.

| Campo | Sensibilidad y regla |
| --- | --- |
| `id` | Clave primaria interna, no DNI. |
| `internal_affiliate_id` | Identificador estable de la fuente oficial; único y no reutilizable. |
| `dni` | Dato personal sensible; texto normalizado, nunca contraseña ni clave primaria. |
| `first_name`, `last_name` | Datos personales oficiales. |
| `member_number` | Dato privado; unicidad según la regla institucional. |
| `delegation_id` | FK a `delegations`; puede condicionar beneficios. |
| `company` | Dato privado, mostrar solo si está autorizado. |
| `status` | Estado oficial controlado. |
| `joined_at`, `expires_at` | Fechas oficiales de afiliación y vigencia. |
| `created_at`, `updated_at` | Trazabilidad técnica. |

Estados previstos: `active`, `grace_period`, `inactive`, `suspended`.

**Lectura:** un afiliado validado puede leer únicamente su registro vinculado y solo los campos autorizados. Una cuenta registrada sin aprobación no puede consultar ni buscar esta tabla. Personal autorizado accede según su función.

**Modificación:** únicamente importaciones controladas, backend seguro o personal con permiso específico. El afiliado no modifica su registro oficial desde la app.

**RLS conceptual:** permitir `SELECT` cuando existe para la sesión una fila compatible en `user_affiliates` con `status = approved`, la cuenta está operativa y la regla institucional del estado permite el acceso. Las políticas deben filtrar por el afiliado vinculado, no solo por rol `authenticated`.

**Riesgos:** enumeración de DNI, acceso horizontal a otros afiliados, datos oficiales sobrescritos por datos declarados, exposición excesiva de columnas y divergencia con la fuente institucional.

### 6.2 `credentials`

**Propósito:** representar la credencial digital asociada a un afiliado y su vigencia.

| Campo | Sensibilidad y regla |
| --- | --- |
| `id` | Clave primaria interna. |
| `affiliate_id` | FK a `affiliates`; indexada. |
| `credential_number` | Identificador privado; único según regla institucional. |
| `status` | Estado controlado a definir, por ejemplo `active`, `expired`, `suspended`, `revoked`. |
| `valid_from`, `valid_until` | Fechas de vigencia coherentes. |
| `card_front_data`, `card_back_data` | Datos estructurados mínimos para renderizar; nunca secretos ni autorización. |
| `updated_at` | Última actualización. |

Se recomienda definir un esquema versionado para `card_front_data` y `card_back_data`, o reemplazarlos por columnas explícitas si los datos son estables. No deben duplicar información sensible sin necesidad ni convertirse en una vía para saltar las reglas de `affiliates`.

**Lectura:** solo el usuario con vínculo aprobado al afiliado correspondiente, sujeto al estado de cuenta, afiliado y credencial. Personal autorizado únicamente si su tarea lo requiere.

**Modificación:** backend seguro o personal autorizado; nunca el titular desde el cliente.

**RLS conceptual:** la fila debe corresponder a un `affiliate_id` aprobado para `(select auth.uid())` y superar la regla de acceso vigente. Si una credencial vencida o suspendida debe mostrarse con aviso en vez de ocultarse, esa decisión debe formar parte de la política de producto.

**Riesgos:** IDOR, credencial ajena, caché local persistente, datos duplicados obsoletos, exposición de números o imágenes y uso visual de una credencial revocada.

### 6.3 `user_affiliates`

**Propósito:** vincular de forma explícita y auditable una cuenta autenticada con un afiliado oficial.

| Campo | Regla |
| --- | --- |
| `id` | Clave primaria interna. |
| `auth_user_id` | FK a `auth.users.id`; nunca proviene libremente del cliente para una aprobación. |
| `affiliate_id` | FK a `affiliates.id`. |
| `status` | `pending`, `approved`, `rejected` o `revoked`. |
| `approved_by` | Identidad del personal que aprobó. |
| `approved_at` | Momento de aprobación. |
| `rejected_at` | Momento de rechazo. |
| `revoked_at` | Momento de revocación. |
| `revocation_reason` | Motivo interno controlado y protegido. |
| `created_at`, `updated_at` | Trazabilidad técnica. |

**Integridad:** debe impedir duplicados incompatibles para una misma cuenta y afiliado. La cardinalidad final depende de beneficiarios: una cuenta podría vincularse a una o más afiliaciones, y un afiliado podría admitir una o más cuentas solo si M.T.C.P. lo autoriza expresamente.

**Lectura:** el usuario puede ver un estado limitado de sus propios vínculos, sin recibir datos del afiliado antes de la aprobación. Personal autorizado puede revisar el vínculo completo.

**Modificación:** solo un backend seguro o personal con permiso específico puede aprobar, rechazar o revocar. El usuario puede iniciar/cancelar una solicitud, pero no establecer `approved`.

**RLS conceptual:** lectura propia limitada por `auth_user_id`; cero escrituras administrativas desde clientes comunes. Toda transición debe validar el estado anterior y generar auditoría atómica.

**Riesgos:** autoaprobación por modificación de campos, aprobación duplicada, carrera entre revisores, vínculo a afiliado incorrecto y revocación que no invalida inmediatamente el acceso.

### 6.4 `affiliate_status_history`

**Propósito:** conservar cambios del estado oficial de un afiliado.

**Campos:** `id`, `affiliate_id`, `previous_status`, `new_status`, `changed_by`, `changed_at`, `reason`.

**Acceso:** no visible para usuarios comunes por defecto. Si el producto necesita mostrar historial al afiliado, debe definirse una proyección limitada y autorizada.

**Modificación/RLS:** inserción solo desde el proceso autorizado que cambia `affiliates.status`; sin actualización ni borrado desde el cliente. Lectura administrativa según rol.

**Riesgos:** historial incompleto si el cambio y el evento no son atómicos; motivos con datos personales innecesarios; actor no identificable.

### 6.5 `credential_status_history`

**Propósito:** conservar cambios de estado de una credencial.

**Campos:** `id`, `credential_id`, `previous_status`, `new_status`, `changed_by`, `changed_at`, `reason`.

**Acceso:** administrativo por defecto; una vista limitada para el titular solo si M.T.C.P. la requiere.

**Modificación/RLS:** inserción controlada junto con el cambio de `credentials.status`; sin edición o borrado desde clientes comunes.

**Riesgos:** los mismos del historial de afiliación, además de no reflejar inmediatamente una revocación en sesiones o cachés existentes.

## 7. Solicitudes de validación

### 7.1 `affiliate_validation_requests`

**Propósito:** registrar el trámite mediante el cual una cuenta solicita ser vinculada a un afiliado real, sin revelar el registro oficial antes de la aprobación.

| Campo | Regla |
| --- | --- |
| `id` | Clave primaria interna. |
| `auth_user_id` | Cuenta solicitante; debe coincidir con la sesión al crear. |
| `declared_dni` | Dato declarado sensible, normalizado en backend. |
| `declared_first_name`, `declared_last_name` | Datos declarados para revisión, no oficiales. |
| `status` | `pending`, `under_review`, `approved`, `rejected`, `cancelled` o `expired`. |
| `evidence_type` | Tipo controlado de evidencia, si se admite. |
| `evidence_reference` | Referencia protegida a evidencia; no contenido público ni URL abierta. |
| `reviewed_by`, `reviewed_at` | Revisor y momento de decisión. |
| `rejection_reason_internal` | Motivo interno, no visible al solicitante. |
| `user_message_code` | Código seguro para construir una respuesta pública no reveladora. |
| `created_at`, `updated_at` | Trazabilidad. |

**Flujo conceptual:**

1. La cuenta autenticada crea una solicitud propia.
2. El sistema responde de forma uniforme, sin confirmar si el DNI existe.
3. Personal autorizado contrasta los datos con la fuente oficial.
4. Una aprobación crea o actualiza `user_affiliates` a `approved` dentro de una operación consistente.
5. La decisión y el actor quedan registrados en `admin_audit_logs`.
6. Rechazo, cancelación o expiración no conceden acceso ni revelan datos del afiliado.

**RLS conceptual:** el solicitante puede leer una proyección limitada de sus solicitudes y crear una para sí mismo bajo límites de frecuencia. No puede editar estado, revisor, motivos internos ni evidencia ya presentada. Solo revisores autorizados procesan transiciones.

**Riesgos:** enumeración, carga de evidencia maliciosa, solicitudes repetidas, mensajes de rechazo reveladores, revisión sin segregación de funciones y aprobación no atómica.

## 8. Auditoría y activación

### 8.1 `access_audit_logs`

**Propósito:** registrar accesos o intentos relevantes sobre recursos privados.

**Campos:** `id`, `auth_user_id`, `action`, `resource_type`, `resource_id`, `created_at`, `ip_hash`, `user_agent_hash`, `result`.

Debe registrar eventos definidos por riesgo, no cada interacción indiscriminadamente. `action`, `resource_type` y `result` deben usar vocabularios controlados. IP y agente de usuario se minimizan mediante hash con estrategia documentada; un hash sin protección puede seguir siendo correlacionable.

**Acceso/RLS:** no visible ni insertable directamente por usuarios comunes. Escritura desde backend confiable; lectura solo para seguridad o auditoría autorizada.

### 8.2 `admin_audit_logs`

**Propósito:** registrar decisiones y cambios realizados por personal autorizado.

**Campos:** `id`, `admin_user_id`, `action`, `target_type`, `target_id`, `reason`, `created_at`.

Debe cubrir, como mínimo, aprobación, rechazo, revocación, cambio de estado, publicación/despublicación sensible y acceso administrativo excepcional.

**Acceso/RLS:** solo roles administrativos de auditoría. Los administradores operativos no deberían poder editar o borrar sus propios eventos.

### 8.3 `contact_verification_events`

**Propósito:** registrar el resultado de verificaciones de email, teléfono u otro canal sin almacenar el secreto utilizado.

**Campos:** `id`, `auth_user_id`, `channel_type`, `masked_destination`, `result`, `created_at`.

`masked_destination` debe mostrar solo lo mínimo útil para soporte. No se guarda OTP, token ni destino completo si no es necesario.

**Acceso/RLS:** backend seguro para escritura; soporte autorizado para lectura limitada. Un usuario podría ver un resumen propio solamente si existe una necesidad de producto.

### 8.4 `activation_codes`, si aplica

**Propósito:** soportar una activación inicial mediante código entregado por M.T.C.P. solo si esa estrategia es aprobada.

**Campos:** `id`, `affiliate_id`, `code_hash`, `status`, `expires_at`, `consumed_at`, `created_by`, `created_at`.

El código se genera con suficiente entropía, se almacena únicamente como hash, expira, tiene límite de intentos y es de un solo uso. La comparación ocurre en backend. No debe viajar a logs ni guardarse en frontend.

**Acceso/RLS:** sin lectura o escritura directa para usuarios. Operación exclusiva de backend/personal autorizado, con auditoría.

### 8.5 Retención y minimización

Antes de implementar se debe definir por categoría:

- Finalidad de cada evento.
- Plazo de retención.
- Quién puede consultarlo.
- Proceso de anonimización o eliminación.
- Tratamiento de solicitudes legales y seguridad.
- Protección del identificador del recurso y de los motivos libres.

Los logs no deben contener contraseñas, OTP, códigos en texto plano, tokens, payloads completos de credenciales ni copias innecesarias de DNI.

## 9. Relación con Supabase Auth

- `auth.users` administra identidad, email, contraseña, verificación y sesión.
- `profiles` guarda datos declarados y estado operativo de la cuenta.
- `affiliates` guarda la fuente oficial de afiliación.
- `user_affiliates` vincula una identidad autenticada con un afiliado oficial.
- La credencial se autoriza solamente mediante un vínculo aprobado y las reglas operativas vigentes.
- DNI no es clave primaria, contraseña ni prueba suficiente de afiliación.
- `user_metadata` no es fuente de autorización porque el usuario puede modificar esos datos. Si en el futuro se usan claims administrativos en `app_metadata`, deben considerarse su actualización y la vigencia del JWT; la relación en base continúa siendo la fuente para la autorización privada sensible.
- La clave `service_role` o cualquier clave secreta nunca debe estar en frontend, repositorio público, logs o configuración entregada al navegador.
- La eliminación o bloqueo de una cuenta debe contemplar sesiones existentes y la necesidad de revocar acceso con efecto acorde al riesgo.

Regla conceptual:

```text
credential_access =
  authenticated_account
  AND operational_account
  AND user_affiliates.status = approved
  AND affiliate_access_rule_allows_it
```

Donde:

- `authenticated_account`: existe una sesión válida para `auth.users.id`.
- `operational_account`: `profiles.account_status` permite operar y la cuenta no está bloqueada.
- `user_affiliates.status = approved`: existe un vínculo aprobado entre esa cuenta y el afiliado solicitado.
- `affiliate_access_rule_allows_it`: el estado de afiliado, credencial y cualquier regla institucional vigente permiten mostrar la información definida.

El frontend puede ocultar opciones por experiencia de usuario, pero la base de datos/backend debe aplicar esta regla de forma independiente.

## 10. RLS conceptual

### 10.1 Reglas transversales

- Habilitar RLS en toda tabla de un esquema expuesto.
- Conceder a `anon` y `authenticated` solo las operaciones necesarias; RLS no reemplaza privilegios.
- Usar políticas dirigidas al rol correspondiente y predicados de propiedad o autorización. `TO authenticated` por sí solo no limita filas.
- Para identidad, evaluar `(select auth.uid())` y verificar que no sea nulo cuando corresponda.
- Las actualizaciones propias requieren controlar tanto la fila actual como la resultante; además necesitan una política de lectura compatible.
- Indexar columnas usadas en políticas, especialmente `auth_user_id`, `affiliate_id` y `status`.
- Evitar joins complejos por fila y revisar rendimiento con datos representativos.
- Las vistas sobre datos privados deben respetar RLS, por ejemplo mediante comportamiento de invocador cuando la versión lo permita, o permanecer fuera de esquemas expuestos.
- Las funciones privilegiadas son excepcionales: deben vivir fuera de esquemas expuestos, fijar un `search_path` seguro, validar la identidad llamante y tener permisos de ejecución mínimos.
- Probar cada política como `anon`, usuario registrado no aprobado, afiliado aprobado, usuario revocado y cada rol administrativo.

### 10.2 Matriz conceptual de políticas

| Recurso | `anon` | Autenticado sin aprobación | Afiliado validado | Personal autorizado |
| --- | --- | --- | --- | --- |
| Contenido público | Lee solo publicado/activo | Igual | Igual | Gestiona según permiso |
| `profiles` | Sin acceso | Lee/edita campos propios permitidos | Igual | Acceso mínimo por función |
| `affiliate_validation_requests` | Sin acceso | Crea propias y ve estado limitado | Ve propias si corresponde | Revisa según permiso |
| `affiliates` | Sin acceso | Sin acceso | Lee solo vinculados y autorizados | Según rol |
| `credentials` | Sin acceso | Sin acceso | Lee solo las propias autorizadas | Según rol |
| `user_affiliates` | Sin acceso | Ve estado propio limitado | Ve estado propio limitado | Aprueba/rechaza/revoca |
| Historiales | Sin acceso | Sin acceso | Sin acceso por defecto | Según rol |
| Auditorías | Sin acceso | Sin acceso | Sin acceso | Solo roles autorizados |
| `activation_codes` | Sin acceso | Sin acceso directo | Sin acceso directo | Backend/rol específico |

### 10.3 Revocación

Cambiar `user_affiliates.status` a `revoked`, bloquear la cuenta o cambiar una regla de afiliación debe impedir nuevas lecturas privadas. La implementación deberá definir cómo se manejan sesiones, respuestas ya obtenidas y caché local; RLS protege consultas futuras, pero no borra información que el cliente ya haya almacenado.

## 11. Integridad y transiciones de estado

### 11.1 Separación de estados

No se debe condensar todo en un único estado:

- `profiles.account_status`: capacidad operativa de la cuenta.
- `affiliate_validation_requests.status`: estado de un trámite.
- `user_affiliates.status`: decisión sobre el vínculo.
- `affiliates.status`: situación oficial del afiliado.
- `credentials.status`: situación de la credencial.

Esto permite, por ejemplo, que una cuenta siga activa para contenido público aunque su vínculo sea revocado o su afiliación quede inactiva.

### 11.2 Transiciones recomendadas

- Solicitud: `pending` → `under_review` → `approved` o `rejected`.
- Solicitud sin resolución: `pending`/`under_review` → `cancelled` o `expired` según regla.
- Vínculo: `pending` → `approved` o `rejected`; `approved` → `revoked`.
- Reingreso después de rechazo o revocación: crear una nueva solicitud o reabrir mediante una transición explícita y auditada; no sobrescribir el historial.

La aprobación debe actualizar la solicitud, crear/actualizar el vínculo y registrar auditoría como una unidad consistente. Si una parte falla, ninguna debe quedar confirmada de forma aislada.

### 11.3 Borrado y conservación

- No borrar en cascada datos oficiales o auditorías sin una política legal aprobada.
- La eliminación de una cuenta debe definir qué ocurre con `profiles`, solicitudes y vínculos, preservando la trazabilidad necesaria y minimizando datos.
- Una delegación o categoría usada históricamente se desactiva antes de considerar su eliminación.
- Contenido público se despublica antes de borrarse, salvo corrección operativa controlada.

## 12. Etapas de implementación

### Etapa 1 — Núcleo de contenido público

- `delegations`.
- `benefit_categories`.
- `benefits`.
- `benefit_locations`.
- RLS de lectura pública y escritura administrativa.
- Importación inicial controlada y reemplazo gradual de mocks de estas áreas.

**Salida:** visitantes consultan beneficios, convenios y delegaciones publicados desde backend sin login.

### Etapa 2 — Resto del contenido público

- `tourism_items`.
- `news_items`.
- `institutional_content`.
- `app_config` pública y acotada.

**Salida:** el alcance público definido por producto puede administrarse desde backend.

### Etapa 3 — Cuentas y perfiles

- Configuración de Supabase Auth.
- `auth.users`.
- `profiles`.
- Verificación de email y recuperación de acceso.
- RLS propia de perfiles.

**Salida:** una persona puede registrarse e iniciar sesión sin obtener una credencial automática.

### Etapa 4 — Solicitudes de validación

- `affiliate_validation_requests`.
- Estados y límites de frecuencia.
- Procedimiento mínimo de revisión.
- Respuestas que eviten enumeración.

**Salida:** una cuenta puede solicitar validación sin leer la base de afiliados.

### Etapa 5 — Afiliados, vínculos y credenciales

- Fuente e importación oficial de `affiliates`.
- `credentials`.
- `user_affiliates`.
- RLS privada y pruebas de aislamiento.
- Reglas de estado, vigencia y revocación.

**Salida:** solamente una cuenta aprobada consulta su propia credencial y datos autorizados.

### Etapa 6 — Auditoría e historiales

- `access_audit_logs`.
- `admin_audit_logs`.
- `affiliate_status_history`.
- `credential_status_history`.
- `contact_verification_events`.
- `activation_codes` solo si la estrategia elegida los requiere.
- Retención, alertas y acceso de auditoría.

**Salida:** decisiones y eventos sensibles son trazables.

### Etapa 7 — Operación administrativa

- Panel administrativo o procedimiento mínimo seguro.
- Roles separados para contenido, validación, soporte y auditoría.
- Doble control si M.T.C.P. lo exige.
- Manual operativo, soporte y contingencia.

**Salida:** M.T.C.P. puede mantener contenido y validar o revocar accesos sin usar credenciales técnicas compartidas.

Cada etapa debe incluir migración versionada, revisión de RLS/privilegios, datos de prueba no reales, pruebas automatizadas y plan de reversión antes de producción. El proyecto Supabase existente debe permanecer sin cambios hasta que M.T.C.P. apruebe el modelo y se autorice la implementación.

## 13. Preguntas pendientes para M.T.C.P.

### Fuente e identidad oficial

- ¿Cuál es la fuente oficial de afiliados y quién responde por su calidad?
- ¿Existe un identificador interno estable, único y no reutilizable?
- ¿Cómo se normalizan DNI, números de socio y duplicados?
- ¿Con qué frecuencia se actualiza la fuente y cómo se resuelven conflictos?
- ¿Qué campos oficiales está autorizado a almacenar y mostrar el sistema?

### Reglas de afiliación y credencial

- ¿Qué significan exactamente `active`, `grace_period`, `inactive` y `suspended`?
- ¿Qué estados permiten ver la credencial y qué mensaje debe mostrarse en cada caso?
- ¿Puede existir más de una credencial por afiliado o solo una vigente?
- ¿Qué datos aparecen en frente y dorso y cuál es su fuente?
- ¿La vigencia se calcula o llega desde el sistema oficial?

### Cuentas, validación y beneficiarios

- ¿Quién revisa y aprueba una solicitud y con qué evidencia?
- ¿Se requiere doble aprobación para casos excepcionales?
- ¿Cómo recupera acceso un usuario con email o teléfono desactualizado?
- ¿Los beneficiarios tienen cuenta propia, usan la del titular o solo figuran como dato?
- ¿Puede una cuenta vincularse a varios afiliados? ¿Puede un afiliado vincularse a varias cuentas?
- ¿Qué ocurre con una nueva solicitud después de rechazo o revocación?
- ¿Se utilizarán códigos de activación? ¿Quién los emite y entrega?

### Contenido y operación

- ¿Quién crea, revisa, publica y despublica beneficios, convenios y novedades?
- ¿Qué diferencia operativa existe entre beneficio y convenio, y entre turismo y paquete?
- ¿Qué regla se aplica al contenido vencido?
- ¿Quién mantiene sedes, contacto y contenido legal?
- ¿Qué procedimiento mínimo reemplazará al panel avanzado durante el MVP?

### Seguridad, legal y entornos

- ¿Qué textos legales, política de privacidad y consentimientos son obligatorios?
- ¿Cuál es la retención aprobada para solicitudes, evidencias, historiales y logs?
- ¿Qué personal puede ver cada dato y cómo se revisan sus permisos?
- ¿Qué incidentes deben alertarse y quién responde?
- ¿Habrá entornos separados de desarrollo, staging y producción?
- ¿Cómo se anonimizarán datos de prueba y cómo se gestionarán secretos por entorno?
- ¿Qué plazo de revocación efectiva y cierre de sesiones exige M.T.C.P.?

## 14. Criterios de aceptación del modelo

El modelo conceptual se considera listo para pasar a diseño SQL cuando:

- Separa inequívocamente contenido público, cuentas y datos privados.
- No expone afiliados, credenciales, solicitudes internas ni auditorías a visitantes.
- Permite publicar beneficios, convenios, turismo, paquetes, novedades y sedes sin login.
- Permite registrar y verificar una cuenta sin habilitar credencial automáticamente.
- Trata DNI como dato declarado/oficial según su origen, nunca como secreto, PK o autorización.
- Permite validar afiliación de forma manual o asistida y registra al responsable.
- Usa `user_affiliates.status = approved` como condición necesaria, pero no única, del acceso privado.
- Permite rechazar y revocar vínculos conservando trazabilidad.
- Puede proteger por RLS el perfil propio, el afiliado vinculado y la credencial autorizada.
- Contempla privilegios mínimos, índices de relaciones y reglas de integridad.
- Incluye auditoría y una política pendiente de retención/minimización.
- Define cómo evolucionar desde mocks por etapas.
- Resuelve o deja asignadas todas las decisiones pendientes que cambian cardinalidades, permisos o datos autorizados.

## 15. Validaciones antes de implementar

Antes de crear la primera migración se deberá producir y aprobar:

1. Diccionario de datos definitivo con tipos, nulabilidad, valores por defecto y sensibilidad.
2. Diagrama de relaciones con cardinalidades resueltas, especialmente para beneficiarios.
3. Matriz de roles, tablas, operaciones y columnas visibles.
4. Máquina de estados y responsables de cada transición.
5. Catálogo de políticas RLS y casos negativos de prueba.
6. Estrategia de importación y conciliación con la fuente oficial.
7. Política de retención, borrado, respaldo y recuperación.
8. Plan de entornos, secretos, migraciones y despliegue.
9. Pruebas de aislamiento entre dos afiliados distintos y de revocación inmediata.

Solo después de esta aprobación corresponde crear migraciones, conectar Supabase o reemplazar mocks.

## 16. Referencias de producto

Este modelo debe mantenerse alineado con:

- `docs/prd-mvp.md`.
- `docs/auth-strategy.md`.
- `docs/mvvm-lite-architecture.md`.
- `docs/mobile-store-strategy.md`.
- `docs/pwa-readiness.md`.

Referencias técnicas consultadas para la futura implementación:

- [Supabase — Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security).
- [Supabase — Auth architecture](https://supabase.com/docs/guides/auth/architecture).
- [Supabase — Securing your API](https://supabase.com/docs/guides/api/securing-your-api).

