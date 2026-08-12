# Arquitectura MVVM-lite para Credencial Digital M.T.C.P.

Este documento propone una arquitectura escalable inspirada conceptualmente en MVVM usado en SwiftUI/iOS, adaptada a la app PWA React/Next de Credencial Digital M.T.C.P.

Referencia conceptual: https://github.com/jasonjrr/MVVM.Demo.SwiftUI

No implica convertir la app a Swift, copiar codigo SwiftUI ni hacer un refactor masivo inmediato. El objetivo es ordenar responsabilidades para que el MVP actual siga estable y quede preparado para testing, crecimiento de pantallas y futura integracion con Supabase.

## Por que usar MVVM-lite

La app ya tiene un MVP funcional con login por DNI, home, credencial, beneficios, detalle, perfil, navegacion inferior, mocks, shared-content y persistencia local. A medida que crezcan beneficios, turismo, noticias, pagos o backend real, conviene evitar que las pantallas acumulen demasiada logica.

MVVM-lite ayuda a:

- Mantener las pantallas como Views enfocadas en renderizar UI.
- Mover estado derivado, filtros, acciones y reglas de pantalla a ViewModels.
- Mantener servicios como fuente de datos intercambiable.
- Preparar adapters mock/Supabase sin reescribir componentes.
- Hacer mas simple testear busqueda, filtros, sesion y navegacion.
- Reducir duplicacion de helpers entre Home, Benefits y Detail.

## Mapeo conceptual a React/Next

En SwiftUI MVVM, la View observa un ViewModel, el ViewModel interpreta el modelo y usa servicios inyectados, y coordinators ordenan navegacion e inyeccion de dependencias. En React/Next conviene adaptar esa idea asi:

| Concepto MVVM | En esta app React/Next | Regla practica |
| --- | --- | --- |
| View | `components/screens/*` y componentes UI | Renderiza props y dispara acciones. No deberia filtrar datos complejos ni tocar storage. |
| ViewModel | `hooks/useXViewModel.ts` | Encapsula `useState`, `useMemo`, acciones de pantalla, estado derivado y llamadas a services. |
| Model | `types/*` + entidades de dominio | Tipos estables: `Affiliate`, `Benefit`, filtros, estado de sesion, rutas. |
| Service | `services/*` | Lee/escribe datos. Hoy usa mocks/localStorage; manana puede usar Supabase. |
| Coordinator | `hooks/useAppCoordinator.ts` o `lib/navigation/*` | Controla pantalla activa, pantalla de vuelta, detalle seleccionado y guards de sesion. |
| DI container | `services/appServices.ts` | Centraliza dependencias: affiliate, benefit, content, session. Permite mocks en tests. |

## Analisis de la arquitectura actual

### `app/`

- `app/page.tsx` es el entry point client-side.
- Maneja `view`, `affiliate`, `activeScreen`, restauracion de sesion y login/logout.
- Es funcional, pero mezcla rol de bootstrap, sesion y navegacion. Buen candidato para `useSessionViewModel` y `useAppCoordinator`.

### `components/`

- `AppShell.tsx` funciona como coordinator simple: resuelve pantalla activa, detalle de beneficio y back screen.
- `BenefitsScreen.tsx` concentra mucha logica: estado de filtros, opciones de sedes, normalizacion, estilos de categorias, helpers de contacto, guard de drag/click, carousel, subcomponentes y render de pantalla.
- `HomeScreen.tsx` tambien tiene helpers de beneficios destacados y carousel/drag.
- `LoginScreen.tsx` combina input, validacion, delay simulado, busqueda de afiliado y estado visual.
- `CredentialCard.tsx` debe permanecer estable: ya fue aprobado visualmente y no conviene tocarlo en esta etapa.

### `services/`

- `affiliateService.ts` combina busqueda de afiliado mock y persistencia de sesion en `localStorage`.
- `benefitService.ts` contiene la logica principal de beneficios: published, featured, filtros, busqueda y normalizacion.
- `contentService.ts` expone shared-content, pero tiene nombres parecidos a `benefitService` (`getFeaturedBenefits`) para otro tipo de beneficio (`MutualService`). Esto no rompe nada, pero puede generar confusion.

### `data/`

- `mockAffiliates.ts` y `mockBenefits.ts` funcionan como adapters mock de datos.
- `data/shared-content/*` contiene identidad institucional, servicios, delegaciones y textos compartidos.
- En una etapa futura, conviene que los mocks queden detras de interfaces de repositorio para intercambiarlos por Supabase.

### `types/`

- `types/affiliate.ts`, `types/benefit.ts` y `types/navigation.ts` estan bien ubicados.
- `types/content.ts` define aliases hacia shared-content. Es util, pero hay que evitar duplicar conceptos de beneficio entre `Benefit` y `MutualService` sin una regla clara.

### `config/` y `lib/`

- `config/brand.ts`, `config/theme.ts` y `lib/themeStyles.ts` centralizan identidad visual.
- `lib/` podria alojar helpers puros compartidos, por ejemplo `normalizeText`, `formatBenefitLocation` o helpers de navegacion.

### `docs/`

- Ya contiene guia UI y documentos de shared-content/roadmap.
- Este documento suma una capa de arquitectura antes de refactorizar.

## Problemas y oportunidades detectadas

- `BenefitsScreen.tsx` tiene demasiadas responsabilidades para una View: filtros, estado, derivaciones, carousel, estilos de categorias y subcomponentes.
- La logica de drag/click de carousel esta duplicable y deberia vivir en un hook reutilizable, por ejemplo `useDragClickGuard` y `useMouseDragScroll`.
- `HomeScreen.tsx` y `BenefitsScreen.tsx` comparten necesidades de beneficios destacados: resumen, ubicacion, CTA y apertura de detalle.
- `LoginScreen.tsx` llama directamente a `getAffiliateByDni` y simula loading; podria delegarlo a `useLoginViewModel`.
- `app/page.tsx` maneja sesion y navegacion. Es correcto para MVP, pero sera dificil de testear si crecen rutas, deep links o guards.
- `affiliateService.ts` mezcla acceso a afiliados y storage de sesion. Conviene separar `affiliateService` de `sessionService`.
- `contentService.ts` y `benefitService.ts` tienen funciones con nombres similares para modelos distintos. Conviene renombrar o encapsular por dominio.
- Algunos helpers de presentacion estan dentro de pantallas: `getBenefitLocation`, `getContactSummary`, `categoryStyles`, `normalizeKey`. Pueden moverse por etapas.

## Estructura objetivo recomendada

La estructura objetivo no debe aplicarse de golpe. Sirve como norte:

```txt
app/
  page.tsx
  layout.tsx

components/
  screens/
    LoginScreen.tsx
    HomeScreen.tsx
    CredentialScreen.tsx
    BenefitsScreen.tsx
    BenefitDetailScreen.tsx
    ProfileScreen.tsx
    ComingSoonScreen.tsx
  layout/
    AppShell.tsx
    BottomNavigation.tsx
    SectionHero.tsx
  ui/
    button.tsx
    StatusBadge.tsx
    MtcpLogo.tsx
  benefits/
    BenefitCover.tsx
    FeaturedBenefitCard.tsx
    CompactBenefitCard.tsx
    RecentBenefitCard.tsx
    CategoryCard.tsx
    BenefitFiltersPanel.tsx
  credential/
    CredentialCard.tsx

hooks/
  useSessionViewModel.ts
  useLoginViewModel.ts
  useAppCoordinator.ts
  useBenefitsViewModel.ts
  useBenefitDetailViewModel.ts
  useCarouselDrag.ts

services/
  appServices.ts
  affiliateService.ts
  benefitService.ts
  contentService.ts
  sessionService.ts
  adapters/
    mockAffiliateRepository.ts
    mockBenefitRepository.ts
    supabaseAffiliateRepository.ts
    supabaseBenefitRepository.ts

data/
  mockAffiliates.ts
  mockBenefits.ts
  shared-content/

types/
  affiliate.ts
  benefit.ts
  navigation.ts
  shared-content.ts
  services.ts

lib/
  formatters/
  navigation/
  themeStyles.ts
  utils.ts
```

## Reglas de separacion

- Una View puede tener estado visual local simple: abierto/cerrado, foco, animacion puntual.
- Una View no deberia saber como se filtran beneficios, como se persiste sesion ni como se restauran datos.
- Un ViewModel puede usar hooks de React, services y helpers puros.
- Un Service no debe importar componentes ni hooks.
- Un Model/type no debe depender de UI.
- El Coordinator decide a que pantalla ir, que detalle esta seleccionado y como volver.
- Los adapters implementan la fuente de datos concreta: mock ahora, Supabase despues.
- Los nombres de servicios deben dejar claro el dominio: beneficios de app (`Benefit`) vs servicios institucionales compartidos (`MutualService`).

## Ejemplo: BenefitsScreen

Estado actual resumido:

- `BenefitsScreen` guarda `query`, `category`, `delegation`.
- Calcula `delegationOptions`, `editorialCategories`, `results`, `featured`, `recent`.
- Define helpers de normalizacion, ubicacion, CTA y contacto.
- Define subcomponentes visuales internos.

MVVM-lite propuesto:

```ts
function BenefitsScreen(props: BenefitsScreenProps) {
  const vm = useBenefitsViewModel({
    affiliate: props.affiliate,
    services: appServices,
  })

  return (
    <BenefitsView
      query={vm.query}
      category={vm.category}
      delegation={vm.delegation}
      results={vm.results}
      featured={vm.featured}
      recent={vm.recent}
      delegationOptions={vm.delegationOptions}
      categoryOptions={vm.categoryOptions}
      onQueryChange={vm.setQuery}
      onCategoryChange={vm.setCategory}
      onDelegationChange={vm.setDelegation}
      onClearCategory={vm.clearCategory}
      onOpenBenefit={props.onOpenBenefit}
    />
  )
}
```

Responsabilidades del ViewModel:

- Mantener filtros.
- Pedir datos a `benefitService`.
- Exponer listas derivadas.
- Exponer copy/labels si dependen del estado.
- No renderizar JSX.

Responsabilidades de la View:

- Layout.
- Inputs.
- Cards.
- Estados vacios.
- Eventos simples que delegan en el ViewModel.

## Ejemplo: CredentialScreen

La credencial aprobada no debe refactorizarse visualmente. Si se aplica MVVM-lite, debe ser alrededor, no dentro del diseno aprobado.

```ts
function useCredentialViewModel(affiliate: Affiliate) {
  return {
    affiliate,
    statusLabel: getAffiliateStatusLabel(affiliate.estado),
    statusMessage: getCredentialStatusMessage(affiliate.estado),
    canShowCredential: affiliate.estado !== "suspendido",
  }
}
```

Uso recomendado:

- Mantener `CredentialCard` como componente visual estable.
- Extraer solo mensajes/estado si hoy se duplican en Home, Perfil o Credential.
- No tocar flip, dorso, assets ni estructura interna aprobada salvo necesidad especifica.

## Services y Dependency Injection

Crear un punto central simple:

```ts
export const appServices = {
  affiliateService,
  benefitService,
  contentService,
  sessionService,
}
```

Luego los ViewModels reciben services:

```ts
export function useBenefitsViewModel({ affiliate, services = appServices }) {
  // usa services.benefitService
}
```

Esto permite:

- Tests con servicios mock.
- Cambiar `mockBenefits` por Supabase sin tocar pantallas.
- Mantener dependencias visibles.
- Evitar imports directos de data dentro de components.

## Estrategia para migrar mocks a Supabase

No agregar Supabase todavia. Preparar el camino asi:

1. Definir interfaces:

```ts
export interface BenefitRepository {
  listPublished(): Promise<Benefit[]>
  getBySlug(slug: string): Promise<Benefit | undefined>
}

export interface AffiliateRepository {
  getByDni(dni: string): Promise<Affiliate | undefined>
}
```

2. Implementar adapters mock:

```ts
mockBenefitRepository.listPublished()
mockAffiliateRepository.getByDni(dni)
```

3. Mantener los services como fachada:

```ts
benefitService.filterBenefits(filters)
affiliateService.loginWithDni(dni)
```

4. En la etapa Supabase, crear adapters nuevos sin cambiar Views:

```ts
supabaseBenefitRepository
supabaseAffiliateRepository
```

5. Cambiar la inyeccion en `appServices`, no los componentes.

## Estrategia para testing

Prioridad de tests:

- Helpers puros: normalizacion, filtros, ubicacion, labels de estado.
- Services: `filterBenefits`, `getAffiliateByDni`, `sessionService`.
- ViewModels: `useBenefitsViewModel`, `useLoginViewModel`, `useSessionViewModel`.
- Coordinator: navegacion a detalle, back screen, logout.
- UI smoke tests solo para flujos principales.

Casos minimos:

- DNI valido devuelve afiliado.
- DNI invalido devuelve error.
- Guardado/restauracion de sesion funciona.
- Logout limpia sesion.
- Filtro por categoria funciona.
- Filtro por sede funciona.
- Busqueda ignora acentos/mayusculas.
- Detalle abre por slug.
- Sin afiliado seleccionado vuelve a login.

## Implementacion por etapas

### Etapa 1: Hooks/ViewModels sin cambiar UI

- Crear `hooks/useSessionViewModel.ts`.
- Crear `hooks/useLoginViewModel.ts`.
- Crear `hooks/useBenefitsViewModel.ts`.
- Crear `services/sessionService.ts`.
- Mantener los componentes actuales y conectar de a uno.

### Etapa 2: Beneficios fuera de `BenefitsScreen`

- Mover filtros, busqueda, categorias visibles y derivaciones a `useBenefitsViewModel`.
- Mover `BenefitCover`, `FeaturedBenefitCard`, `RecentBenefitCard`, `CompactBenefitCard`, `CategoryCard` a `components/benefits/`.
- Mantener el diseno actual intacto.

### Etapa 3: Coordinator simple

- Extraer la logica de `AppShell` y `app/page.tsx` a `useAppCoordinator`.
- Mantener `AppScreen` como union type.
- Centralizar reglas: abrir detalle, volver, limpiar detalle al navegar, logout.

### Etapa 4: Adapters mock/Supabase

- Definir interfaces de repositorios.
- Crear adapters mock equivalentes a los datos actuales.
- Dejar placeholders de adapters Supabase sin activarlos.
- Mantener `appServices` apuntando a mocks.

### Etapa 5: Testing basico

- Agregar test runner solo cuando se apruebe.
- Empezar por services/helpers.
- Luego viewmodels.
- Despues flujos UI criticos.

## Que NO hacer

- No reescribir toda la app para "cumplir MVVM".
- No mover archivos solo por estetica si no reduce complejidad real.
- No tocar la credencial aprobada durante el refactor arquitectonico.
- No introducir Supabase antes de tener interfaces/adapters.
- No meter logica de negocio en componentes UI reutilizables.
- No duplicar tipos de beneficio sin una frontera clara.
- No crear un store global pesado si el estado sigue siendo simple.
- No hacer un refactor visual junto con uno arquitectonico.

## Proximo paso recomendado

El proximo cambio seguro seria Etapa 1:

- Crear `sessionService`.
- Crear `useSessionViewModel` para mover restauracion/login/logout fuera de `app/page.tsx`.
- Crear `useBenefitsViewModel` sin tocar el JSX de Benefits.

Ese paso reduce riesgo, mejora testabilidad y prepara la futura migracion a Supabase sin cambiar el MVP visual.
