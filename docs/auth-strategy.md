# Estrategia de autenticación y activación — Credencial Digital M.T.C.P.

## Control del documento

| Campo | Valor |
| --- | --- |
| Producto | Credencial Digital M.T.C.P. |
| Versión | 1.1 |
| Estado | Borrador para decisión de M.T.C.P. |
| Alcance | Estrategia de autenticación del MVP productivo |
| Implementación | No incluida en este documento |

## 1. Objetivo de autenticación

La aplicación debe poder utilizarse sin autenticación para consultar contenido público publicado por M.T.C.P. La autenticación se incorpora para crear y recuperar una cuenta personal; la autorización de credencial es un paso posterior y separado que solamente se concede cuando M.T.C.P. vincula y aprueba esa cuenta contra un afiliado real.

El sistema debe permitir que cualquier persona cree una cuenta, verifique su email e inicie sesión, sin presentar esa registración como prueba de afiliación. Un afiliado real debe poder solicitar la validación de su credencial y, una vez aprobado, consultar únicamente los datos privados autorizados para su vínculo.

La estrategia debe resolver dos problemas diferentes:

1. **Acceso público:** entregar solamente contenido publicado que no requiere identidad.
2. **Autenticación:** comprobar qué cuenta registrada está iniciando sesión.
3. **Validación de afiliación:** verificar si esa cuenta corresponde a un afiliado real.
4. **Autorización:** determinar qué registro y qué información privada puede consultar.

Una sesión autenticada no debe otorgar acceso a la credencial ni a la base de afiliados. Después de autenticar al usuario, el backend debe comprobar que existe una vinculación aprobada y vigente con el afiliado correcto. Sin esa relación, la cuenta conserva únicamente acceso al contenido público y a sus propios datos básicos de cuenta.

La solución del MVP debe ser:

- Comprensible para visitantes, usuarios registrados y afiliados con distintos niveles de experiencia digital.
- Utilizable desde celulares Android y iPhone.
- Recuperable cuando el teléfono o email institucional esté desactualizado.
- Resistente a enumeración de DNI, fuerza bruta, robo de códigos y vinculación incorrecta de cuentas.
- Operable por M.T.C.P. sin generar una carga de soporte imposible de sostener.
- Compatible con una futura integración de Supabase Auth y políticas RLS, sin conectar Supabase en esta etapa documental.

## 2. Riesgo de utilizar solamente el DNI

El DNI es un identificador personal, no una contraseña.

No puede funcionar como único mecanismo productivo porque:

- No es secreto: puede aparecer en documentación, formularios, registros, credenciales físicas o conversaciones administrativas.
- No puede cambiarse ante una filtración como sí puede cambiarse una contraseña o revocarse una sesión.
- Tiene un espacio de búsqueda limitado y puede probarse automáticamente si no existen controles de abuso.
- Permite suplantación cuando una persona conoce o averigua el DNI de otro afiliado.
- Puede facilitar la enumeración de afiliados si el sistema responde de forma distinta para DNI existentes y no existentes.
- No demuestra que quien lo ingresa controla un teléfono, email, código de activación o identidad vinculada al afiliado.
- Expondría estado, empresa, número de socio y otros datos personales a terceros no autorizados.

La combinación de DNI y fecha de nacimiento tampoco debe considerarse equivalente a una contraseña robusta. Ambos son datos personales relativamente estáticos y potencialmente conocidos por familiares, empleadores, filtraciones o documentación.

El DNI puede utilizarse como **identificador inicial de búsqueda**, siempre que:

- La búsqueda ocurra en el backend.
- El frontend no contenga la base real de afiliados.
- La respuesta pública no revele de manera insegura si el DNI existe.
- Para completar la activación se exija un segundo elemento verificable.

También puede evaluarse como identificador alternativo de login para cuentas ya existentes, acompañado por contraseña. En ese caso el backend debe resolver la cuenta sin revelar si el DNI está registrado, y el DNI continúa sin funcionar como prueba de afiliación.

## 3. Principios de diseño

La alternativa elegida debe respetar los siguientes principios:

1. **La identidad de autenticación y el registro de afiliación son entidades separadas.**
2. **La vinculación inicial es el momento de mayor riesgo.** No debe crearse una asociación definitiva solamente porque alguien conoce un DNI.
3. **El canal OTP debe estar previamente registrado o validarse mediante un proceso alternativo confiable.**
4. **La autenticación no define por sí sola los permisos.** El estado del afiliado y las reglas de M.T.C.P. se evalúan por separado.
5. **Los mensajes públicos deben minimizar la enumeración.**
6. **La recuperación de acceso debe tener controles equivalentes o superiores a la activación inicial.**
7. **Las excepciones administrativas deben ser auditables y aplicar el principio de menor privilegio.**
8. **No se deben compartir cuentas entre titular y beneficiario si ambos necesitan acceso personal.**

## 4. Modelo de acceso por niveles

### 4.1 Visitante o `guest`

No posee sesión ni cuenta obligatoria. Puede consultar beneficios, convenios, turismo, paquetes, novedades, sedes, contacto e información institucional cuando esos registros se encuentren publicados.

No puede consultar credencial, estado de afiliación, número de socio, empresa, beneficiarios, vigencia ni otros datos privados.

### 4.2 Usuario registrado

Crea una cuenta con nombre, apellido, DNI, email y contraseña. Debe verificar el email antes de considerar operativa la cuenta.

Puede iniciar sesión y consultar contenido público. No obtiene credencial por registrarse ni por verificar su email. Puede solicitar que M.T.C.P. valide su afiliación.

Estados de negocio previstos para la cuenta o experiencia de validación:

- `pending_email_verification`: la cuenta fue creada pero el email todavía no fue confirmado.
- `pending_affiliate_validation`: existe una solicitud de afiliación pendiente de revisión.
- `active_non_affiliate`: cuenta operativa sin una vinculación de afiliado aprobada.
- `rejected`: la solicitud de afiliación fue rechazada; no habilita datos privados.
- `blocked`: la cuenta no puede iniciar sesión o realizar operaciones protegidas según la regla aplicada.

Estos estados no sustituyen la autorización de credencial. El permiso privado se deriva de una relación aprobada en `user_affiliates`.

### 4.3 Afiliado validado

Es un usuario registrado con una relación cuenta–afiliado aprobada y vigente por M.T.C.P. Puede consultar credencial, estado y datos privados autorizados. La aprobación puede revocarse sin borrar necesariamente la cuenta ni impedirle consultar contenido público.

### 4.4 Administrador o personal autorizado

Puede revisar solicitudes, aprobar, rechazar o revocar vinculaciones y mantener contenido según permisos. Toda acción sensible debe quedar auditada. El panel avanzado queda fuera del MVP, pero debe existir un procedimiento mínimo seguro antes de habilitar credenciales reales.

### 4.5 Matriz de acceso

| Recurso o acción | `guest` | Registrado sin aprobación | Afiliado validado | Personal autorizado |
| --- | --- | --- | --- | --- |
| Contenido público publicado | Sí | Sí | Sí | Sí |
| Datos básicos de su cuenta | No | Solo propios | Solo propios | Según permiso |
| Solicitar validación | No | Sí | No aplica o revisión | Gestiona según permiso |
| Credencial digital | No | No | Solo propia y autorizada | Solo si su función lo permite |
| Estado y perfil de afiliado | No | No | Solo propios y autorizados | Según permiso y auditoría |
| Aprobar o revocar vínculos | No | No | No | Sí, con permiso específico |
| Mantener contenido | No | No | No | Según rol |

## 5. Modelo conceptual de identidad y afiliación

El modelo futuro debe separar las siguientes entidades:

- `auth.users`: cuenta de autenticación, email verificado, contraseña y sesiones administradas por el proveedor de Auth.
- `profiles`: datos básicos declarados de la cuenta, estado operativo y referencia al usuario autenticado. No representa un afiliado oficial.
- `affiliates`: registros reales provenientes de la fuente oficial de M.T.C.P. No se crean automáticamente desde el formulario público.
- `user_affiliates`: relación auditable entre una cuenta y un afiliado, con estados como `pending`, `approved`, `rejected` o `revoked`.

La regla conceptual de acceso es:

```text
credential_access = authenticated_account
  AND operational_account
  AND user_affiliates.status = approved
  AND affiliate_access_rule_allows_it
```

Nombre, apellido, DNI, email verificado o una coincidencia automática no deben reemplazar esa relación aprobada.

El modelo debe contemplar claves primarias internas, claves foráneas e índices en las columnas de relación y autorización. La definición SQL se realizará más adelante en `docs/supabase-data-model.md`; ese documento todavía no existe y no se crea en esta etapa.

## 6. Alternativas para validar la afiliación

Las alternativas siguientes no son requisitos para consultar contenido público ni para crear una cuenta. Son mecanismos posibles para aportar evidencia y permitir que M.T.C.P. apruebe la relación entre un usuario registrado y un afiliado real.

### A. DNI + OTP por teléfono registrado

#### Cómo funciona

1. El usuario registrado y con email verificado solicita validar su afiliación.
2. El backend busca el registro sin revelar el resultado de forma directa.
3. Si el registro real posee un teléfono previamente registrado y habilitado, se solicita el envío de un código de un solo uso por SMS u otro canal telefónico aprobado.
4. La interfaz muestra únicamente una referencia enmascarada del destino cuando sea seguro hacerlo.
5. El afiliado ingresa el código.
6. El backend verifica el código, registra la evidencia y permite que M.T.C.P. apruebe la vinculación según su procedimiento.

#### Datos necesarios

- DNI normalizado.
- Identificador interno estable del afiliado.
- Número telefónico en formato normalizado.
- Confirmación de que el teléfono pertenece o está autorizado para ese afiliado.
- Fecha o fuente de la última actualización del teléfono.
- Proveedor de mensajería con cobertura adecuada.

#### Ventajas

- Experiencia rápida y conocida para usuarios de celular.
- No agrega otra contraseña ni pregunta personal para demostrar la relación con el afiliado.
- Permite verificar control del teléfono registrado.
- Puede utilizarse como evidencia reforzada en recuperación, si el teléfono continúa validado.
- Tiene integración directa con proveedores de autenticación por teléfono.

#### Desventajas

- Tiene costo por mensaje y dependencia de un proveedor externo.
- Puede fallar por falta de señal, demoras, números dados de baja o formatos incorrectos.
- Muchos afiliados pueden tener teléfonos desactualizados, compartidos o pertenecientes a otra persona.
- Requiere soporte operativo cuando el código no llega.

#### Riesgos

- SIM swap o portabilidad fraudulenta.
- Teléfonos compartidos dentro de una familia o empresa.
- Reciclado de números telefónicos.
- Intercepción del mensaje o acceso físico al dispositivo.
- Abuso del endpoint de envío para generar costos.
- Enumeración si se muestra el teléfono enmascarado antes de superar controles suficientes.

#### Complejidad técnica

**Media-alta.** Requiere integración con proveedor SMS, normalización de números, rate limiting, manejo de entrega, expiración, reintentos, recuperación y vinculación segura con el afiliado.

#### Experiencia para el afiliado

**Buena cuando el teléfono está actualizado.** Puede ser frustrante o bloqueante cuando el registro institucional es incorrecto.

#### Impacto operativo para M.T.C.P.

- Depuración y actualización previa de teléfonos.
- Presupuesto de mensajería.
- Atención de casos sin entrega.
- Procedimiento para modificar un teléfono sin habilitar fraude de recuperación.

#### Compatibilidad con Supabase

**Alta.** Supabase Auth admite verificación con OTP telefónico y requiere configurar un proveedor SMS. La cuenta principal puede continuar usando email y contraseña. La búsqueda DNI → teléfono, el resultado del OTP y la aprobación teléfono → afiliado deben permanecer en lógica segura de backend; no debe entregarse la base ni el teléfono completo al cliente.

#### Recomendación

**Recomendada como evidencia principal de validación si M.T.C.P. posee teléfonos confiables, recientes y con alta cobertura.** No reemplaza la decisión de aprobación y debe acompañarse con recuperación asistida.

### B. DNI + OTP por email registrado

#### Cómo funciona

1. El usuario registrado y con email verificado solicita validar su afiliación.
2. El backend localiza el afiliado y su email previamente registrado.
3. Se envía un código de un solo uso al email.
4. El afiliado ingresa el código dentro de la app.
5. El sistema verifica el código sobre el email que ya existía en el registro institucional y registra la evidencia para la decisión de M.T.C.P.

Para el MVP se prefiere un código ingresado en la aplicación frente a un magic link, porque reduce la dependencia de redirecciones y deep links. La decisión final debe validarse con pruebas de usabilidad y entrega.

#### Datos necesarios

- DNI normalizado.
- Identificador interno estable del afiliado.
- Email normalizado y previamente verificado o validado por M.T.C.P.
- Servicio SMTP transaccional confiable.
- Estado de entrega, rebotes y actualización del email.

#### Ventajas

- Generalmente tiene menor costo por envío que SMS.
- No depende de cobertura celular.
- Puede funcionar desde cualquier dispositivo con acceso al correo.
- Es compatible con recuperación de acceso y comunicaciones de seguridad.

#### Desventajas

- Parte de la población puede no usar email regularmente.
- Los mensajes pueden llegar a spam, demorarse o rebotar.
- Puede haber emails compartidos entre familiares.
- Cambiar entre la app y el correo agrega fricción.

#### Riesgos

- Cuenta de email comprometida.
- Emails institucionales desactualizados o cargados con errores.
- Reenvíos automáticos o buzones compartidos.
- Enumeración mediante mensajes diferentes.
- Links de un solo uso consumidos por escáneres de seguridad si se optara por magic links.

#### Complejidad técnica

**Media.** Requiere proveedor de correo, plantillas institucionales, control de rebotes, expiración, rate limiting y soporte de recuperación.

#### Experiencia para el afiliado

**Media a buena**, dependiendo de la adopción real del correo entre los afiliados y de la calidad de la entrega.

#### Impacto operativo para M.T.C.P.

- Limpieza y verificación de emails.
- Configuración de dominio y proveedor de correo transaccional.
- Atención de rebotes, spam y usuarios sin acceso al correo registrado.

#### Compatibilidad con Supabase

**Alta.** Supabase Auth admite OTP por email. El OTP utilizado para validar afiliación debe dirigirse al email preexistente del registro oficial, no simplemente al email declarado durante el alta. La vinculación debe ocurrir mediante un flujo controlado.

#### Recomendación

**Alternativa de validación si la cobertura y calidad de emails institucionales supera a la de teléfonos.** También puede funcionar como canal secundario de recuperación, siempre que el email haya sido previamente validado por M.T.C.P.

### C. DNI + fecha de nacimiento + OTP

#### Cómo funciona

1. El usuario registrado presenta DNI y fecha de nacimiento como parte de su solicitud de validación.
2. El backend compara ambos datos con el registro institucional.
3. Si coinciden, envía un OTP al teléfono o email previamente registrado.
4. El afiliado valida el OTP y se completa la vinculación.

#### Datos necesarios

- DNI.
- Fecha de nacimiento completa y confiable.
- Teléfono o email previamente registrado.
- Reglas sobre errores e inconsistencias de fecha.

#### Ventajas

- Reduce algunos intentos casuales con DNI incorrecto.
- Puede ayudar a desambiguar registros duplicados.
- Agrega una comprobación de consistencia antes de enviar el OTP.

#### Desventajas

- La fecha de nacimiento tampoco es un secreto robusto.
- Agrega fricción y un campo sensible adicional.
- Puede generar soporte por fechas mal cargadas.
- No resuelve la ausencia de teléfono o email confiable.

#### Riesgos

- Ambos datos pueden obtenerse mediante fuentes públicas, filtraciones o ingeniería social.
- Puede aumentar el valor de la información recolectada por un atacante.
- Mensajes de error diferentes podrían confirmar qué dato es correcto.
- Bloqueos injustificados por errores históricos en la base.

#### Complejidad técnica

**Media.** Es similar a A o B, con validación y normalización adicional de datos personales.

#### Experiencia para el afiliado

**Media.** Es más larga que DNI + OTP y puede ser problemática si la fecha institucional no coincide.

#### Impacto operativo para M.T.C.P.

- Auditoría previa de fechas de nacimiento.
- Gestión de reclamos por datos incorrectos.
- Mayor responsabilidad por tratamiento de datos personales.

#### Compatibilidad con Supabase

**Media-alta.** La fecha de nacimiento se validaría en el backend de activación; no constituye un mecanismo nativo de Supabase Auth. Supabase gestionaría después el OTP y la sesión.

#### Recomendación

**No recomendada como factor principal ni como sustituto del OTP.** Puede utilizarse como señal de coincidencia o desambiguación si M.T.C.P. confirma calidad de datos, pero no debe considerarse una mejora suficiente de seguridad por sí sola.

### D. Activación inicial con código entregado por M.T.C.P.

#### Cómo funciona

1. M.T.C.P. genera un código de activación aleatorio, de un solo uso y asociado a un afiliado.
2. El código se entrega mediante un canal controlado: presencial, carta, recibo, comunicación interna validada u otro procedimiento aprobado.
3. El usuario registrado ingresa el código para respaldar su solicitud de vinculación.
4. El backend verifica asociación, vigencia, uso previo e intentos.
5. El afiliado registra y verifica un teléfono o email para los accesos futuros.
6. El código queda consumido y no puede reutilizarse.

#### Datos necesarios

- Identificador interno del afiliado.
- Código aleatorio con suficiente entropía.
- Fecha de emisión y expiración.
- Estado: emitido, utilizado, revocado o vencido.
- Canal y responsable de entrega.
- Teléfono o email que se registrará para accesos posteriores.

#### Ventajas

- No depende de que la base existente tenga teléfonos o emails actualizados.
- Permite controlar la vinculación inicial.
- Puede distribuirse durante trámites o comunicaciones ya existentes.
- Facilita una migración gradual por grupos.

#### Desventajas

- Requiere generar, distribuir, reemitir y revocar códigos.
- El afiliado puede perderlo o no comprender el proceso.
- Puede producir una carga administrativa considerable.
- La seguridad depende fuertemente del canal de entrega.

#### Riesgos

- Robo, fotografía, reenvío o entrega al destinatario equivocado.
- Códigos predecibles o con vigencia excesiva.
- Reutilización si no se invalidan de forma atómica.
- Fraude interno durante emisión o reemisión.
- Ingeniería social para solicitar un código nuevo.

#### Complejidad técnica

**Media-alta.** Requiere un servicio propio de emisión, validación, expiración, revocación y auditoría, además del registro posterior de una identidad permanente.

#### Experiencia para el afiliado

**Media.** Es clara cuando el código llega correctamente, pero agrega un paso y puede requerir asistencia.

#### Impacto operativo para M.T.C.P.

**Alto durante el alta inicial.** Requiere responsables, canales de entrega, reemisión controlada y soporte. Puede reducirse con activaciones por cohortes.

#### Compatibilidad con Supabase

**Alta como flujo complementario, no como función nativa directa.** El código se valida en un backend seguro y, una vez aceptado, se crea o vincula una identidad de Supabase Auth con teléfono o email verificado. Las credenciales administrativas nunca deben exponerse al cliente.

#### Recomendación

**Recomendada cuando M.T.C.P. no posee contactos suficientemente confiables.** Debe utilizarse solamente para validar la primera vinculación y no como credencial recurrente.

### E. Cuenta pública con email y contraseña usando Supabase Auth

#### Cómo funciona

1. El usuario crea una cuenta pública con email y contraseña, verifica el email y luego puede iniciar sesión.
2. Supabase Auth crea o recupera una identidad en `auth.users` y emite una sesión.
3. El sistema mantiene la identidad separada del registro de afiliación y solamente crea una vinculación aprobada después del proceso de M.T.C.P.
4. Las consultas se autorizan según esa vinculación.

#### Datos necesarios

- Email único y verificado.
- Contraseña procesada exclusivamente por el proveedor de autenticación.
- Identificador de usuario de autenticación.
- Identificador interno del afiliado.
- Relación inequívoca y auditable entre ambos.
- Método de activación que autorice la vinculación inicial.

#### Ventajas

- Gestión estandarizada de contraseñas, sesiones, tokens, verificación de email y recuperación.
- Evita desarrollar desde cero la infraestructura de autenticación.
- Permite recuperación y evolución futura.
- Se integra naturalmente con RLS.
- Puede admitir teléfono, email o ambos según disponibilidad.

#### Desventajas

- Poseer un email o teléfono no demuestra por sí solo que la persona sea el afiliado correcto.
- Requiere resolver duplicados, contactos compartidos y cambios de canal.
- Introduce dependencia de proveedor, configuración y entrega de emails transaccionales.
- La seguridad final depende de las políticas de autorización, no solo de Auth.

#### Riesgos

- Vinculación incorrecta entre `auth.users` y afiliados.
- Creación automática de usuarios no autorizados si la configuración lo permite.
- Exposición de una clave administrativa en el frontend.
- Políticas RLS incompletas que permitan acceso cruzado.
- Autorización basada en metadata editable por el usuario.

#### Complejidad técnica

**Media.** Reduce la complejidad del motor de autenticación, pero no elimina la necesidad de diseñar activación, vinculación, RLS, recuperación y auditoría.

#### Experiencia para el afiliado

**Buena** si puede utilizar un canal propio, conocido y actualizado.

#### Impacto operativo para M.T.C.P.

- Gestión de casos de contactos duplicados o desactualizados.
- Definición del mecanismo de vinculación inicial.
- Soporte para cambios y recuperación.
- Administración segura del proyecto y proveedor de email transaccional.

#### Compatibilidad con Supabase

**Nativa.** Es la alternativa base para gestionar identidad y sesión. Sin embargo, Supabase Auth debe complementarse con una tabla de afiliados separada y políticas que comprueben propiedad de cada registro.

#### Recomendación

**Recomendada como motor de cuenta, login y sesión futuros, pero no como prueba autónoma de afiliación.** Para el MVP se recomienda email verificado y contraseña como acceso principal; A, B, D o F pueden respaldar la aprobación de la vinculación.

### F. Validación asistida por personal administrativo

#### Cómo funciona

1. El afiliado solicita asistencia presencial o por un canal institucional aprobado.
2. Personal autorizado verifica la identidad usando un procedimiento definido por M.T.C.P.
3. Se actualiza o confirma el teléfono/email, o se emite un código de activación.
4. El afiliado completa la activación y verifica su canal.
5. La intervención queda registrada en auditoría.

#### Datos necesarios

- Procedimiento formal de verificación.
- Identidad y rol del operador.
- Motivo de la asistencia.
- Registro de las acciones realizadas.
- Canal de contacto nuevo o confirmado.
- Evidencia mínima permitida por la política institucional.

#### Ventajas

- Resuelve datos desactualizados y casos excepcionales.
- Incluye a afiliados con baja alfabetización digital.
- Permite corregir inconsistencias antes de vincular la cuenta.
- Puede ofrecer mayor confianza en casos de riesgo.

#### Desventajas

- Es costosa y difícil de escalar como flujo principal.
- Depende de horarios, sedes y capacitación del personal.
- Puede requerir presencia física.
- Aumenta tiempos de activación.

#### Riesgos

- Ingeniería social contra el personal.
- Fraude interno o errores de operador.
- Acceso administrativo excesivo.
- Falta de trazabilidad.
- Almacenamiento innecesario de documentación sensible.

#### Complejidad técnica

**Media**, pero con **alta complejidad operativa**. Requiere permisos administrativos limitados, auditoría, revocación y procedimientos de soporte.

#### Experiencia para el afiliado

**Buena como excepción y mala como requisito general.** Es valiosa para quien necesita ayuda, pero inconveniente si todos deben acudir a una sede.

#### Impacto operativo para M.T.C.P.

**Alto.** Exige capacitación, responsables, trazabilidad, tiempos de atención y revisión periódica de permisos.

#### Compatibilidad con Supabase

**Alta como flujo administrativo complementario.** El personal puede habilitar la activación o actualizar el canal mediante funciones de backend controladas. Nunca debe utilizar una clave administrativa desde el navegador ni operar directamente sobre `auth.users` sin una capa segura y auditable.

#### Recomendación

**Recomendada como vía de recuperación y excepción, no como mecanismo principal para toda la población.**

## 7. Comparación resumida

| Alternativa | Seguridad inicial | Experiencia si los datos son correctos | Carga operativa | Complejidad técnica | Uso recomendado |
| --- | --- | --- | --- | --- | --- |
| A. DNI + OTP teléfono | Alta con teléfono validado | Alta | Media | Media-alta | Evidencia principal si los teléfonos son confiables |
| B. DNI + OTP email | Alta con email institucional validado | Media-alta | Media | Media | Evidencia principal o secundaria según calidad |
| C. DNI + nacimiento + OTP | Similar al OTP; nacimiento agrega poco | Media | Media | Media | Señal auxiliar, no factor principal |
| D. Código de activación | Alta si emisión y entrega son seguras | Media | Alta | Media-alta | Alta inicial cuando faltan contactos confiables |
| E. Cuenta Supabase Auth | Autentica cuenta; no prueba afiliación | Alta | Media | Media | Motor de registro, login y sesión |
| F. Activación asistida | Alta con procedimiento robusto | Variable | Alta | Media | Recuperación y excepciones |

## 8. Recomendación inicial para el MVP

La recomendación inicial es separar registro público, login y validación de afiliación:

### Cuenta pública y acceso recurrente

1. La app permanece abierta para contenido público sin login.
2. Quien quiera una cuenta se registra con nombre, apellido, DNI, email y contraseña.
3. Debe verificar el email.
4. El login principal utiliza email y contraseña para cuentas existentes.
5. Puede evaluarse DNI + contraseña como alias de login para cuentas existentes, pero no como alta, recuperación ni prueba de afiliación. Supabase Auth no usa el DNI como identidad nativa, por lo que requeriría resolución segura en backend y controles de enumeración.
6. Una cuenta verificada sin vínculo aprobado permanece como `active_non_affiliate` y no accede a credencial.

### Solicitud y decisión de M.T.C.P.

1. El usuario verificado solicita validar su afiliación.
2. La solicitud queda en `pending_affiliate_validation`.
3. M.T.C.P. contrasta la solicitud con la fuente oficial y aplica uno de los mecanismos A, B, D o F según la calidad de datos.
4. La aprobación crea `user_affiliates.status = approved` y queda auditada.
5. El rechazo no entrega datos privados.
6. La revocación elimina el acceso a credencial sin necesidad de eliminar la cuenta pública.

La verificación de email prueba control de una casilla, no condición de afiliado.

### Escenario recomendado cuando existen teléfonos confiables

1. **DNI + OTP al teléfono previamente registrado** como evidencia principal para la validación de afiliación.
2. **Cuenta con email y contraseña** como motor futuro de identidad y sesión.
3. **Activación asistida por personal** como recuperación cuando el teléfono esté desactualizado, no llegue el OTP o exista una inconsistencia.
4. **Email verificado** como canal secundario opcional si la calidad de los emails lo permite.

### Escenario cuando los emails son más confiables que los teléfonos

1. Comparar el email verificado de la cuenta con el email previamente registrado, sin aprobar únicamente por coincidencia automática.
2. Utilizar un OTP al email institucional como evidencia para la validación.
3. Mantener Supabase Auth con email y contraseña como motor futuro de identidad y sesión.
4. Utilizar teléfono o asistencia administrativa como recuperación secundaria.

### Escenario cuando no existen contactos confiables suficientes

1. **Código inicial de activación entregado por M.T.C.P.** o activación asistida.
2. La cuenta pública ya posee un email verificado; el código o la asistencia prueban la relación con el afiliado.
3. Los accesos posteriores utilizan email y contraseña; OTP puede reservarse para verificación adicional o recuperación.
4. El código inicial se consume y no vuelve a utilizarse.

### Condición previa para decidir

M.T.C.P. debe ejecutar un análisis de calidad de datos que mida:

- Porcentaje de afiliados con teléfono cargado.
- Porcentaje con teléfono actualizado o verificado.
- Cantidad de números duplicados o compartidos.
- Porcentaje de afiliados con email.
- Porcentaje de emails válidos y sin rebote.
- Capacidad de recuperar o actualizar esos datos.
- Distribución por sede y población con necesidad de asistencia.

Como criterio orientativo para un piloto, el canal principal debería ofrecer cobertura suficiente para la gran mayoría del grupo seleccionado y demostrar buena entrega en una prueba controlada. Si requiere excepciones frecuentes, no debe imponerse como único canal nacional.

### Beneficiarios

Si un beneficiario necesita consultar datos propios, la recomendación es que tenga una identidad autenticada propia y una vinculación explícita con su registro. No se recomienda compartir la cuenta del titular porque elimina trazabilidad y dificulta revocar permisos individualmente.

Si M.T.C.P. no posee datos suficientes para identificar y recuperar cuentas de beneficiarios, su acceso propio debería quedar fuera de la primera salida productiva hasta definir el proceso.

## 9. Flujos sugeridos

### 9.1 Flujo de registro público

1. La persona puede explorar contenido público sin registrarse.
2. Decide crear una cuenta e ingresa nombre, apellido, DNI, email y contraseña.
3. El backend aplica validaciones, rate limiting y prevención de cuentas automatizadas.
4. Se crea la cuenta en `pending_email_verification`.
5. El sistema envía la verificación al email.
6. La persona verifica el email.
7. Se crea o habilita su `profile` como cuenta operativa sin afiliación aprobada.
8. La app informa que puede seguir usando contenido público y solicitar validación de credencial.

El alta no debe consultar ni devolver automáticamente datos del registro `affiliates`.

### 9.2 Flujo de login para cuentas existentes

1. El usuario ingresa email y contraseña.
2. Opcionalmente, si M.T.C.P. lo aprueba, puede ingresar DNI y contraseña como alias de una cuenta ya existente.
3. El sistema utiliza mensajes neutros ante credenciales inválidas.
4. Después de autenticar, obtiene su perfil de cuenta.
5. Solamente consulta datos privados si existe una relación `approved`.

### 9.3 Flujo de solicitud de validación de credencial

1. El usuario registrado y con email verificado solicita validar su afiliación.
2. El sistema crea una solicitud `pending` sin mostrar datos del afiliado candidato.
3. El backend compara la solicitud con la fuente oficial mediante un proceso seguro.
4. M.T.C.P. aplica la evidencia elegida: OTP a contacto preexistente, código de activación o asistencia administrativa.
5. Personal o una regla institucional controlada aprueba o rechaza la relación.
6. La aprobación crea o actualiza `user_affiliates.status = approved` de forma atómica.
7. Se registran aprobador, fecha, método y motivo, sin guardar OTP.
8. La app habilita la credencial únicamente después de volver a comprobar la autorización.

### 9.4 Acceso posterior a credencial

1. El usuario inicia sesión con su cuenta existente.
2. El backend confirma que la cuenta está operativa.
3. Verifica una relación `approved` y las reglas actuales del afiliado.
4. Devuelve solamente la credencial y campos autorizados del afiliado vinculado.
5. Si la relación fue revocada, la cuenta conserva contenido público pero pierde acceso privado.

### 9.5 Propiedades obligatorias de la vinculación

- Un mismo usuario no debe asociarse accidentalmente con afiliados incompatibles.
- Dos usuarios no deben reclamar el mismo registro sin una regla explícita para titulares y beneficiarios.
- Cambiar teléfono, email, nombre o DNI declarado no debe reasignar automáticamente datos privados.
- Una llamada repetida no debe crear asociaciones duplicadas.
- La aprobación y revocación deben ser transacciones consistentes y auditables.

## 10. Casos especiales

### 10.1 Visitante sin cuenta

- Debe poder consultar contenido público aunque no exista sesión.
- Una falla del servicio de autenticación no debería ocultar contenido público ya disponible, salvo que el backend de contenido también esté afectado.
- Al intentar abrir Credencial Digital, debe recibir una explicación y opciones de registro/login, sin datos privados.

### 10.2 Usuario registrado no afiliado

- Puede iniciar sesión y mantener su perfil básico de cuenta.
- Puede consultar el mismo contenido público que un visitante.
- No debe recibir datos de `affiliates` ni indicios sobre posibles coincidencias.
- Puede iniciar una solicitud de validación si cumple los requisitos.
- La interfaz debe evitar presentarlo como afiliado mientras no exista una relación aprobada.

### 10.3 Solicitud rechazada

- No habilita credencial ni datos privados.
- La cuenta puede conservar acceso público, salvo que también haya una razón independiente para bloquearla.
- El motivo interno detallado no debe exponerse si revela datos sensibles o controles antifraude.
- Debe existir un canal de revisión o corrección definido por M.T.C.P.
- Una nueva solicitud debe respetar plazos, límites y reglas de reapertura.

### 10.4 Teléfono o email desactualizado

- No permitir que el usuario reemplace el canal únicamente con DNI y un dato personal estático.
- Mostrar una opción de asistencia sin revelar el dato completo registrado.
- Derivar a un proceso administrativo con verificación reforzada.
- Registrar quién modificó el contacto, cuándo, por qué y desde qué canal.
- Después del cambio, verificar el nuevo canal antes de habilitar acceso.
- Notificar al canal anterior cuando sea razonable y seguro.

### 10.5 DNI no encontrado

- Responder con un mensaje neutro, por ejemplo: “Si los datos ingresados coinciden con un registro habilitado, recibirás instrucciones para continuar”.
- No indicar si el DNI existe, está inactivo o carece de contacto antes de validar identidad.
- Ofrecer un canal institucional general de consulta.
- Aplicar rate limiting incluso cuando el DNI no existe.

### 10.6 Afiliado inactivo

La autenticación y el estado de afiliación deben evaluarse por separado. M.T.C.P. debe decidir si un afiliado inactivo:

- Puede ingresar y ver una credencial marcada como no vigente.
- Puede consultar beneficios públicos pero no utilizarlos.
- Recibe únicamente instrucciones de regularización.
- Pierde todo acceso privado.

La respuesta no debe revelar el estado antes de validar identidad.

### 10.7 Afiliado suspendido

- Aplicar la regla institucional aprobada para suspensión.
- Mostrar un mensaje claro y un canal de contacto después de autenticar.
- Evitar que la suspensión se eluda creando otra identidad.
- Conservar trazabilidad de accesos y cambios relevantes.

### 10.8 Beneficiario

- No asumir que puede usar la cuenta del titular.
- Definir si posee un registro, contacto y credencial propios.
- Si tiene acceso propio, crear una identidad independiente y autorizar exclusivamente sus datos.
- Definir qué puede ver el titular sobre sus beneficiarios.
- Evitar que la relación familiar por sí sola otorgue acceso sin validación.

### 10.9 Cuenta bloqueada

- Utilizar bloqueo temporal o desafío adicional según el tipo de abuso.
- Evitar bloqueos permanentes automáticos que un atacante pueda provocar contra otra persona.
- Permitir recuperación mediante un canal validado o asistencia administrativa.
- Auditar bloqueos, desbloqueos y operador responsable.

### 10.10 Demasiados intentos

- Limitar solicitudes por IP, DNI protegido o seudonimizado, cuenta, dispositivo y destino de envío según corresponda.
- Aplicar espera progresiva entre intentos.
- Limitar tanto el envío como la verificación del OTP.
- Invalidar desafíos anteriores cuando se emita uno nuevo, de acuerdo con el proveedor.
- Evaluar CAPTCHA o un control equivalente ante patrones automatizados.
- Mostrar mensajes que no ayuden a enumerar cuentas.

### 10.11 Recuperación de acceso

Orden recomendado:

1. Recuperación mediante el mismo canal previamente verificado.
2. Canal secundario previamente verificado, si existe.
3. Código de recuperación emitido por M.T.C.P. bajo un procedimiento controlado.
4. Asistencia administrativa con verificación reforzada.

La recuperación nunca debe ser más débil que la activación inicial. Preguntas personales estáticas no deben utilizarse como único mecanismo de recuperación.

## 11. Seguridad

### 11.1 Rate limiting y prevención de abuso

- Aplicar límites separados para registro, login, recuperación, solicitud de validación, envío y verificación de OTP.
- Combinar controles por IP, cuenta, identificador protegido y destino.
- Implementar espera progresiva y límites por ventana temporal.
- Incorporar protección contra bots cuando el volumen o riesgo lo justifique.
- Monitorear aumentos anormales de cuentas, intentos, envíos, errores y costos de SMS/email.
- No confiar únicamente en los límites predeterminados del proveedor.

### 11.2 Contraseñas y verificación de email

- Las contraseñas deben ser procesadas y almacenadas únicamente por el proveedor de autenticación mediante mecanismos seguros de hashing.
- La aplicación y M.T.C.P. nunca deben poder leer una contraseña en texto plano.
- Definir longitud mínima, controles contra contraseñas débiles o filtradas y recuperación segura.
- El DNI, nombre, apellido, email o fecha de nacimiento no deben aceptarse como sustitutos de contraseña.
- La creación de cuenta requiere verificar el email antes de habilitar operaciones de cuenta protegidas.
- La recuperación de contraseña utiliza el email verificado y mensajes que no enumeren cuentas.
- Cambiar email o contraseña debe generar notificaciones de seguridad cuando la plataforma lo permita.
- Verificar email prueba control de la casilla, no afiliación.

### 11.3 OTP

- Debe ser aleatorio, de un solo uso y con expiración breve.
- La vigencia exacta se definirá según canal y pruebas; como punto de partida puede evaluarse una ventana de pocos minutos.
- Debe existir un máximo de intentos de verificación por desafío.
- Un código validado, vencido o reemplazado no debe volver a aceptarse.
- No guardar OTP en el frontend, `localStorage`, analytics ni logs.
- Si M.T.C.P. implementa desafíos propios, no almacenar el código en texto plano.
- Nunca solicitar el OTP al afiliado por teléfono, email o chat desde soporte.

### 11.4 Prevención de enumeración

- Utilizar respuestas externas equivalentes para DNI existente, inexistente, inactivo o sin contacto.
- Evitar diferencias evidentes de contenido y, cuando sea posible, de tiempos de respuesta.
- No mostrar teléfono o email completos.
- No permitir búsquedas públicas de número de socio, estado o datos personales.
- No confirmar si un DNI ya tiene cuenta, solicitud o registro de afiliado mediante mensajes diferenciados.
- Registrar patrones de enumeración sin almacenar más datos personales de los necesarios.

### 11.5 Sesión y almacenamiento cliente

- No guardar DNI, perfil completo, OTP ni datos de afiliación innecesarios en `localStorage`.
- Utilizar el mecanismo de sesión soportado y recomendado para la arquitectura que finalmente se adopte.
- Definir expiración, renovación, cierre y revocación de sesiones.
- El logout debe eliminar el acceso local y revocar o invalidar la sesión cuando corresponda.
- No registrar access tokens o refresh tokens en consola, analytics o reportes de error.
- Cuando exista una app nativa futura, revisar almacenamiento seguro de tokens para iOS y Android.

### 11.6 Auditoría

Registrar como mínimo:

- Solicitud de activación, sin guardar OTP.
- Resultado general de activación.
- Creación y verificación de cuenta.
- Solicitud, aprobación, rechazo y revocación de afiliación.
- Vinculación y desvinculación entre identidad y afiliado.
- Cambios de teléfono o email.
- Bloqueos y desbloqueos.
- Recuperaciones asistidas.
- Acciones administrativas sensibles.
- Revocación de sesiones cuando aplique.

Los logs deben minimizar datos personales, tener acceso restringido y una política de retención definida por M.T.C.P.

### 11.7 Separación entre cuenta, perfil, afiliado y vínculo

En una futura arquitectura con Supabase:

- `auth.users` representa la identidad autenticada y es administrada por Supabase Auth.
- `profiles` representa nombre, apellido, DNI declarado y estado básico de la cuenta. Es información de cuenta, no prueba oficial de afiliación.
- `affiliates` representa el registro institucional de afiliación y pertenece al dominio de M.T.C.P.
- `user_affiliates` representa la relación revisada entre `auth.users` y `affiliates`, incluyendo estado, fechas y auditoría.
- La relación debe usar identificadores internos estables; el DNI no debe ser la clave primaria de autorización.
- La credencial se habilita solamente cuando `user_affiliates.status = approved` y las reglas actuales del afiliado lo permiten.
- Los datos declarados en `profiles` no deben copiarse automáticamente sobre `affiliates` ni aprobar coincidencias por sí solos.
- La vinculación inicial debe ejecutarse en backend seguro y ser auditable.
- El frontend nunca debe recibir credenciales con privilegios administrativos.
- Los permisos no deben basarse en `user_metadata`, porque es editable por el usuario.
- Las claves foráneas y columnas utilizadas para autorización deben tener restricciones e índices apropiados.

### 11.8 Separación entre contenido público y privado

- Beneficios, convenios, turismo, paquetes, novedades, sedes e información institucional solo son públicos cuando su estado de publicación lo permite.
- Las políticas públicas no deben aplicarse por reutilización a tablas de perfiles, afiliados, vínculos o credenciales.
- Una cuenta registrada sin vínculo aprobado no debe obtener más datos privados que un visitante.
- El contenido personalizado por sede o condición de afiliación debe calcularse después de autorizar al usuario.
- La administración de contenido requiere permisos distintos de la validación de afiliados.

### 11.9 RLS futura en Supabase

- Habilitar RLS en todas las tablas expuestas que contengan datos privados.
- Una política para `authenticated` no es suficiente por sí sola: debe comprobar que la fila pertenece al usuario autenticado.
- El criterio esperado para credenciales debe comprobar que `auth.uid()` posee una relación `user_affiliates` aprobada con la fila solicitada.
- Beneficios públicos y datos privados deben tener políticas diferentes.
- Las vistas y funciones deben revisarse porque pueden cambiar el comportamiento de RLS según su configuración.
- Las claves `service_role` o secretas solamente pueden utilizarse en backend seguro; nunca en variables públicas del frontend.
- Las columnas de `user_affiliates` utilizadas por RLS deben indexarse para evitar políticas costosas.
- La autorización debe probarse con un visitante, un registrado sin aprobación, dos afiliados aprobados diferentes y un vínculo revocado.

### 11.10 Cambios de identidad y revocación

- Cambiar teléfono o email no debe reasignar automáticamente la afiliación.
- Revocar `user_affiliates` debe impedir nuevas lecturas privadas aunque la sesión de la cuenta siga activa.
- Bloquear una cuenta y revocar una afiliación son operaciones distintas y deben poder aplicarse por separado.
- Antes de eliminar o reemplazar una cuenta, se deben revocar las sesiones correspondientes cuando la plataforma lo requiera.
- Los tokens existentes pueden conservar validez hasta su expiración; los flujos sensibles pueden requerir comprobaciones adicionales de sesión vigente.
- Los permisos administrativos deben revisarse periódicamente.

## 12. Decisiones pendientes para M.T.C.P.

### Registro y cuenta pública

- ¿El registro estará abierto a cualquier persona desde el primer lanzamiento?
- ¿Email y contraseña serán el login principal?
- ¿Se permitirá DNI + contraseña como alias para cuentas existentes?
- ¿Cómo se tratarán emails duplicados, DNI declarados en más de una cuenta o datos inconsistentes?
- ¿Qué operaciones permite una cuenta antes de verificar email?
- ¿Qué comportamiento tendrá una cuenta `rejected` además de perder acceso a credencial?
- ¿Qué condiciones producen `blocked` y quién puede desbloquearla?
- ¿Qué textos deben explicar que registrarse no equivale a ser afiliado?

### Calidad y fuente de datos

- ¿Cuál es la fuente oficial de afiliados?
- ¿Existe un identificador interno único y estable distinto del DNI?
- ¿Qué porcentaje de afiliados tiene teléfono cargado?
- ¿Cuántos teléfonos están actualizados, repetidos o compartidos?
- ¿Qué porcentaje tiene email cargado y válido?
- ¿Existen fechas de última verificación para teléfono y email?
- ¿Cómo se sincronizarán cambios de contacto con el sistema oficial?

### Canal principal

- ¿Se prefiere SMS, email o una combinación?
- ¿Qué cobertura real tiene cada canal por sede?
- ¿Quién absorberá el costo de SMS y qué volumen se espera?
- ¿Qué proveedor de SMS o email puede contratar M.T.C.P.?
- ¿Se permitirá que el afiliado registre un canal nuevo durante la activación? ¿Con qué prueba previa?

### Reglas de afiliación

- ¿Qué estados pueden activar una cuenta?
- ¿Qué puede ver un afiliado activo, en gracia, inactivo o suspendido?
- ¿Una suspensión invalida sesiones activas inmediatamente?
- ¿Cómo se resuelven duplicados de DNI o registros inconsistentes?

### Beneficiarios

- ¿Los beneficiarios tendrán acceso propio en el MVP?
- ¿Poseen DNI, teléfono/email y registro institucional independiente?
- ¿Pueden compartir un teléfono o email con el titular?
- ¿Qué información puede ver el titular y qué puede ver el beneficiario?
- ¿Cómo se recupera una cuenta de beneficiario?

### Recuperación y soporte

- ¿Habrá asistencia presencial en todas las sedes?
- ¿Existirá un canal remoto de recuperación?
- ¿Qué evidencia puede solicitar el personal sin recolectar datos excesivos?
- ¿Qué roles administrativos podrán actualizar contactos o emitir códigos?
- ¿Quién revisará eventos sospechosos y auditoría?
- ¿Cuál es el plazo esperado de resolución?

### Sesión y privacidad

- ¿Cuánto tiempo debe durar una sesión?
- ¿Se permitirá mantener la sesión iniciada en un dispositivo personal?
- ¿Cuántos dispositivos simultáneos se permiten?
- ¿Qué eventos requieren volver a verificar identidad?
- ¿Qué datos pueden mostrarse antes y después de autenticar?
- ¿Cuánto tiempo deben conservarse logs de autenticación?

### Implementación futura

- ¿Supabase será confirmado como proveedor de autenticación y base de datos?
- ¿Quién será propietario y administrador de la organización de Supabase?
- ¿Qué ambientes existirán para desarrollo, staging y producción?
- ¿Quién administrará los proveedores SMS/SMTP y sus credenciales?
- ¿Qué volumen de usuarios y picos de activación se esperan?

## 13. Validación previa a implementar

Antes de escribir código productivo se recomienda completar:

1. Confirmación del catálogo de contenido público y reglas de publicación.
2. Definición de estados y transiciones de cuenta y validación.
3. Política de registro, email, contraseña, login y recuperación.
4. Auditoría de calidad de teléfonos y emails institucionales.
5. Definición formal de titulares y beneficiarios.
6. Reglas por estado de afiliación.
7. Elección del mecanismo de evidencia y recuperación de validación.
8. Piloto de entrega de OTP si corresponde.
9. Procedimiento administrativo mínimo de aprobación y revocación.
10. Modelo de `profiles`, `affiliates` y `user_affiliates`.
11. Revisión de privacidad y retención de auditoría.
12. Pruebas de abuso, enumeración y acceso cruzado en el diseño.
13. Criterios de aceptación separados para autenticación y autorización.

## 14. Fuera de alcance de esta etapa

Este documento no autoriza ni incluye:

- Cambios al login actual.
- Modificaciones de UI.
- Instalación o configuración de Supabase.
- Creación de tablas, usuarios, políticas RLS o migraciones.
- Integración con proveedores SMS o SMTP.
- Implementación de OTP.
- Implementación de registro, contraseñas o verificación de email.
- Implementación de solicitud o aprobación de afiliaciones.
- Reemplazo de mocks.
- Cambios de sesión o `localStorage`.
- Panel administrativo.
- Empaquetado mobile o Capacitor.

La implementación solo debe comenzar después de que M.T.C.P. responda las decisiones críticas y apruebe una alternativa de activación, recuperación y tratamiento de beneficiarios.

## 15. Referencias técnicas para la etapa futura

- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Autenticación con contraseña](https://supabase.com/docs/guides/auth/passwords)
- [Gestión de datos de usuario](https://supabase.com/docs/guides/auth/managing-user-data)
- [Login telefónico](https://supabase.com/docs/guides/auth/phone-login)
- [Login sin contraseña por email](https://supabase.com/docs/guides/auth/auth-email-passwordless)
- [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Protección CAPTCHA](https://supabase.com/docs/guides/auth/auth-captcha)
- [Checklist de producción y rate limits](https://supabase.com/docs/guides/deployment/going-into-prod)
- [Seguridad de la Data API](https://supabase.com/docs/guides/api/securing-your-api)

Las configuraciones, límites y APIs deben verificarse nuevamente contra la documentación oficial vigente al momento de implementar.
