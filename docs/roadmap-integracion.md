# Roadmap de integración

La app Credencial Digital M.T.C.P. hoy funciona con datos mock locales. Los afiliados de prueba viven en `data/mockAffiliates.ts`, y la sesión actual se conserva en `localStorage` a través de `services/affiliateService.ts`.

En una etapa futura, la app podrá conectarse a Supabase para compartir datos con la web institucional de la Mutual de los Trabajadores de la Construcción de la Patagonia. La web o un panel de gestión cargarán contenidos institucionales, beneficios, turismo y noticias; la app leerá solamente los contenidos publicados y los datos necesarios para mostrar la credencial.

## Capas preparadas

- `config/brand.ts`: identidad institucional, colores y datos de contacto.
- `services/affiliateService.ts`: acceso actual a afiliados mock y persistencia local.
- `services/contentService.ts`: funciones placeholder para beneficios, turismo, noticias e información institucional.
- `types/affiliate.ts`: tipos de afiliados y estados de afiliación.
- `types/content.ts`: tipos futuros para contenidos institucionales.

## Tablas futuras sugeridas

- `affiliates`: datos mínimos de afiliados.
- `credentials`: credenciales, vigencias y estado operativo.
- `benefits`: beneficios publicados por la Mutual.
- `tourism_packages`: propuestas o convenios de turismo.
- `news`: novedades institucionales.
- `delegations`: delegaciones, direcciones, teléfonos y horarios.
- `app_settings`: identidad visual, textos generales y configuración publicada.

## Seguridad futura

Los datos de afiliados son sensibles. Cuando se conecte Supabase, no se deben exponer todos los afiliados públicamente. Se deberán usar políticas RLS, autenticación o endpoints seguros para limitar el acceso según el caso de uso.

La credencial digital deberá mostrar solo los datos necesarios para el afiliado. La verificación pública futura por QR no debe exponer información sensible completa. Como criterio inicial, una verificación pública debería limitarse a:

- Nombre y apellido.
- N° socio.
- Estado.
- Vigencia.

No se debe mostrar DNI completo ni otros datos innecesarios si no son imprescindibles para el proceso.

## Flujo futuro esperado

La web institucional y la app podrán compartir la misma base de datos. El panel o la web cargarán contenidos, la app consumirá los contenidos publicados y la credencial tomará los datos vigentes desde servicios seguros. Mientras esa integración no exista, la app debe mantener el comportamiento actual con mocks.
