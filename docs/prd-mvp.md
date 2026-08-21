# PRD — MVP productivo de Credencial Digital M.T.C.P.

## Control del documento

| Campo | Valor |
| --- | --- |
| Producto | Credencial Digital M.T.C.P. |
| Versión del PRD | 1.1 |
| Estado | Borrador para validación con M.T.C.P. |
| Alcance | Primera versión productiva del MVP |
| Plataforma inicial | Aplicación web mobile-first |

## 1. Resumen del producto

Credencial Digital M.T.C.P. es una aplicación de utilidad pública para consultar beneficios, convenios, turismo, paquetes, novedades, sedes e información institucional de la Mutual de los Trabajadores de la Construcción de la Patagonia. Cualquier persona puede acceder a ese contenido cuando esté publicado, sin necesidad de demostrar afiliación.

La credencial digital constituye un área privada distinta. Solamente un usuario registrado cuya cuenta haya sido vinculada y aprobada por M.T.C.P. contra un registro real de afiliado puede consultar su credencial, estado de afiliación y datos personales autorizados.

El producto busca reemplazar la consulta informal o manual de información básica por una experiencia digital simple, confiable y diseñada principalmente para celulares. La primera versión productiva debe conservar la experiencia visual ya desarrollada, pero reemplazar los datos simulados y el acceso por DNI de demostración por datos reales autorizados, autenticación real y un backend seguro.

## 2. Objetivo del MVP

El objetivo principal del MVP es ofrecer desde un celular información pública útil y actualizada de M.T.C.P. para cualquier usuario, y al mismo tiempo permitir que un afiliado aprobado acceda de forma segura a su credencial y datos privados autorizados.

El MVP debe validar tres hipótesis centrales:

1. Visitantes y usuarios registrados pueden encontrar contenido institucional vigente sin atravesar una validación de afiliación.
2. Una persona puede registrarse y verificar su email sin obtener acceso automático a una credencial.
3. M.T.C.P. puede validar y revocar de forma controlada la vinculación entre una cuenta y un afiliado real.
4. La credencial digital y el estado mostrado son útiles, comprensibles y confiables para el afiliado validado.
5. Los usuarios pueden encontrar beneficios y convenios mediante categorías, sedes y búsqueda.

El MVP no tiene como objetivo publicar inmediatamente una aplicación en App Store o Play Store ni incorporar todos los futuros servicios de la Mutual.

## 3. Niveles de acceso y usuarios

### 3.1 Visitante o `guest`

Persona que abre la aplicación sin crear una cuenta o iniciar sesión.

Puede consultar:

- Beneficios y convenios publicados.
- Turismo y paquetes publicados.
- Novedades publicadas.
- Sedes, delegaciones y contacto.
- Información institucional.

No puede consultar:

- Credencial digital.
- Estado de afiliación.
- Datos personales o perfil de afiliado.
- Número de socio, empresa, beneficiarios o vigencia.

### 3.2 Usuario registrado

Persona que crea una cuenta con nombre, apellido, DNI, email y contraseña, y verifica su email. Puede iniciar sesión y continuar utilizando todo el contenido público.

Registrarse no prueba afiliación ni habilita la credencial. La cuenta puede encontrarse en alguno de estos estados de negocio:

- `pending_email_verification`.
- `pending_affiliate_validation`.
- `active_non_affiliate`.
- `rejected`.
- `blocked`.

El acceso a credencial no debe inferirse únicamente del estado de la cuenta: requiere una vinculación aprobada con un afiliado real.

### 3.3 Afiliado validado

Usuario registrado cuya identidad fue vinculada y aprobada por M.T.C.P. contra un registro real de afiliado.

Puede consultar:

- Todo el contenido público.
- Su credencial digital.
- Su estado de afiliación.
- Sus datos privados autorizados.
- Su perfil de afiliado.
- Beneficios aplicables según sede, estado o reglas institucionales.

La autorización privada puede revocarse sin eliminar necesariamente la cuenta pública.

### 3.4 Beneficiario/a, si aplica

Usuario vinculado a un afiliado titular. Su inclusión efectiva y forma de acceso quedan sujetas a confirmación de M.T.C.P. Se debe definir si utiliza una cuenta propia, la cuenta del titular o si solamente figura como dato dentro de la credencial.

Hasta resolver esta definición, el MVP productivo no debe asumir que un beneficiario posee permisos equivalentes al titular.

### 3.5 Administrador o personal autorizado

Personal autorizado de M.T.C.P. responsable de revisar solicitudes, aprobar o rechazar vinculaciones, revocar acceso privado, resolver incidencias y mantener contenido según sus permisos. No debe poder consultar o modificar información fuera de sus tareas asignadas.

El panel administrativo avanzado queda fuera del MVP inicial. Antes de una salida productiva debe existir, como mínimo, un procedimiento seguro y auditable para validar cuentas y actualizar contenido.

### 3.6 Futuro administrador de contenidos

Rol responsable de mantener beneficios, delegaciones y contenido institucional. El modelo de permisos y el panel administrativo avanzado están fuera del MVP inicial. Para el lanzamiento deberá existir, como mínimo, un procedimiento seguro y documentado para actualizar y publicar contenido.

## 4. Funciones incluidas en el MVP inicial

### 4.1 Acceso público sin cuenta

- Apertura de la aplicación sin login obligatorio.
- Navegación por contenido público publicado.
- Separación visible y técnica entre contenido público y Credencial Digital.
- Acceso a registro e inicio de sesión como acciones opcionales.

### 4.2 Registro público y verificación de email

- Creación de cuenta con nombre, apellido, DNI, email y contraseña.
- Verificación obligatoria del email.
- Aceptación de los avisos legales y de privacidad definidos por M.T.C.P.
- La cuenta verificada puede usar contenido público, pero no obtiene credencial automáticamente.
- Mensajes que diferencien claramente “cuenta registrada” de “afiliación validada”.

### 4.3 Login y recuperación de cuenta

- Inicio de sesión para cuentas existentes mediante email y contraseña.
- Posible inicio mediante DNI y contraseña, solo si se implementa una resolución segura de la cuenta y se evitan enumeraciones.
- El DNI no funciona como contraseña ni demuestra afiliación.
- Recuperación mediante email verificado y un procedimiento reforzado para casos excepcionales.
- Sesión con expiración, cierre y revocación definidos.

### 4.4 Solicitud y validación de afiliación

- Un usuario con email verificado puede solicitar la validación de su condición de afiliado.
- La solicitud queda en `pending_affiliate_validation` mientras M.T.C.P. verifica la información.
- Nombre, apellido y DNI no deben producir una aprobación automática.
- M.T.C.P. debe contrastar la solicitud con la fuente oficial de afiliados y aplicar el mecanismo de validación aprobado.
- La aprobación crea o actualiza una vinculación explícita entre cuenta y afiliado.
- El rechazo debe registrar un motivo interno y mostrar al usuario un mensaje apropiado que no exponga información sensible.
- La vinculación puede revocarse por baja, error, fraude, suspensión u otra regla institucional.

El mecanismo concreto puede incluir un contacto previamente registrado, OTP, código de activación o asistencia administrativa, según `docs/auth-strategy.md` y la calidad real de datos de M.T.C.P.

### 4.5 Credencial digital privada

- Visualización de la credencial del usuario autenticado.
- Datos reales obtenidos desde el backend.
- Presentación exclusiva de campos autorizados por M.T.C.P.
- Estado y vigencia actualizados.
- Comportamiento visual mobile consistente con la credencial ya aprobada.
- Acceso únicamente cuando la relación cuenta–afiliado se encuentra aprobada y vigente.

La credencial del MVP es informativa. No incluye verificación pública mediante QR.

### 4.6 Estado de afiliación

- Visualización clara del estado actual del afiliado.
- Tratamiento diferenciado para estados activo, período de gracia, inactivo o suspendido, sujeto a las reglas definitivas de M.T.C.P.
- Mensaje explicativo y canal de contacto cuando el estado limite el acceso o la validez de la credencial.

### 4.7 Perfil de cuenta y perfil de afiliado

El perfil de cuenta puede contener datos básicos declarados por el usuario registrado. Estos datos no se consideran datos oficiales de afiliación ni pueden utilizarse por sí solos para habilitar la credencial.

El perfil privado del afiliado validado puede incluir:

- Nombre y apellido.
- Número de socio.
- Sede o delegación.
- Empresa, solo si M.T.C.P. autoriza su exposición.
- Fecha de alta y vencimiento, si corresponden y están autorizadas.
- Datos mínimos necesarios para identificar la relación del usuario con M.T.C.P.

El perfil no permitirá la edición libre de datos institucionales en el MVP. Las correcciones deberán seguir un procedimiento administrativo.

### 4.8 Beneficios y convenios públicos

- Listado de beneficios publicados y vigentes.
- Beneficios destacados.
- Información resumida: nombre, categoría, descuento o propuesta, sede o región y descripción breve.
- Exclusión automática de beneficios no publicados o vencidos cuando el modelo de datos contemple vigencia.
- Acceso para visitantes, usuarios registrados y afiliados validados.
- Personalización por sede o estado solamente después de validar afiliación y cuando la regla lo requiera.

### 4.9 Buscador y filtros

- Búsqueda por nombre, categoría, descripción, sede o región.
- Filtro por categoría.
- Filtro por sede o delegación.
- Opción para consultar beneficios relacionados con la sede del afiliado.
- Estado vacío cuando no haya resultados.

### 4.10 Detalle de beneficio o convenio

- Descripción completa.
- Condiciones de uso.
- Descuento o propuesta vigente.
- Dirección y región, cuando correspondan.
- Datos de contacto autorizados.
- Medios de pago y disponibilidad, cuando correspondan.
- Acción externa de contacto, por ejemplo WhatsApp, teléfono, correo o red institucional.

### 4.11 Turismo, paquetes y novedades públicas

- Listado y detalle de turismo y paquetes cuando estén publicados.
- Novedades institucionales publicadas.
- Fechas, vigencia y estado de publicación administrables.
- Acceso sin validación de afiliación, salvo contenidos futuros expresamente restringidos.

### 4.12 Sedes, delegaciones e información institucional

- Listado de delegaciones publicadas.
- Ciudad, dirección, teléfono, WhatsApp, correo y horarios, según disponibilidad.
- Uso de las delegaciones como filtro de beneficios.
- Información institucional y canales de contacto públicos.

### 4.13 Logout

- Cierre explícito de la sesión.
- Eliminación de la sesión local activa.
- Regreso a la pantalla de acceso.
- Imposibilidad de volver a consultar datos privados sin autenticarse nuevamente.

## 5. Funciones fuera del MVP inicial

Las siguientes funciones quedan expresamente fuera de la primera versión productiva:

- Código QR y verificación pública de credenciales.
- Pagos, cuotas, saldos o transacciones.
- Notificaciones push.
- Empaquetado con Capacitor.
- Publicación en Apple App Store.
- Publicación en Google Play Store.
- Panel administrativo avanzado.
- Automatización completa del circuito administrativo de aprobación.
- Edición de datos personales desde la app.
- Integraciones con billeteras digitales.
- Biometría.
- Soporte offline completo.
- Internacionalización o múltiples idiomas.

Estos elementos podrán evaluarse después de validar el MVP con usuarios reales, comprobar la seguridad del acceso y estabilizar la operación del backend.

## 6. Requisitos no funcionales

### 6.1 Seguridad y privacidad

- Ninguna base completa de afiliados debe incorporarse al frontend o al paquete descargable.
- El contenido público y los datos privados deben utilizar fronteras y permisos diferentes.
- Una cuenta registrada no debe recibir datos privados hasta que M.T.C.P. apruebe su vinculación.
- Nombre, apellido, DNI y email declarados por el usuario no deben habilitar automáticamente una credencial.
- Cada usuario solamente puede consultar los datos que le correspondan y que M.T.C.P. haya autorizado.
- Toda validación de identidad, autorización y estado debe realizarse en el backend.
- Las comunicaciones productivas deben utilizar HTTPS.
- No se deben registrar DNI completos, tokens ni datos sensibles en logs del navegador.
- Los secretos y credenciales administrativas deben permanecer fuera del código cliente.
- La sesión debe expirar y poder invalidarse.
- Los accesos a información sensible deben quedar sujetos a un mecanismo de auditoría definido.
- Debe aplicarse el principio de mínima exposición: mostrar solamente los datos necesarios para cumplir el objetivo del producto.

### 6.2 Experiencia mobile

- Los flujos principales deben funcionar correctamente en celulares Android y iPhone con tamaños habituales.
- La navegación, los formularios y las acciones deben poder utilizarse cómodamente con interacción táctil.
- Deben existir estados visibles de carga, error, sin resultados, sesión vencida y falta de conexión.
- La navegación inferior no debe cubrir contenido.
- El teclado móvil no debe impedir completar el acceso.

### 6.3 Rendimiento y disponibilidad

- La pantalla inicial y la credencial deben cargar en un tiempo razonable bajo una conexión móvil normal.
- Las imágenes deben estar optimizadas para celular.
- Los errores del backend no deben dejar pantallas en blanco ni exponer información técnica.
- Debe existir una estrategia básica de monitoreo de errores antes de habilitar el MVP a usuarios reales.

### 6.4 Accesibilidad

- Controles con nombres comprensibles para lectores de pantalla.
- Contraste suficiente para textos, estados y botones.
- Navegación y formularios utilizables sin depender únicamente del color.
- Tamaños táctiles adecuados.

## 7. Flujos principales

### 7.1 Navegación como visitante

1. La persona abre la app.
2. La app carga únicamente contenido público publicado.
3. Puede consultar beneficios, convenios, turismo, novedades, sedes y contacto.
4. Si intenta abrir Credencial Digital, la app explica que debe registrarse y ser validada por M.T.C.P.

### 7.2 Registro y verificación de cuenta

1. La persona registra nombre, apellido, DNI, email y contraseña.
2. El sistema crea una cuenta en `pending_email_verification`.
3. La persona verifica el email.
4. La cuenta queda habilitada para iniciar sesión y usar contenido público.
5. La app aclara que la credencial todavía no está disponible.

### 7.3 Solicitud de validación de credencial

1. El usuario registrado solicita validar su afiliación.
2. La solicitud queda en `pending_affiliate_validation`.
3. M.T.C.P. verifica identidad y coincidencia con la fuente oficial.
4. Si se aprueba, se crea una vinculación cuenta–afiliado con estado `approved`.
5. Si se rechaza, no se expone ningún dato privado y se informa el canal de revisión o soporte.
6. Toda aprobación, rechazo o revocación queda auditada.

### 7.4 Acceso a credencial

1. El usuario inicia sesión con una cuenta existente.
2. El backend confirma que la cuenta está operativa.
3. El sistema comprueba que existe una vinculación aprobada y vigente con un afiliado.
4. Recién entonces devuelve la credencial y los datos privados autorizados.
5. Si la vinculación fue revocada o dejó de ser válida, la cuenta conserva acceso al contenido público pero pierde el acceso privado.

### 7.5 Consulta de contenido público

1. El usuario abre Beneficios.
2. La app muestra beneficios publicados desde el backend sin exigir afiliación.
3. El usuario busca o filtra por categoría y sede.
4. El usuario abre un beneficio.
5. La app muestra detalle, condiciones y canales de contacto.

### 7.6 Usuario inactivo, suspendido o con datos inconsistentes

1. El backend devuelve el estado institucional vigente.
2. La app aplica la regla definida por M.T.C.P. para ese estado.
3. El usuario recibe una explicación clara.
4. La app ofrece el canal institucional correspondiente.
5. No se muestran datos o acciones que el usuario no tenga autorización para utilizar.

## 8. Preguntas pendientes para M.T.C.P.

### Datos y operación

- ¿De qué sistema, archivo o proveedor saldrá la base real de afiliados?
- ¿Con qué frecuencia se actualizan afiliados, estados y vencimientos?
- ¿Existe un identificador estable distinto del DNI para vincular cuentas?
- ¿Quién será responsable de corregir datos inconsistentes?
- ¿Qué sistema se considera la fuente oficial ante diferencias de información?

### Privacidad

- ¿Qué datos personales pueden mostrarse en la credencial y en el perfil?
- ¿Es necesario mostrar el DNI completo?
- ¿Puede mostrarse la empresa del afiliado?
- ¿Pueden mostrarse fechas de alta y vencimiento?
- ¿Cuánto tiempo deben conservarse logs y registros de acceso?

### Identidad y acceso

- ¿La creación de cuentas estará abierta a cualquier persona desde el lanzamiento?
- ¿Email y contraseña serán el método principal de acceso recurrente?
- ¿Se permitirá login alternativo con DNI y contraseña para cuentas existentes?
- ¿Cómo se validará la identidad durante la activación inicial?
- ¿M.T.C.P. posee teléfono o correo verificado de cada afiliado?
- ¿Cómo se recuperará el acceso cuando esos datos estén desactualizados?
- ¿Qué sucede con afiliados inactivos, suspendidos o en período de gracia?
- ¿Un afiliado inactivo puede ingresar y ver información limitada o se bloquea completamente?
- ¿Qué procedimiento mínimo utilizará el personal para aprobar, rechazar y revocar vinculaciones?

### Beneficiarios

- ¿Los beneficiarios acceden con una cuenta propia o mediante la cuenta del titular?
- ¿Qué información puede consultar un beneficiario?
- ¿Un titular puede visualizar a todos sus beneficiarios?
- ¿Cómo se valida la relación entre titular y beneficiario?

### Contenido

- ¿Quién actualiza y aprueba los beneficios?
- ¿Qué campos y fechas de vigencia son obligatorios para publicar un beneficio?
- ¿Qué procedimiento se utilizará mientras no exista un panel administrativo avanzado?
- ¿Quién mantiene los datos de sedes y delegaciones?

### Legal

- ¿Qué política de privacidad, términos de uso y datos institucionales deben mostrarse?
- ¿Qué consentimiento o aviso debe aceptar el afiliado durante la activación?
- ¿Qué canal se utilizará para solicitudes de acceso, corrección o eliminación de datos?
- ¿Qué requisitos internos y legales debe cumplir M.T.C.P. respecto de datos personales?

## 9. Métricas del MVP

Las métricas deberán medirse sin registrar información personal innecesaria.

| Métrica | Definición inicial |
| --- | --- |
| Accesos exitosos | Cantidad y porcentaje de intentos que terminan en una sesión válida. |
| Errores de login | Cantidad y porcentaje de intentos fallidos, clasificados por motivo no sensible. |
| Credenciales consultadas | Cantidad de aperturas exitosas de la credencial digital. |
| Beneficios vistos | Cantidad de listados y detalles de beneficios consultados. |
| Búsquedas realizadas | Cantidad de búsquedas y filtros utilizados en Beneficios. |
| Usuarios activos | Usuarios únicos con actividad en un período definido, por ejemplo diaria y mensualmente. |
| Visitantes activos | Dispositivos o sesiones que consultan contenido público sin iniciar sesión, medidos sin identificación innecesaria. |
| Registros verificados | Cuentas que completan la verificación de email. |
| Solicitudes de afiliación | Solicitudes iniciadas, aprobadas, rechazadas y pendientes. |
| Accesos a credencial autorizados | Consultas privadas realizadas con una vinculación aprobada. |

Métricas complementarias recomendadas:

- Porcentaje de activaciones completadas.
- Abandono por paso durante la activación.
- Tiempo promedio hasta visualizar la credencial.
- Porcentaje de búsquedas sin resultados.
- Errores técnicos por sesión.
- Sesiones sin fallos críticos.

Los objetivos numéricos se definirán después de confirmar el volumen estimado de afiliados y ejecutar una primera prueba controlada.

## 10. Criterios de aceptación

El MVP se considera listo para una primera salida productiva controlada cuando se cumplan todos los siguientes criterios:

### Datos y backend

- [ ] No utiliza mocks como fuente de datos de afiliados reales.
- [ ] Cuenta con un backend seguro y un entorno productivo separado.
- [ ] Los beneficios se obtienen desde el backend.
- [ ] Las sedes y delegaciones se obtienen desde una fuente administrable y autorizada.
- [ ] La credencial muestra datos reales, vigentes y autorizados por M.T.C.P.
- [ ] Los errores del backend tienen manejo controlado y no exponen detalles técnicos.

### Autenticación y seguridad

- [ ] Utiliza autenticación real y el DNI no funciona como único secreto.
- [ ] Registrarse y verificar email no habilita automáticamente la credencial.
- [ ] La credencial solo se habilita con una vinculación cuenta–afiliado aprobada.
- [ ] Una aprobación puede auditarse y revocarse.
- [ ] Cada usuario solo puede acceder a sus propios datos autorizados.
- [ ] Los datos sensibles están protegidos durante la transmisión y el almacenamiento.
- [ ] No existen secretos administrativos ni una base completa de afiliados en el frontend.
- [ ] El logout invalida o elimina correctamente la sesión activa.
- [ ] La sesión expirada obliga a autenticarse nuevamente.
- [ ] Existe una revisión de seguridad de los flujos de acceso y datos privados.

### Funcionalidad

- [ ] Visitantes pueden consultar contenido público sin crear cuenta.
- [ ] Registro, verificación de email, login y recuperación funcionan para cuentas públicas.
- [ ] Solicitud, aprobación, rechazo y revocación de afiliación tienen un procedimiento verificable.
- [ ] Credencial, estado y perfil privado funcionan solamente para afiliados validados.
- [ ] Beneficios, convenios, turismo, paquetes, novedades y delegaciones publicados pueden consultarse según su nivel público.
- [ ] Los estados de afiliación aplican las reglas aprobadas por M.T.C.P.
- [ ] Los beneficios no publicados o no vigentes no aparecen al afiliado.
- [ ] Existen estados de carga, error, vacío, sesión vencida y falta de conexión.

### Calidad

- [ ] Lint, verificación de TypeScript y build de producción finalizan correctamente.
- [ ] Existen pruebas automatizadas básicas para autenticación, sesión, permisos, credencial y beneficios.
- [ ] Los flujos críticos pasan una prueba manual documentada.
- [ ] No hay errores críticos conocidos abiertos.
- [ ] Existe monitoreo básico de errores para el entorno productivo.

### Celulares y validación

- [ ] Funciona correctamente en al menos un celular Android real y un iPhone real.
- [ ] Login, teclado, scroll, navegación y logout funcionan correctamente en pantalla pequeña.
- [ ] La navegación inferior respeta áreas seguras y no tapa contenido.
- [ ] La app fue probada con un grupo controlado de afiliados y personal de M.T.C.P.
- [ ] Los hallazgos críticos de esa validación fueron corregidos.

### Legal y operación

- [ ] M.T.C.P. aprobó qué datos pueden mostrarse.
- [ ] Están disponibles la política de privacidad, los términos o avisos requeridos y un canal de soporte.
- [ ] Existe un responsable y un procedimiento para actualizar beneficios y delegaciones.
- [ ] Existe un procedimiento de asistencia para activación, recuperación y corrección de datos.

## 11. Dependencias para avanzar

El desarrollo productivo depende de que M.T.C.P. entregue o defina:

1. Fuente oficial de afiliados y responsable técnico u operativo.
2. Reglas de estados, vigencia y permisos.
3. Campos autorizados para credencial y perfil.
4. Mecanismo de validación de identidad.
5. Estados, responsables y procedimiento de aprobación/revocación.
6. Tratamiento de titulares y beneficiarios.
7. Responsable de beneficios, turismo, novedades y delegaciones.
8. Textos legales y canal de soporte.
9. Grupo inicial de visitantes, usuarios registrados y afiliados para validación controlada.

## 12. Definición de cierre del MVP

El MVP queda cerrado cuando cualquier persona puede consultar contenido público vigente sin validar afiliación; una persona puede crear y verificar una cuenta sin obtener privilegios privados; y un afiliado real aprobado por M.T.C.P. puede consultar exclusivamente su credencial y datos autorizados. Todo debe funcionar desde un celular con backend seguro, controles de autorización por nivel, auditoría de aprobaciones, capacidad de revocación, pruebas básicas y soporte operativo.

Cualquier funcionalidad que no contribuya directamente a ese recorrido deberá permanecer fuera de alcance hasta completar la validación de esta primera versión productiva.
