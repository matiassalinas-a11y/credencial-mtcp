# PRD — MVP productivo de Credencial Digital M.T.C.P.

## Control del documento

| Campo | Valor |
| --- | --- |
| Producto | Credencial Digital M.T.C.P. |
| Versión del PRD | 1.0 |
| Estado | Borrador para validación con M.T.C.P. |
| Alcance | Primera versión productiva del MVP |
| Plataforma inicial | Aplicación web mobile-first |

## 1. Resumen del producto

Credencial Digital M.T.C.P. permite que afiliados de la Mutual de los Trabajadores de la Construcción de la Patagonia accedan de forma segura a su credencial digital, consulten su estado de afiliación y encuentren beneficios institucionales actualizados.

El producto busca reemplazar la consulta informal o manual de información básica por una experiencia digital simple, confiable y diseñada principalmente para celulares. La primera versión productiva debe conservar la experiencia visual ya desarrollada, pero reemplazar los datos simulados y el acceso por DNI de demostración por datos reales autorizados, autenticación real y un backend seguro.

## 2. Objetivo del MVP

El objetivo principal del MVP es permitir que un afiliado autorizado pueda identificarse de manera segura, consultar su credencial y estado de afiliación vigentes, revisar sus datos básicos autorizados y acceder a información actualizada sobre beneficios y delegaciones de M.T.C.P. desde un celular.

El MVP debe validar tres hipótesis centrales:

1. Los afiliados pueden activar su acceso e ingresar sin asistencia permanente del personal de M.T.C.P.
2. La credencial digital y el estado mostrado son útiles, comprensibles y confiables para el afiliado.
3. Los afiliados pueden encontrar beneficios vigentes mediante categorías, sedes y búsqueda.

El MVP no tiene como objetivo publicar inmediatamente una aplicación en App Store o Play Store ni incorporar todos los futuros servicios de la Mutual.

## 3. Usuarios

### 3.1 Afiliado titular

Usuario principal del MVP. Puede activar su acceso, autenticarse, consultar exclusivamente su información autorizada, ver su credencial y estado, consultar beneficios y cerrar sesión.

### 3.2 Beneficiario/a, si aplica

Usuario vinculado a un afiliado titular. Su inclusión efectiva y forma de acceso quedan sujetas a confirmación de M.T.C.P. Se debe definir si utiliza una cuenta propia, la cuenta del titular o si solamente figura como dato dentro de la credencial.

Hasta resolver esta definición, el MVP productivo no debe asumir que un beneficiario posee permisos equivalentes al titular.

### 3.3 Personal administrativo

Personal autorizado de M.T.C.P. responsable de resolver incidencias operativas, verificar datos en los sistemas institucionales y asistir en activaciones o correcciones. No debe poder consultar o modificar información fuera de sus permisos y tareas asignadas.

### 3.4 Futuro administrador de contenidos

Rol responsable de mantener beneficios, delegaciones y contenido institucional. El modelo de permisos y el panel administrativo avanzado están fuera del MVP inicial. Para el lanzamiento deberá existir, como mínimo, un procedimiento seguro y documentado para actualizar y publicar contenido.

## 4. Funciones incluidas en el MVP inicial

### 4.1 Login y activación segura

- Activación inicial mediante un mecanismo de validación de identidad aprobado por M.T.C.P.
- Autenticación real; el DNI no puede utilizarse como único factor secreto de acceso.
- Mensajes claros para credenciales inválidas, acceso no activado, cuenta bloqueada, sesión vencida y errores del servicio.
- Sesión con expiración y cierre seguro.
- Recuperación o asistencia definida para usuarios que no puedan completar el acceso.

El mecanismo concreto de activación queda pendiente de definición. Puede requerir un dato ya registrado, un código de un solo uso u otro proceso institucional verificable.

### 4.2 Credencial digital

- Visualización de la credencial del usuario autenticado.
- Datos reales obtenidos desde el backend.
- Presentación exclusiva de campos autorizados por M.T.C.P.
- Estado y vigencia actualizados.
- Comportamiento visual mobile consistente con la credencial ya aprobada.

La credencial del MVP es informativa. No incluye verificación pública mediante QR.

### 4.3 Estado de afiliación

- Visualización clara del estado actual del afiliado.
- Tratamiento diferenciado para estados activo, período de gracia, inactivo o suspendido, sujeto a las reglas definitivas de M.T.C.P.
- Mensaje explicativo y canal de contacto cuando el estado limite el acceso o la validez de la credencial.

### 4.4 Perfil básico

- Nombre y apellido.
- Número de socio.
- Sede o delegación.
- Empresa, solo si M.T.C.P. autoriza su exposición.
- Fecha de alta y vencimiento, si corresponden y están autorizadas.
- Datos mínimos necesarios para identificar la relación del usuario con M.T.C.P.

El perfil no permitirá la edición libre de datos institucionales en el MVP. Las correcciones deberán seguir un procedimiento administrativo.

### 4.5 Beneficios

- Listado de beneficios publicados y vigentes.
- Beneficios destacados.
- Información resumida: nombre, categoría, descuento o propuesta, sede o región y descripción breve.
- Exclusión automática de beneficios no publicados o vencidos cuando el modelo de datos contemple vigencia.

### 4.6 Buscador y filtros

- Búsqueda por nombre, categoría, descripción, sede o región.
- Filtro por categoría.
- Filtro por sede o delegación.
- Opción para consultar beneficios relacionados con la sede del afiliado.
- Estado vacío cuando no haya resultados.

### 4.7 Detalle de beneficio

- Descripción completa.
- Condiciones de uso.
- Descuento o propuesta vigente.
- Dirección y región, cuando correspondan.
- Datos de contacto autorizados.
- Medios de pago y disponibilidad, cuando correspondan.
- Acción externa de contacto, por ejemplo WhatsApp, teléfono, correo o red institucional.

### 4.8 Sedes y delegaciones

- Listado de delegaciones publicadas.
- Ciudad, dirección, teléfono, WhatsApp, correo y horarios, según disponibilidad.
- Uso de las delegaciones como filtro de beneficios.

### 4.9 Logout

- Cierre explícito de la sesión.
- Eliminación de la sesión local activa.
- Regreso a la pantalla de acceso.
- Imposibilidad de volver a consultar datos privados sin autenticarse nuevamente.

## 5. Funciones fuera del MVP inicial

Las siguientes funciones quedan expresamente fuera de la primera versión productiva:

- Turismo y paquetes turísticos.
- Novedades o noticias.
- Código QR y verificación pública de credenciales.
- Pagos, cuotas, saldos o transacciones.
- Notificaciones push.
- Empaquetado con Capacitor.
- Publicación en Apple App Store.
- Publicación en Google Play Store.
- Panel administrativo avanzado.
- Edición de datos personales desde la app.
- Integraciones con billeteras digitales.
- Biometría.
- Soporte offline completo.
- Internacionalización o múltiples idiomas.

Estos elementos podrán evaluarse después de validar el MVP con usuarios reales, comprobar la seguridad del acceso y estabilizar la operación del backend.

## 6. Requisitos no funcionales

### 6.1 Seguridad y privacidad

- Ninguna base completa de afiliados debe incorporarse al frontend o al paquete descargable.
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

### 7.1 Activación y primer acceso

1. El afiliado ingresa su identificador solicitado.
2. El sistema inicia el mecanismo aprobado de validación de identidad.
3. El afiliado completa la validación.
4. El backend vincula la identidad autenticada con el registro de afiliación correspondiente.
5. La app informa el resultado de la activación.
6. El afiliado accede al inicio y a su credencial.

### 7.2 Acceso recurrente

1. El usuario se autentica o recupera una sesión todavía válida.
2. El backend confirma identidad, autorización y estado.
3. La app obtiene exclusivamente los datos autorizados del usuario.
4. El usuario accede a inicio, credencial, beneficios y perfil.

### 7.3 Consulta de beneficios

1. El usuario abre Beneficios.
2. La app muestra beneficios publicados desde el backend.
3. El usuario busca o filtra por categoría y sede.
4. El usuario abre un beneficio.
5. La app muestra detalle, condiciones y canales de contacto.

### 7.4 Usuario inactivo, suspendido o con datos inconsistentes

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

- ¿Cómo se validará la identidad durante la activación inicial?
- ¿M.T.C.P. posee teléfono o correo verificado de cada afiliado?
- ¿Cómo se recuperará el acceso cuando esos datos estén desactualizados?
- ¿Qué sucede con afiliados inactivos, suspendidos o en período de gracia?
- ¿Un afiliado inactivo puede ingresar y ver información limitada o se bloquea completamente?

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
- [ ] Cada usuario solo puede acceder a sus propios datos autorizados.
- [ ] Los datos sensibles están protegidos durante la transmisión y el almacenamiento.
- [ ] No existen secretos administrativos ni una base completa de afiliados en el frontend.
- [ ] El logout invalida o elimina correctamente la sesión activa.
- [ ] La sesión expirada obliga a autenticarse nuevamente.
- [ ] Existe una revisión de seguridad de los flujos de acceso y datos privados.

### Funcionalidad

- [ ] Activación, login, credencial, estado, perfil, beneficios, filtros, detalle, delegaciones y logout funcionan de punta a punta.
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
5. Tratamiento de titulares y beneficiarios.
6. Responsable de beneficios y delegaciones.
7. Textos legales y canal de soporte.
8. Grupo inicial de usuarios para validación controlada.

## 12. Definición de cierre del MVP

El MVP queda cerrado cuando un afiliado real puede activar su acceso, autenticarse, consultar exclusivamente su credencial y datos autorizados, comprender su estado, encontrar beneficios vigentes y cerrar sesión desde un celular; todo ello con backend seguro, controles de autorización, pruebas básicas, soporte operativo y aprobación de M.T.C.P.

Cualquier funcionalidad que no contribuya directamente a ese recorrido deberá permanecer fuera de alcance hasta completar la validación de esta primera versión productiva.
