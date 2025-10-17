# Frontend Critio

Repositorio del frontend de la plataforma web **Critio**, una aplicación orientada a la gestión y consumo de información cinematográfica. Este proyecto implementa la interfaz de usuario para explorar películas, administrar listas personalizadas y operar paneles de administración utilizando Next.js con componentes modernos optimizados para renderizado en el servidor y el cliente.

## Arquitectura del frontend

La aplicación está construida sobre la arquitectura de App Router de Next.js. Los módulos se organizan por dominios funcionales dentro de `src/app`, combinando rutas anidadas, segmentos protegidos y componentes de servidor. La lógica de presentación se encapsula en componentes reutilizables ubicados en `src/components`, segmentados por entidad (películas, directores, reseñas, perfiles). El estado global de autenticación se resuelve mediante un contexto React (`src/context/AuthContext.tsx`) y hooks especializados, mientras que las llamadas a la API se abstraen en utilidades y hooks (`src/hooks/useApi.ts`).

El diseño sigue un enfoque modular con componentes desacoplados y estilos gestionados a través de Tailwind CSS. Se emplean server actions para SSR/SSG y componentes cliente únicamente cuando se requiere interacción directa (formularios, modales, etc.).

## Tecnologías y dependencias principales

- **Framework:** Next.js 15 (App Router) con React 19 y TypeScript.
- **Estilos:** Tailwind CSS 4, tailwind-animate para transiciones.
- **UI y utilidades:** lucide-react para iconografía, clsx para composición de clases.
- **Estado y datos:** Context API de React y hooks personalizados (`useAuth`, `useApi`).
- **Herramientas de desarrollo:** Turbopack para desarrollo (`next dev --turbopack`), ESLint (configuración oficial de Next.js), TypeScript, PostCSS/Autoprefixer para pipeline de estilos.

## Requisitos previos

- Node.js >= 18.18.0
- npm >= 9.0.0 (o pnpm >= 8.0.0 / yarn >= 1.22 si se prefiere otro gestor)
- Git

## Instalación

```bash
# Clonar el repositorio
$ git clone https://github.com/JuanBonadeo/FrontEnd-TPDSW
$ cd FrontEnd-TPDSW

# Instalar dependencias
$ npm install
# o
$ pnpm install
```

## Configuración

El proyecto requiere variables de entorno para establecer la comunicación con los servicios de backend.

1. Copiar el archivo de plantilla y crear la configuración local:
   ```bash
   $ cp env.template .env.local
   ```
2. Ajustar los valores según el entorno objetivo:
   - `NEXT_PUBLIC_API_URL`: URL base del API REST público utilizado por el frontend (por ejemplo, `https://backend-tpdsw.onrender.com/api` o `http://localhost:3001/api`).

## Ejecución del proyecto

```bash
# Entorno de desarrollo con recarga en caliente
$ npm run dev

# Construcción de la versión de producción
$ npm run build

# Servir la build generada
$ npm run start
```

## Estructura de carpetas

```
src/
├─ app/                 # Rutas y segmentos del App Router; layouts, páginas y server components
│  ├─ (home)/           # Páginas principales (inicio, búsqueda, fichas, favoritos, etc.)
│  ├─ auth/             # Flujo de autenticación y vistas públicas
│  ├─ admin/            # Segmentos protegidos para administración
│  └─ globals.css       # Estilos globales
├─ components/          # Componentes UI agrupados por dominio funcional
├─ context/             # Contextos globales (por ejemplo, autenticación)
├─ hooks/               # Hooks personalizados para lógica compartida (API, sesión, etc.)
├─ lib/                 # Utilidades de infraestructura (adaptadores, helpers, servicios)
└─ utils/               # Funciones auxiliares comunes y constantes
```

Adicionalmente, `public/` contiene activos estáticos (imágenes, íconos) y las configuraciones de Tailwind (`tailwind.config.ts`) y PostCSS (`postcss.config.mjs`) definen la capa de estilos.

## Buenas prácticas o convenciones

- Código escrito en TypeScript con tipado estricto y componentes funcionales.
- Estructura de carpetas por dominios, evitando dependencias circulares y promoviendo la reutilización.
- Uso de hooks personalizados para aislar lógica de negocio y llamadas HTTP.
- Estilos implementados con utilidades Tailwind; se recomienda mantener componentes presentacionales libres de lógica compleja.
- Validar los cambios ejecutando `npm run lint` antes de abrir un Pull Request.
- Seguir las convenciones de ESLint y respetar la configuración de formateo establecida por el proyecto.

## Contribución y mantenimiento

1. Trabajar siempre sobre ramas derivadas de `main` siguiendo la convención `feature/<nombre-corto>` o `fix/<incidencia>`.
2. Mantener commits atómicos, descritos en inglés con formato imperativo (por ejemplo, `Add movie carousel server component`).
3. Asegurar que la rama esté actualizada con `main` antes de abrir un Pull Request.
4. Incluir descripción funcional, capturas relevantes y resultados de linters/tests en el Pull Request.
5. Las revisiones de código se realizan mediante revisores designados; es obligatorio resolver comentarios antes de fusionar.