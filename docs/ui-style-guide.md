# Guía de estilo UI - Credencial Digital M.T.C.P.

## 1. Concepto general de UI

La Credencial Digital M.T.C.P. debe sentirse como una **app institucional premium para afiliados de una mutual patagónica**.

La interfaz tiene que transmitir confianza, cercanía, respaldo institucional, pertenencia, claridad y modernidad. Debe verse como una herramienta oficial de la Mutual de los Trabajadores de la Construcción de la Patagonia, pensada para uso cotidiano en celular, con lectura simple y decisiones visuales sobrias.

La app no debe parecer genérica, infantil, recargada, demasiado financiera ni fría. La identidad tiene que sentirse humana e institucional a la vez.

## 2. Paleta de colores

Paleta base sobria, profesional y anclada en azul institucional:

| Token | Uso | HEX |
| --- | --- | --- |
| Primary | Acciones principales, estados activos, elementos de marca | `#145BB8` |
| Primary dark | Headers, credencial, fondos institucionales | `#102A66` |
| Primary deep | Profundidad en degradados y contrastes | `#0B2448` |
| Primary light | Detalles, fondos suaves, chips activos | `#EAF2FF` |
| Accent | Énfasis puntual, brillos controlados | `#2563EB` |
| Background | Fondo general de app | `#F5F7F9` |
| Surface/card | Tarjetas y superficies principales | `#FFFFFF` |
| Surface soft | Inputs y bloques secundarios | `#F8FAFC` |
| Border | Separadores y bordes sutiles | `#DBE3EE` |
| Text primary | Títulos y datos importantes | `#212121` |
| Text secondary | Descripciones y labels secundarios | `#526173` |
| Success | Estado activo | `#16A34A` |
| Success soft | Fondo estado activo | `#DCFCE7` |
| Warning | Período de gracia | `#D97706` |
| Warning soft | Fondo período de gracia | `#FFF7D6` |
| Error | Estado suspendido o errores | `#DC2626` |
| Error soft | Fondo error | `#FEE2E2` |
| Neutral | Estado inactivo | `#64748B` |
| Neutral soft | Fondo estado inactivo | `#EEF2F6` |

Regla principal: usar el azul institucional como ancla visual y no más de dos colores protagonistas por pantalla.

## 3. Tipografía

Fuente recomendada: **Inter**.

Inter funciona bien para una app institucional porque es clara, moderna, legible en móvil y menos decorativa que alternativas como Poppins. Poppins puede reservarse para piezas de comunicación, pero la app debe priorizar lectura y precisión.

Escala mobile:

| Estilo | Tamaño | Peso | Uso |
| --- | ---: | --- | --- |
| Display | 32px | Bold / 700 | Splash o marca puntual |
| H1 | 24px | Bold / 700 | Título principal de pantalla |
| H2 | 20px | Semibold / 600 | Secciones importantes |
| H3 | 16px | Semibold / 600 | Cards y módulos |
| Body | 14px | Regular / 400 | Texto general |
| Body strong | 14px | Semibold / 600 | Datos destacados |
| Small | 12px | Medium / 500 | Ayudas y metadata |
| Label | 11px | Bold / 700 | Labels uppercase |
| Caption | 10px | Semibold / 600 | Badges pequeños |

Pesos permitidos:

- Regular `400` para texto de lectura.
- Medium `500` para textos secundarios con presencia.
- Semibold `600` para labels y datos.
- Bold `700` para títulos, CTAs y datos críticos.

## 4. Sistema de espaciado

Escala base:

| Valor | Uso recomendado |
| ---: | --- |
| 4px | Separaciones internas mínimas, ícono-texto compacto |
| 8px | Gaps pequeños, badges, agrupaciones simples |
| 12px | Padding compacto de chips, filas y botones secundarios |
| 16px | Padding base de pantalla y cards |
| 20px | Padding de cards principales |
| 24px | Separación entre bloques importantes |
| 32px | Separación vertical amplia, headers o cierres de pantalla |

Regla: mantener una grilla visual de 4px y evitar valores sueltos que generen ritmo irregular.

## 5. Bordes y radios

| Elemento | Radio recomendado |
| --- | ---: |
| Botones primarios | 999px |
| Botones secundarios | 999px |
| Cards | 16px |
| Credencial digital | 18px |
| Inputs | 16px |
| Badges | 999px |
| Contenedores grandes | 20px |
| Íconos dentro de accesos rápidos | 999px |

La app puede tener bordes redondeados, pero debe evitar una apariencia demasiado blanda o infantil. Los radios deben sentirse modernos y controlados.

## 6. Sombras

Usar sombras suaves, limpias y consistentes.

| Token | Valor sugerido | Uso |
| --- | --- | --- |
| Card | `0 1px 3px rgba(15, 23, 42, 0.08), 0 12px 28px rgba(20, 91, 184, 0.08)` | Cards principales |
| Button | `0 10px 24px rgba(20, 91, 184, 0.24)` | Botón primario |
| Credential | `0 18px 44px rgba(16, 42, 102, 0.34)` | Credencial digital |
| Bottom nav | `0 -1px 0 #DBE3EE, 0 -10px 24px rgba(15, 23, 42, 0.08)` | Navegación inferior |

No usar sombras exageradas ni efectos flotantes que parezcan publicidad o fintech.

## 7. Componentes base

### Botón primario

- Fondo `Primary`.
- Texto blanco.
- Radio pill.
- Altura mínima 48px.
- Peso bold.
- Sombra suave azul.
- Usar para acciones principales: ingresar, ver credencial.

### Botón secundario

- Fondo `Primary light`.
- Texto `Primary`.
- Borde `Border`.
- Radio pill.
- Sin sombra fuerte.
- Usar para acciones de regreso o alternativas.

### Botón ghost

- Fondo transparente.
- Texto `Text secondary` o `Primary`.
- Estado hover/active muy sutil.
- Usar para acciones discretas como panel de DNI de prueba.

### Input DNI

- Fondo `Surface soft`.
- Borde `Border`.
- Radio 16px.
- Texto grande y semibold/bold.
- Letter spacing moderado para mejorar lectura numérica.
- Error con borde `Error` y mensaje claro.

### Card principal

- Fondo blanco.
- Radio 16px.
- Borde sutil.
- Sombra card.
- Padding 16px o 20px.
- Debe contener información prioritaria sin saturar.

### Card secundaria

- Fondo blanco o `Surface soft`.
- Borde sutil.
- Sombra mínima o sin sombra.
- Para filas de datos, estados y paneles secundarios.

### Status badge

- Radio pill.
- Texto bold.
- Dot de color.
- Fondo suave según estado.
- Debe ser legible en fondos claros y oscuros.

### Bottom navigation

- Fondo blanco con leve transparencia.
- Borde superior.
- Sombra superior suave.
- Respeto de safe area.
- Ícono activo en pill azul o fondo suave, sin exagerar.
- Labels pequeños pero legibles.

### Header mobile

- Fondo azul institucional o degradado sobrio.
- Título blanco.
- Subtítulo blanco con opacidad controlada.
- Debe dar identidad sin ocupar demasiado espacio.

### Accesos rápidos

- Cards compactas.
- Ícono centrado en círculo suave.
- Label semibold.
- Estado próximamente en chip pequeño.
- Grilla ordenada, sin exceso de colores.

### Ficha de perfil

- Header institucional.
- Avatar con iniciales.
- Datos en filas claras.
- Labels uppercase.
- Valores alineados y legibles.

### Credencial digital

- Tarjeta protagonista.
- Fondo azul oscuro o degradado institucional.
- Texto blanco fuerte.
- Labels celeste claro.
- Badge visible.
- Marca de agua sutil.
- Sombra premium controlada.

## 8. Estados de afiliación

### Activo

- Fondo: `#DCFCE7`.
- Texto: `#14532D`.
- Dot: `#16A34A`.
- Mensaje positivo: “Tu credencial se encuentra vigente.”

### Período de gracia

- Fondo: `#FFF7D6`.
- Texto: `#7A4A08`.
- Dot: `#D97706`.
- Mensaje de advertencia moderada: “Tu credencial se encuentra en período de gracia.”

### Inactivo

- Fondo: `#EEF2F6`.
- Texto: `#475569`.
- Dot: `#94A3B8`.
- Mensaje neutral: “Tu credencial no se encuentra vigente.”

### Suspendido

- Fondo: `#FEE2E2`.
- Texto: `#7F1D1D`.
- Dot: `#DC2626`.
- Mensaje crítico: “Credencial suspendida.”

## 9. Credencial digital

La credencial debe sentirse oficial, premium, sólida, institucional y legible.

Evitar:

- Fondos demasiado claros.
- Texto blanco con poco contraste.
- Opacidades que laven la tarjeta.
- Exceso de decoración.
- Glassmorphism como recurso principal.

Sugerir:

- Fondo azul oscuro o degradado institucional con `#102A66`, `#142B63`, `#1E3A8A` y `#2563EB`.
- Marca de agua sutil ubicada lejos de datos críticos.
- Nombre del afiliado como protagonista visual.
- Badge de estado claro y separado del texto principal.
- Datos organizados en grilla de dos columnas.
- Labels en `#BFD3FF` o `rgba(255,255,255,0.72)`.
- Valores en blanco pleno.
- Bordes redondeados y sombra premium controlada.

## 10. Home del afiliado

El Home debe sentirse como la entrada principal a una app oficial.

Debe incluir:

- Saludo personalizado.
- Header institucional con buen contraste.
- Tarjeta principal del afiliado con nombre, DNI, socio y estado.
- Estado de afiliación claro y explicativo.
- Accesos rápidos ordenados.
- Sensación de respaldo y pertenencia.

Evitar que el Home parezca una landing o un dashboard complejo. Debe ser simple y útil.

## 11. Login

El Login debe sentirse:

- Simple.
- Institucional.
- Confiable.
- Sin ruido visual.
- Enfocado en el DNI.

Lineamientos:

- Header con marca y nombre institucional.
- Card blanca para el formulario.
- Input DNI protagonista.
- Botón principal fuerte.
- Error claro y amable.
- Panel de DNI de prueba discreto, colapsable y visualmente secundario.

## 12. Perfil

El Perfil debe verse como una ficha institucional.

Debe incluir:

- Avatar con iniciales.
- Nombre completo.
- Número de socio.
- Badge de estado.
- Datos en filas claras.
- Botón “Ingresar otro DNI”.

La pantalla debe ser sobria, ordenada y más cercana a una ficha de afiliado que a un perfil social.

## 13. Navegación inferior

La navegación inferior debe tener estilo de app mobile:

- Siempre visible.
- Fondo blanco.
- Safe area respetada.
- Íconos sobrios.
- Estado activo claro pero elegante.
- Labels cortos y legibles.
- No debe tapar contenido.

El activo puede usar una pill azul o un fondo `Primary light`, pero sin un efecto excesivo.

## 14. Reglas visuales generales

- Priorizar legibilidad sobre decoración.
- Evitar demasiados degradados por pantalla.
- No usar más de dos colores protagonistas.
- Mantener consistencia entre Login, Home, Credencial, Perfil y Próximamente.
- Usar fondos claros con tarjetas blancas o azules institucionales.
- Usar azul institucional como ancla visual.
- No abusar de glassmorphism.
- No dejar textos con bajo contraste.
- Evitar componentes default sin personalidad.
- Mantener paddings amplios en acciones táctiles.
- Revisar siempre mobile chico antes de cerrar cambios visuales.

## 15. Próximos pasos

### Etapa 1

Aplicar tokens globales de color, tipografía, bordes y sombras.

### Etapa 2

Pulir Login y Home.

### Etapa 3

Pulir Credencial.

### Etapa 4

Pulir Perfil y Próximamente.

### Etapa 5

Revisar responsive y navegación inferior.

Estos pasos deben implementarse más adelante. Este documento solo define la guía visual para rediseñar la app de forma ordenada y consistente.
