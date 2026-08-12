# Estrategia mobile/store para Credencial Digital M.T.C.P.

Este documento define una estrategia para que la app Credencial Digital M.T.C.P. pueda evolucionar desde una PWA React/Next mobile-first hacia una app instalable y publicable en App Store y Play Store, sin rehacer todo desde cero.

No propone migrar ahora a Swift, Kotlin ni React Native. Tampoco implica instalar Capacitor en esta etapa.

## 1. Objetivo

La app debe sostener tres canales futuros con una misma base funcional:

- PWA web mobile-first: accesible desde navegador e instalable desde el navegador cuando se complete soporte PWA.
- App iOS: publicable en App Store para afiliados con iPhone.
- App Android: publicable en Play Store para afiliados con Android.
- Publicacion oficial: presencia institucional de M.T.C.P. en tiendas, con iconografia, descripcion, capturas, privacidad y experiencia mobile real.

El objetivo estrategico es que React/Next siga siendo la base principal del producto y que, cuando el MVP sea suficientemente estable, pueda empaquetarse con Capacitor u otra capa equivalente para distribuirlo como app mobile.

## 2. Enfoque recomendado

### Mantener React/Next como base principal

React/Next sigue siendo valido porque:

- El MVP ya funciona como app mobile-first.
- Permite iterar rapido sobre login, credencial, beneficios, perfil y contenidos.
- Mantiene una sola base de UI y logica para web/PWA y futuras apps store.
- Encaja bien con la arquitectura MVVM-lite ya iniciada: Views, ViewModels/hooks, Services y Models.
- Facilita la futura integracion con Supabase mediante services/adapters.

### Por que no pasar ahora a Swift/Kotlin

No conviene reescribir ahora porque:

- Duplicaria esfuerzo: iOS, Android y web tendrian implementaciones separadas.
- El MVP todavia esta validando alcance, contenido y flujos.
- Aun falta backend real, autenticacion segura, privacidad, PWA completa y estrategia de publicacion.
- Swift/Kotlin nativo conviene cuando haya requerimientos fuertes de hardware, performance nativa, biometria avanzada o experiencia offline profunda.

### Como ayudaria Capacitor mas adelante

Capacitor permite tomar una app web y empaquetarla dentro de contenedores nativos iOS/Android. En una etapa futura podria:

- Crear proyectos iOS y Android sin abandonar React/Next.
- Exponer APIs nativas si fueran necesarias.
- Generar builds para App Store y Play Store.
- Mantener la mayoria de la UI y logica en la base web actual.

### Diferencias entre PWA, Capacitor y app nativa

| Enfoque | Que es | Ventaja | Limite |
| --- | --- | --- | --- |
| PWA | Web instalable desde navegador | Rapida, economica, una sola base | Menor presencia en tiendas, limites iOS segun capacidades |
| Capacitor | Web empaquetada como app iOS/Android | Permite publicar en tiendas con base React/Next | Debe sentirse como app, no como web embebida pobre |
| Nativa Swift/Kotlin | App hecha para cada plataforma | Maxima integracion y performance | Alto costo y dos bases de codigo |

## 3. Requisitos futuros para App Store

Checklist futuro para iOS:

- Apple Developer Program activo.
- Cuenta de organizacion, idealmente a nombre de M.T.C.P.
- D-U-N-S Number para validar organizacion.
- App Store Connect configurado.
- Bundle identifier definido.
- Icono de app en todos los tamanos requeridos.
- Screenshots por dispositivo solicitado.
- Nombre, subtitulo, descripcion y keywords.
- Politica de privacidad publica.
- URL de soporte/contacto.
- Datos de contacto institucionales.
- Informacion de manejo de datos personales.
- Revision de Apple superada.
- Experiencia mobile real, no una web embebida generica.
- Navegacion tipo app, usable con pulgar.
- Buen rendimiento en iPhone.
- Respeto de safe-area iOS.
- Splash/loading profesional.
- Estados de error claros.
- No depender de contenido roto, placeholder o datos falsos en produccion.

Punto importante: Apple puede observar apps que parezcan solo una web dentro de un contenedor. Para reducir ese riesgo, la app debe tener una experiencia mobile cuidada, navegacion persistente, estados nativos de carga/error, performance consistente y valor claro para el afiliado.

## 4. Requisitos futuros para Play Store

Checklist futuro para Android:

- Cuenta Google Play Console.
- App firmada.
- Android App Bundle (`.aab`).
- Package name definitivo.
- Icono adaptativo.
- Screenshots para telefono y, si aplica, tablet.
- Descripcion corta y descripcion completa.
- Politica de privacidad publica.
- Email de contacto.
- Clasificacion de contenido.
- Declaraciones de seguridad de datos.
- Testing interno/cerrado si aplica.
- Cumplimiento de politicas de Google Play.
- Revision de permisos solicitados.
- Versioning y changelog.

Android suele ser mas flexible que iOS para PWAs empaquetadas, pero igual requiere privacidad, estabilidad, identidad clara y cumplimiento de politicas.

## 5. Preparacion tecnica para Capacitor futuro

Antes de instalar Capacitor conviene preparar el codigo:

- Centralizar storage: ya se inicio con `services/sessionService.ts`.
- Centralizar navegacion: proximo paso seria `useAppCoordinator` o helpers de navegacion.
- Evitar uso directo desordenado de `window`/`document`: si se necesita, encapsularlo en services/hooks.
- Preparar safe-area: mantener uso de `env(safe-area-inset-*)` en layout y barras inferiores.
- Preparar rutas compatibles: definir si la app seguira como single-screen client state o si pasara a rutas reales.
- Definir estrategia de build mobile: consumir una URL remota o incluir build local dentro del contenedor.
- Preparar variables de entorno: separar publicas de privadas, y nunca exponer secretos.
- Revisar assets e iconos: iconos store, splash, adaptive icons, favicons, apple touch icon.
- Revisar offline/cache: service worker, cache de assets y comportamiento cuando no hay red.
- Mantener services/adapters: `affiliateService`, `benefitService`, `contentService`, `sessionService` deben permitir cambiar mocks por Supabase.
- Evitar dependencias que requieran Node runtime en cliente.
- Revisar tamanos de imagen: optimizar fondos/hero para mobile.
- Confirmar que la app funcione bien en WebView iOS/Android.

## 6. Seguridad futura

Los datos de afiliados son sensibles. Antes de produccion real:

- No cargar toda la base de afiliados en el cliente.
- No mantener datos personales completos en archivos mock publicos.
- No confiar en DNI como unica autenticacion para datos sensibles.
- Evitar `localStorage` para informacion sensible sin criterio de seguridad.
- Usar Supabase con Row Level Security cuando llegue backend real.
- Separar beneficios publicos de datos privados de afiliacion.
- Proteger DNI, estado de afiliacion, empresa, numero de socio y datos personales.
- Registrar reglas claras de expiracion de sesion.
- Evaluar autenticacion adicional si la credencial habilita servicios reales.
- No incluir service keys, tokens ni secretos en el bundle cliente.

Para el MVP actual, los mocks sirven para demostracion interna. Para tienda/produccion, deben reemplazarse por backend seguro.

## 7. Plan recomendado por etapas

### Etapa 1: MVP web/mobile-first estable

- Mantener login por DNI mock.
- Validar home, credencial, perfil y beneficios.
- Asegurar que lint, typecheck y build pasen.
- Mantener experiencia mobile centrada y pulida.

### Etapa 2: Arquitectura MVVM-lite

- Extraer session/login/benefits a services y hooks.
- Luego extraer coordinator simple.
- Preparar adapters mock/Supabase.
- Agregar tests basicos.

### Etapa 3: PWA completa

- Agregar manifest.
- Completar iconos.
- Agregar service worker si corresponde.
- Revisar instalacion desde navegador.
- Definir offline/fallback.
- Probar iOS Safari y Android Chrome.

### Etapa 4: Supabase para contenidos publicos

- Beneficios, turismo, noticias y delegaciones.
- Contenido publico cacheable.
- Sin datos sensibles de afiliados al principio.

### Etapa 5: Supabase para afiliados con seguridad

- Modelo de afiliados.
- RLS.
- Autenticacion/validacion segura.
- Sesion robusta.
- Auditoria de datos expuestos al cliente.

### Etapa 6: Preparacion Capacitor

- Instalar Capacitor solo cuando el MVP web/PWA este estable.
- Definir estrategia de build local/remoto.
- Configurar iOS/Android.
- Revisar safe-area, splash e iconos.
- Probar WebView real.

### Etapa 7: Beta interna Android/iOS

- Testing interno en Play Console.
- TestFlight para iOS.
- Pruebas con afiliados o equipo interno.
- Medir performance, errores y feedback.

### Etapa 8: Publicacion Play Store y App Store

- Completar fichas de tienda.
- Publicar politicas.
- Subir builds firmados.
- Responder revisiones.
- Preparar soporte y mantenimiento.

## 8. Riesgos actuales

Riesgos detectados en el estado actual:

- `localStorage`: ya esta centralizado en `sessionService`, pero no es suficiente para datos sensibles en produccion.
- Rutas Next: la app funciona como una experiencia client-side con estado de pantalla; para tienda puede funcionar, pero conviene ordenar coordinacion y deep links antes de Capacitor.
- Imagenes pesadas: hay imagenes hero/fondos en `public/assets`; conviene revisar peso y formatos antes de mobile store.
- Manifest PWA pendiente: hay iconos basicos, pero no se detecta `manifest` completo.
- Iconos store pendientes: existen iconos web, pero App Store/Play Store requieren sets especificos.
- Politica de privacidad pendiente: sera obligatoria para tiendas y aun mas si hay datos de afiliados.
- Autenticacion real pendiente: DNI mock no alcanza para produccion con datos sensibles.
- Datos mock: no deben enviarse como base real de afiliados.
- Offline/cache pendiente: no hay estrategia documentada de service worker o fallback offline.
- `next.config.mjs` tiene `typescript.ignoreBuildErrors: true`: aunque se corre `pnpm exec tsc --noEmit`, antes de publicar conviene remover o justificar esa excepcion.
- App embebida: si se empaqueta con Capacitor, debe evitar parecer una web generica dentro de una WebView.

## 9. No implementar en esta etapa

En esta etapa no corresponde:

- Instalar Capacitor.
- Crear proyecto iOS.
- Crear proyecto Android.
- Cambiar stack.
- Cambiar UI.
- Tocar la credencial aprobada.
- Agregar QR.
- Agregar Supabase.
- Agregar panel administrativo.
- Cambiar la logica actual.

## 10. Criterio de avance

La estrategia correcta es avanzar por capas:

1. Mantener estable el MVP actual.
2. Completar MVVM-lite.
3. Convertirlo en PWA real.
4. Agregar backend seguro.
5. Recien despues preparar tiendas con Capacitor.

Asi la app puede llegar a App Store y Play Store sin tirar el trabajo actual ni multiplicar codigo por plataforma.
