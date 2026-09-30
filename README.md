# LOOP - Red Social para Programadores

Bienvenido al repositorio oficial de **LOOP**, la red social y plataforma de colaboración diseñada específicamente para programadores, estudiantes y profesionales del sector tecnológico.



```text
Documentación
│
├── 1. Información general
│   ├── Objetivo
│   ├── Descripción del proyecto
│   └── Alcance
│
├── 2. Diseño
│   ├── Wireframes
│   ├── Identidad visual
│   ├── Paleta de colores
│   ├── Tipografía
│   ├── Componentes
│   └── Responsive
│
├── 3. Arquitectura del proyecto
│   ├── Tecnologías
│   ├── Estructura de carpetas
│   └── Organización del código
│
├── 4. Páginas y funcionalidades
│   ├── Inicio
│   ├── Acerca de nosotros
│   └── ...
│
├── 5. Desarrollo
│   ├── Git
│   ├── Ramas
│   ├── Convenciones
│   └── Pull requests
│
└── 6. Historial / avances
    ├── Sprint 1
    ├── Sprint 2
    └── ...
```

## 1. Información General
En un mercado altamente competitivo, **LOOP** busca solucionar la falta de espacios especializados para la promoción de trabajos freelance tecnológicos y el desarrollo colaborativo[cite: 1]. La plataforma facilita la creación de contactos, la difusión de proyectos y el fortalecimiento de la empleabilidad de sus usuarios, permitiendo formar equipos y presentar propuestas grupales.

## 2. Diseño

### Plantillas de wireframes

Las plantillas y propuestas de diseño de Loop se encuentran documentadas en **Figma**, donde se desarrollaron las diferentes etapas de diseño de las interfaces.

Se cuenta con:

- **Wireframes de baja fidelidad:** utilizados para definir la estructura, distribución y jerarquía de los elementos antes de establecer el diseño visual definitivo.
- **Wireframes de alta fidelidad:** utilizados para representar con mayor precisión la apariencia final de las páginas, incluyendo colores, tipografías, componentes, espaciados y distribución visual.

Estas plantillas sirven como referencia para comparar y mantener la correspondencia entre el diseño realizado en Figma y la implementación desarrollada en HTML, CSS y Bootstrap.

**Archivo de diseño en Figma:**  
[LOOP — Baja y Alta Fidelidad](https://www.figma.com/design/9PJFqZVGwwdBltLbTNMkW3/LOOP-BAJA-Y-ALTA-FIDELIDAD?node-id=54-2&t=o5OgTIALty7GO8YF-0)

## Paleta de colores

La paleta se encuentra centralizada mediante variables CSS en `:root`.

| Variable | Color | Uso |
|---|---|---|
| `--space-black` | `#0b0b14` | Fondo principal |
| `--modular-gray` | `#131320` | Fondo de paneles y tarjetas |
| `--white` | `#ffffff` | Textos principales |
| `--neutral-gray` | `#9ca3af` | Textos secundarios |
| `--vivid-purple` | `#7c3aed` | Acciones, enlaces activos y elementos destacados |
| `--electric-violet` | `#753bbd` | Estados hover y variaciones del violeta |
| `--neon-green` | `#10b981` | Indicadores y estados destacados |
| `--border-gray` | `#2a2a3c` | Bordes secundarios |
| `--lime` | `#aaff00` | Etiquetas, indicadores y destacados |
| `--text-muted` | `#888798` | Texto de menor jerarquía |

El color de fondo y la apariencia general se configuran mediante:

```css
color-scheme: dark;
```

## Tipografía

Se utilizan tres familias tipográficas:

### Sora

Utilizada principalmente para:

- Logotipo de Loop.
- Títulos principales.
- Encabezados.
- Navegación.
- Elementos que requieren mayor jerarquía visual.

**Pesos utilizados:**

- `600`
- `700`
- `800`

### Inter

Utilizada como tipografía principal del contenido:

- Texto general.
- Descripciones.
- Publicaciones.
- Información de perfil.
- Contenido institucional.

**Peso base:**

- `400`

También se utilizan los pesos:

- `500`
- `600`
- `700`

### JetBrains Mono

Utilizada para elementos de carácter técnico o informativo:

- Etiquetas institucionales.
- Indicadores.
- Categorías.
- Elementos destacados como `NUESTRA VISIÓN`, `NUESTRA MISIÓN` y etiquetas de valores.

## Componentes
## Componentes de Inicio

| Componente | Descripción / Uso |
|---|---|
| Tarjeta de perfil | Muestra la información principal del perfil del usuario. |
| Avatar | Representa visualmente al usuario mediante una imagen o fotografía. |
| Badge PRO | Identifica a los usuarios que cuentan con una membresía PRO. |
| Estadísticas de contactos y visitas | Muestra métricas relacionadas con contactos y visitas al perfil. |
| Composer para publicaciones | Permite al usuario crear y publicar contenido. |
| Tarjetas de publicaciones | Contenedores donde se muestra el contenido de cada publicación. |
| Botón de opciones de publicación | Permite acceder a acciones adicionales relacionadas con una publicación. |
| Indicadores de likes y comentarios | Muestran la cantidad de interacciones que tiene una publicación. |
| Tarjeta Loop Premium | Presenta información o beneficios relacionados con Loop Premium. |
| Botón Mejorar ahora | Permite al usuario acceder a la opción para mejorar o actualizar su cuenta. |

## Componentes de Acerca de nosotros

| Componente | Descripción / Uso |
|---|---|
| Carrusel institucional | Permite mostrar diferentes contenidos institucionales de forma horizontal o secuencial. |
| Panel de visión | Presenta la visión de la organización o proyecto. |
| Panel de misión | Presenta la misión de la organización o proyecto. |
| Panel de valores | Presenta los valores principales de la organización. |
| Indicadores del carrusel | Muestran la posición actual dentro del contenido del carrusel. |
| Controles anterior/siguiente | Permiten navegar entre los elementos del carrusel. |
| Etiquetas de misión | Identifican o resaltan conceptos relacionados con la misión. |
| Placeholder de imagen | Espacio reservado para imágenes que aún no están disponibles o no se han cargado. |
| Tarjetas del equipo ejecutivo | Presentan información de los integrantes del equipo ejecutivo. |
| Carrusel horizontal del equipo | Permite navegar horizontalmente entre las tarjetas del equipo. |
| Flechas de navegación | Permiten avanzar o retroceder dentro del carrusel del equipo. |
| Indicadores de paginación | Muestran la página o posición actual dentro del carrusel. |

## Sistema de estilos y componentes

### Variables CSS

| Tipo | Etiqueta / Clase | Uso en el diseño |
|---|---|---|
| Variable CSS | `--space-black` | Fondo principal de la interfaz. |
| Variable CSS | `--modular-gray` | Fondo reutilizable de paneles y tarjetas. |
| Variable CSS | `--white` | Color de texto principal. |
| Variable CSS | `--neutral-gray` | Color de textos secundarios. |
| Variable CSS | `--vivid-purple` | Color principal de acciones y elementos destacados. |
| Variable CSS | `--electric-violet` | Variación del violeta para estados interactivos. |
| Variable CSS | `--neon-green` | Indicadores y elementos de estado. |
| Variable CSS | `--border-gray` | Bordes de componentes. |
| Variable CSS | `--lime` | Etiquetas y elementos destacados. |
| Variable CSS | `--text-muted` | Texto de menor jerarquía. |
| Variable CSS | `--heading-font` | Tipografía de encabezados. |
| Variable CSS | `--body-font` | Tipografía general. |
| Variable CSS | `--mono-font` | Tipografía monoespaciada. |

### Clases reutilizables

| Tipo | Etiqueta / Clase | Uso en el diseño |
|---|---|---|
| Clase reutilizable | `.panel` | Estilo base para paneles y tarjetas. |
| Clase reutilizable | `.site-header` | Contenedor principal del encabezado. |
| Clase reutilizable | `.nav-shell` | Estructura interna de navegación. |
| Clase reutilizable | `.nav-link` | Enlaces de navegación. |
| Clase reutilizable | `.nav-actions` | Contenedor de acciones del header. |
| Clase reutilizable | `.search-box` | Campo visual de búsqueda. |
| Clase reutilizable | `.avatar` | Representación visual del usuario. |
| Clase reutilizable | `.btn-primary` | Botón principal de acción. |
| Clase reutilizable | `.site-footer` | Pie de página compartido. |
| Clase reutilizable | `.visually-hidden` | Elementos ocultos visualmente para accesibilidad. |
| Clase reutilizable | `.team-card` | Tarjeta reutilizable del equipo. |
| Clase reutilizable | `.team-track` | Contenedor del desplazamiento del carrusel. |
| Clase reutilizable | `.team-viewport` | Área visible del carrusel. |
| Clase reutilizable | `.team-arrow` | Controles de navegación del carrusel. |
| Clase reutilizable | `.team-pagination` | Indicadores de posición del carrusel. |
| Clase reutilizable | `.about-image-placeholder` | Contenedor reutilizable para imágenes pendientes. |

### Componentes principales del sistema

Las más importantes como sistema de componentes son:

- `.panel`
- `.btn-primary`
- `.team-card`
- `.team-arrow`
- `.site-header`
- `.site-footer`
- Variables CSS definidas en `:root`

Estas clases y variables permiten mantener una **consistencia visual** entre las páginas de **Inicio** y **Acerca de nosotros**.




## 3. Arquitectura del proyecto
| Capa | Tecnologías |
| :--- | :--- |
| **Front End** | HTML5, CSS3, Bootstrap 4, ECMAScript 6 (JavaScript) |
| **Back End** | Java, Spring Boot, Postman |
| **Base de Datos** | MySQL |
| **Control de Versiones** | Git, GitHub |

## 4. Páginas y funcionanilidades 

## 5. Desarrollo

El proyecto se desarrolla bajo la metodología ágil **Scrum**, implementando una rotación semanal de roles y un estricto control de versiones mediante ramas independientes en GitHub para cada funcionalidad.

## 6. Historial / avances

## 7. Integrantes del Equipo
* Selene Kanagusico López
* Efraín Sagols Palacios
* Víctor Manuel Lázaro Bravo
* Karen Yesenia López Ramos
* Angélica Amellali Mercado Aguilar
* Ángel Ochoa
* Álvaro Terrones



