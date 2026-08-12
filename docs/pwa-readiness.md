# PWA readiness - Credencial Digital M.T.C.P.

Este documento registra el estado de preparacion PWA de la app Credencial Digital M.T.C.P. y los pasos recomendados antes de una futura etapa Capacitor/App Store/Play Store.

No se instalo Capacitor, no se agrego service worker avanzado y no se modifico la UI aprobada.

## Estado actual revisado

### `app/layout.tsx`

- Ya tenia `Metadata` y `Viewport` de Next.
- Ya usaba `themeColor`.
- Ya definia idioma `es`.
- Se agrego referencia a `manifest.webmanifest`.
- Se agrego metadata para modo Apple Web App.
- Se agregaron iconos existentes.
- Se agrego `viewportFit: "cover"` para mejorar compatibilidad con safe-area en iOS.

### `public/`

Assets existentes relevantes:

- `public/icon.svg`
- `public/icon-light-32x32.png`
- `public/icon-dark-32x32.png`
- `public/apple-icon.png` de 180x180
- `public/assets/heroes/home-building-mtcp.jpg` de 4000x2250, aproximadamente 3.9 MB
- `public/assets/heroes/splash-worker-uocra.png` de 941x1672, aproximadamente 1.9 MB
- `public/assets/heroes/mtcp-logo-full.png` de 1839x701, aproximadamente 637 KB

No se detectaba manifest PWA antes de esta etapa.

### `next.config.mjs`

- `images.unoptimized: true` esta activo.
- `typescript.ignoreBuildErrors: true` esta activo.

Aunque el proyecto corre `pnpm exec tsc --noEmit` y pasa, para una etapa de publicacion conviene revisar si `ignoreBuildErrors` sigue siendo necesario.

### `app/globals.css`

Estado positivo:

- Usa `100dvh` en `.app-frame`.
- Usa contenedor mobile con `max-width: 430px`.
- Usa `overflow: hidden` en frame y scroll interno en `.screen-scroll`.
- Usa `-webkit-overflow-scrolling: touch`.
- La bottom navigation ya usa `env(safe-area-inset-bottom, 0px)`.
- El contenido principal tiene padding inferior en `.screen-scroll`.

Riesgo a monitorear:

- En iOS standalone con `viewportFit: cover`, revisar que los headers no se metan debajo del notch en dispositivos reales.

## Cambios realizados

### Manifest PWA

Se creo:

```txt
public/manifest.webmanifest
```

Incluye:

- `name`: Credencial Digital M.T.C.P.
- `short_name`: M.T.C.P.
- `description`: descripcion institucional breve.
- `start_url`: `/`
- `scope`: `/`
- `display`: `standalone`
- `orientation`: `portrait`
- `background_color`: `#F5F7F9`
- `theme_color`: `#145BB8`
- iconos existentes.
- `lang`: `es-AR`

### Metadata Next

Se actualizo `app/layout.tsx` con:

- `manifest`
- `appleWebApp`
- `formatDetection.telephone`
- `icons.icon`
- `icons.apple`
- `viewport.themeColor`
- `viewport.viewportFit`

No se modifico layout visual ni comportamiento de pantallas.

## Checklist PWA

Estado base:

- [x] App mobile-first.
- [x] `theme-color` definido.
- [x] `manifest.webmanifest` creado.
- [x] `display: standalone`.
- [x] `orientation: portrait`.
- [x] `start_url` y `scope` definidos.
- [x] Icono SVG disponible.
- [x] Apple touch icon 180x180 disponible.
- [x] Safe-area inferior contemplada en navegacion.
- [ ] Iconos Android completos 192x192 y 512x512.
- [ ] Icono maskable real.
- [ ] Service worker.
- [ ] Estrategia offline/cache.
- [ ] Prueba Lighthouse PWA.
- [ ] Validacion real en iOS Safari.
- [ ] Validacion real en Android Chrome.

## Checklist iOS

Para PWA iOS:

- [x] `appleWebApp.capable`.
- [x] `appleWebApp.title`.
- [x] Apple icon 180x180.
- [x] `viewportFit: cover`.
- [x] Bottom navigation con safe-area inferior.
- [ ] Revisar status bar en modo standalone.
- [ ] Probar Add to Home Screen.
- [ ] Revisar notch/island en iPhone real.
- [ ] Revisar scroll y teclado en login.
- [ ] Revisar que la app no pierda sesion al relanzar.
- [ ] Definir splash screens iOS si se decide soportarlas explicitamente.

## Checklist Android

Para PWA Android:

- [x] Manifest base.
- [x] `theme_color`.
- [x] `background_color`.
- [x] `display: standalone`.
- [x] `orientation: portrait`.
- [ ] Agregar iconos 192x192.
- [ ] Agregar iconos 512x512.
- [ ] Agregar icono maskable.
- [ ] Probar instalacion desde Chrome.
- [ ] Probar apertura desde launcher.
- [ ] Revisar color de barra de sistema.
- [ ] Ejecutar Lighthouse PWA.

## Assets faltantes o a mejorar

Necesarios antes de PWA completa:

- Icono PNG 192x192.
- Icono PNG 512x512.
- Icono maskable 512x512 con margen seguro.
- Screenshots PWA si se quiere mejorar experiencia de instalacion.
- Posibles splash assets especificos para iOS.

Assets a optimizar:

- `home-building-mtcp.jpg`: pesa aproximadamente 3.9 MB. Conviene generar version mobile optimizada.
- `splash-worker-uocra.png`: pesa aproximadamente 1.9 MB. Conviene revisar compresion/tamano.
- `mtcp-logo-full.png`: pesa aproximadamente 637 KB. Conviene evaluar si puede reemplazarse por version optimizada o SVG controlado.

No se optimizaron assets en esta etapa para evitar cambios visuales.

## Pruebas manuales recomendadas

### iOS Safari

1. Abrir la app en Safari.
2. Verificar splash/login/home.
3. Agregar a pantalla de inicio.
4. Abrir desde icono instalado.
5. Confirmar que se vea en modo standalone.
6. Probar login con `30111222`.
7. Recargar/cerrar/reabrir y confirmar persistencia.
8. Revisar safe-area inferior con bottom navigation.
9. Revisar teclado en input DNI.
10. Navegar a Credencial, Beneficios, Detalle y Perfil.

### Android Chrome

1. Abrir la app en Chrome.
2. Verificar que Chrome detecte instalabilidad cuando el checklist este completo.
3. Instalar o agregar a pantalla principal.
4. Abrir desde launcher.
5. Probar login, logout y persistencia.
6. Probar scroll en Beneficios.
7. Probar carrusel de destacados.
8. Probar filtros y buscador.

### Desktop mobile-width

1. Probar viewport 390x844.
2. Probar viewport 430x932.
3. Confirmar que la app no se estira a pantalla completa.
4. Confirmar que la navegacion inferior no tapa contenido.

## Pendientes antes de Capacitor

Antes de instalar Capacitor:

- Completar PWA con iconos 192/512/maskable.
- Definir si la app mobile usara build local embebido o URL remota.
- Mantener `sessionService` como unica frontera de storage.
- Avanzar con coordinator para deep links.
- Evitar uso directo desordenado de `window`/`document`.
- Definir estrategia offline.
- Optimizar imagenes pesadas.
- Preparar variables de entorno.
- Revisar politica de privacidad.
- Reemplazar mocks sensibles antes de produccion.
- Revisar `typescript.ignoreBuildErrors` en `next.config.mjs`.

## Notas de seguridad

La PWA actual sigue siendo un MVP con datos mock. Antes de produccion:

- No cargar base real de afiliados en el cliente.
- No exponer DNI, estado de afiliacion ni datos personales sin backend seguro.
- No usar `localStorage` para datos sensibles sin criterio.
- Preparar Supabase con RLS cuando llegue la etapa backend.

## Resultado de esta etapa

La app queda mejor preparada para PWA mobile-first con manifest, metadata mobile, soporte inicial iOS/Android y documentacion de pendientes, sin cambiar UI ni instalar dependencias.
