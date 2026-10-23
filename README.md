# VECTOR — Levantamiento digital y escaneo 3D

Sitio web de VECTOR, enfocado en servicios de escaneo láser y documentación digital de plantas industriales e infraestructura. Presenta los servicios, la tecnología de captura y modelado, y una muestra interactiva de espacios y modelos 3D.

## Funcionalidades

- Página principal con resumen de capacidades y sectores de aplicación.
- Catálogo de servicios de escaneo láser, nubes de puntos, modelado BIM/As-Built e inspección remota.
- Página de tecnología con información sobre captura LiDAR y flujos CAD.
- Showcase interactivo con vistas de recorridos, modelos de planta y comparación de información.
- Formulario para solicitar una cotización.

## Tecnologías

- [Astro](https://astro.build/) para páginas y estructura del sitio.
- [React](https://react.dev/) para componentes interactivos.
- [Three.js](https://threejs.org/), [React Three Fiber](https://r3f.docs.pmnd.rs/) y [Drei](https://github.com/pmndrs/drei) para visualizaciones 3D.
- [Tailwind CSS](https://tailwindcss.com/) para estilos.
- TypeScript para componentes y lógica de interfaz.

## Requisitos

- Node.js `22.22.0` o superior.
- pnpm.

## Desarrollo local

Desde la carpeta del proyecto, instala las dependencias e inicia el servidor:

```sh
pnpm install
pnpm dev
```

Abre la dirección que indique Astro en la terminal (por defecto, `http://localhost:4321`).

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Inicia el servidor de desarrollo. |
| `pnpm build` | Genera la versión de producción en `dist/`. |
| `pnpm preview` | Sirve localmente la compilación de producción. |
| `pnpm astro -- --help` | Muestra la ayuda de Astro. |

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/` | Presentación de VECTOR y sus capacidades. |
| `/servicios` | Servicios de captura, modelado e inspección. |
| `/tecnologia` | Tecnología y flujo de trabajo. |
| `/showcase` | Muestra interactiva de visualizaciones 3D. |
| `/contacto` | Formulario de solicitud de cotización. |

## Estructura del proyecto

```text
/
├── public/
│   └── models/             # Modelos y recursos servidos directamente
├── src/
│   ├── assets/             # Recursos procesados por Astro
│   ├── components/
│   │   ├── interactive/    # Visores 3D y formulario
│   │   ├── sections/       # Secciones compartidas, como navegación
│   │   └── ui/             # Componentes de interfaz reutilizables
│   ├── layouts/            # Estructura común de las páginas
│   ├── pages/              # Rutas del sitio y endpoint de contacto
│   └── styles/             # Estilos globales
└── package.json
```

## Recursos 3D

Los archivos colocados en `public/` se sirven desde la raíz del sitio. Por ejemplo, el modelo `public/models/prison_hallway.glb` se carga como `/models/prison_hallway.glb`. Los recursos importados desde `src/assets/` se procesan durante la compilación.

## Formulario de contacto

El formulario envía una solicitud `POST` a `/api/contacto`. El endpoint actual es una base de integración: todavía no está conectado a un proveedor de correo ni entrega las solicitudes. Antes de publicar el sitio, configura un servicio de envío y despliega el endpoint en un entorno que admita rutas de servidor de Astro.
