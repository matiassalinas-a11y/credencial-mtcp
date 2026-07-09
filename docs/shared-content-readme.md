# Shared content M.T.C.P.

La carpeta `data/shared-content` centraliza contenido institucional reutilizable para la app Credencial Digital M.T.C.P. y la futura web/panel compartidos.

## Archivos

- `institutionalInfo.ts`: identidad institucional, contacto, horarios, misión, visión, valores y métricas generales.
- `services.ts`: servicios institucionales publicados, como Market Mutual, Beauty Studio, Construir Viajes y Materiales MTCP.
- `delegations.ts`: delegaciones relevadas.
- `appTexts.ts`: textos generales útiles para pantallas de inicio, credencial, beneficios, turismo, noticias, contacto, ayuda y próximos contenidos.
- `index.ts`: export centralizado del paquete.

Los tipos compartidos están en `types/shared-content.ts`.

## Uso actual

La app sigue funcionando con datos mock para afiliados y credenciales. Este paquete solo centraliza identidad, textos e información institucional para evitar duplicación y preparar una integración futura.

## Uso futuro

Cuando exista Supabase o un panel administrativo, estos archivos podrán reemplazarse por servicios que lean contenidos publicados desde una base compartida, manteniendo los mismos tipos e imports.
