# 🌸 Iran Salazar — Portafolio Profesional

![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

Portafolio web personal modular y de alto rendimiento, diseñado con una estética minimalista, elegante y limpia. Construido con una arquitectura ligera de **HTML5/JS Estático**, estilizado con la versión **v4 de Tailwind CSS**, y respaldado por **Supabase** para la gestión dinámica de proyectos y almacenamiento de activos.

---

## 🚀 Tecnologías y Arquitectura

* **Frontend:** HTML5 semántico y JavaScript (ES6+) modular.
* **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (motor nativo ultra rápido compilado a CSS estático).
* **Base de Datos & Storage:** [Supabase](https://supabase.com/) (PostgreSQL + Bucket de almacenamiento para imágenes WebP y CV en PDF).
* **Analytics & Seguridad:** [Cloudflare](https://www.cloudflare.com/) (CDNs, Web Analytics, compresión Brotli y minificación automática).
* **Alojamiento:** GitHub Pages.

---

## 🛠️ Entorno de Desarrollo y Compilación con Tailwind v4

Este proyecto utiliza la **versión 4 de Tailwind CSS** (`@tailwindcss/cli`), eliminando la necesidad de archivos de configuración pesados como `tailwind.config.js`. 

La detección de componentes HTML/JS y la generación del bundle CSS se realizan de manera nativa mediante la directiva `@import "tailwindcss";` en `css/input.css`.

### 1. Requisitos previos e instalación
Asegúrate de tener instalado Node.js en tu equipo. Clona el repositorio e instala las dependencias de desarrollo localmente:

```bash
npm install
```

### 2. Comandos de Compilación
⚡ Opción A: Modo Desarrollo (Cambios en Vivo / Watch Mode)
Usa este comando mientras estés diseñando o agregando nuevas clases en tu HTML/JS. Tailwind se quedará escuchando el proyecto y recompilará tu CSS automáticamente cada vez que guardes un archivo:

```bash
npx @tailwindcss/cli -i ./css/input.css -o ./css/styles.css --watch
```

📦 Opción B: Modo Producción (Minificado y Optimizado)
Ejecuta este comando antes de hacer un commit/push a GitHub Pages para purgar el CSS no utilizado y minificar el archivo final al menor tamaño posible:

```bash
npx @tailwindcss/cli -i ./css/input.css -o ./css/styles.css --minify
```


### 📂 Estructura del Proyecto
``` Plaintext
.
├── css/
│   ├── input.css       # Archivo fuente de Tailwind v4 y estilos custom (@keyframes)
│   └── styles.css      # CSS final compilado y optimizado que lee index.html
├── js/
│   ├── data.js         # Datos estáticos de respaldo (Fallback)
│   └── main.js         # Lógica principal, fetching a Supabase e interacción UI
├── components/         # Módulos y secciones reutilizables del sitio
├── index.html          # Punto de entrada principal
├── package.json        # Registro de dependencias de desarrollo
└── README.md
```

## 🔒 Buenas Prácticas de Optimización
* **Imágenes de rendimiento:** Uso exclusivo de formatos de nueva generación (`.webp`) almacenados en Supabase Storage.
* **Carga diferida:** Implementación de `loading="lazy"` para imágenes fuera de la vista inicial y `fetchpriority="high"` para la imagen principal del Hero.
* **Cero bloqueo de renderizado:** CSS compilado en una sola transmisión ligera e inyección asíncrona de scripts JS mediante `defer`.

---

✨ *Desarrollado por Iran Salazar*