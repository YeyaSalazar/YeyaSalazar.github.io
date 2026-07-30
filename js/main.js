// ==========================================
// 1. BASE DE DATOS LOCAL DEL BLOG
// ==========================================
const ARTICULOS_DB = {
    'articulo-1': {
        titulo: "Buenas prácticas para estructurar Tailwind CSS en proyectos modulares",
        categoria: "Tailwind CSS",
        fecha: "Jul 2026",
        tiempo: "4 min de lectura",
        contenido: `
            <p>Al construir aplicaciones escalables con Tailwind CSS, uno de los desafíos más comunes es mantener el HTML limpio sin terminar con clases interminables y repetitivas.</p>
            <h4 class="text-lg font-bold text-pink-600 mt-4 mb-2">1. Reutilización con Módulos y Componentes</h4>
            <p>En lugar de abusar de la directiva <code>@apply</code> en CSS, la mejor práctica en proyectos web es separar las secciones en componentes HTML independientes cargados dinámicamente o mediante frameworks.</p>
            <h4 class="text-lg font-bold text-pink-600 mt-4 mb-2">2. Uso de Flexbox y Grid Flexibles</h4>
            <p>Aprovecha las utilidades de espacio como <code>gap-*</code> en lugar de márgenes individuales (<code>mb-*</code>) para mantener proporciones matemáticamente idénticas.</p>
        `
    },
    'articulo-2': {
        titulo: "Entendiendo el Event Loop y Promesas en JavaScript",
        categoria: "JavaScript",
        fecha: "Jun 2026",
        tiempo: "6 min de lectura",
        contenido: `
            <p>JavaScript es un lenguaje de un solo hilo (single-threaded), lo que significa que solo puede ejecutar una tarea a la vez. ¿Cómo maneja entonces peticiones asíncronas sin congelar la pantalla?</p>
            <h4 class="text-lg font-bold text-pink-600 mt-4 mb-2">La pila de llamadas (Call Stack) y Microtareas</h4>
            <p>Las promesas y los bloques <code>async/await</code> ingresan a la cola de microtareas, ejecutándose inmediatamente después de que el Call Stack se vacía.</p>
        `
    }
};

// ==========================================
// 2. CARGA DINÁMICA DE COMPONENTES HTML
// ==========================================
async function cargarComponente(idContenedor, rutaArchivo) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    try {
        const respuesta = await fetch(rutaArchivo);
        if (!respuesta.ok) throw new Error(`Status HTTP: ${respuesta.status}`);
        
        const html = await respuesta.text();
        contenedor.innerHTML = html;
    } catch (error) {
        console.error(`Error al cargar módulo [${rutaArchivo}]:`, error);
        contenedor.innerHTML = `
            <div class="p-4 text-center text-pink-700 bg-pink-50 rounded-xl border border-pink-200 my-4 text-sm">
                ⚠️ No se pudo cargar esta sección. Por favor, recarga la página.
            </div>
        `;
    }
}

// ==========================================
// 3. INICIALIZACIÓN PRINCIPAL DE LA APP
// ==========================================
document.addEventListener("DOMContentLoaded", async () => {
    
    // 1. Carga paralela de componentes HTML
    await Promise.all([
        cargarComponente("component-header", "./components/header.html"),
        cargarComponente("component-hero", "./components/hero.html"),
        cargarComponente("component-habilidades", "./components/habilidades.html"),
        cargarComponente("component-proyectos", "./components/proyectos.html"),
        cargarComponente("component-sobre-mi", "./components/sobre-mi.html"),
        cargarComponente("component-cv", "./components/cv-logros.html"),
        cargarComponente("component-blog", "./components/blog.html"),
        cargarComponente("component-footer", "./components/footer.html")
    ]);

    // 2. Inicialización de funciones del DOM
    initHeroAnimation();
    initProyectosObserver();
    initBlogObserver();
    initMobileMenu();
    initGlobalEventListeners();

    // 3. Registrar visita inicial a la página
    if (typeof trackEvent === 'function') {
        trackEvent('page_view', document.referrer || 'directo');
    }
});

// ==========================================
// 4. ANIMACIÓN HERO (MÁQUINA DE ESCRIBIR)
// ==========================================
function initHeroAnimation() {
    const parte1 = "Hola, soy ";
    const parte2 = "Iran Salazar";

    const elSaludo = document.getElementById("texto-saludo");
    const elNombre = document.getElementById("maquina-nombre");
    const seccion = document.getElementById("seccion-hero");

    if (!seccion || !elSaludo || !elNombre) return;

    let timeoutIds = [];

    function ejecutarEscritura() {
        timeoutIds.forEach(id => clearTimeout(id));
        timeoutIds = [];

        elSaludo.textContent = "";
        elNombre.textContent = "";

        let cursor = document.getElementById("cursor-terminal");
        if (!cursor) {
            cursor = document.createElement("span");
            cursor.id = "cursor-terminal";
            cursor.className = "animate-pulse text-pink-600";
            cursor.textContent = "|";
            elSaludo.parentElement.appendChild(cursor);
        }

        let i = 0, j = 0;

        function escribirSaludo() {
            if (i < parte1.length) {
                elSaludo.textContent += parte1.charAt(i++);
                timeoutIds.push(setTimeout(escribirSaludo, 90));
            } else {
                timeoutIds.push(setTimeout(escribirNombre, 150));
            }
        }

        function escribirNombre() {
            if (j < parte2.length) {
                elNombre.textContent += parte2.charAt(j++);
                timeoutIds.push(setTimeout(escribirNombre, 110));
            }
        }

        timeoutIds.push(setTimeout(escribirSaludo, 250));
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) ejecutarEscritura();
        });
    }, { threshold: 0.3 });

    observer.observe(seccion);
}

// ==========================================
// 5. ANIMACIONES DE SCROLL (OBSERVERS)
// ==========================================
function initProyectosObserver() {
    const tarjetas = document.querySelectorAll(".proyecto-card");
    if (!tarjetas.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("opacity-0", "-translate-x-10");
            } else {
                entry.target.classList.add("opacity-0", "-translate-x-10");
            }
        });
    }, { threshold: 0.15 });

    tarjetas.forEach(t => observer.observe(t));
}

function initBlogObserver() {
    const tarjetas = document.querySelectorAll(".blog-card");
    if (!tarjetas.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("opacity-0", "-translate-x-10");
            } else {
                entry.target.classList.add("opacity-0", "-translate-x-10");
            }
        });
    }, { threshold: 0.15 });

    tarjetas.forEach(t => observer.observe(t));
}

// ==========================================
// 6. MENÚ MÓVIL HAMBURGUESA
// ==========================================
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        if (typeof trackEvent === 'function') {
            trackEvent('toggle_menu_movil', menu.classList.contains('hidden') ? 'cerrar' : 'abrir');
        }
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => menu.classList.add('hidden'));
    });
}

// ==========================================
// 7. DELEGACIÓN GLOBAL DE EVENTOS & TRACKING
// ==========================================
function initGlobalEventListeners() {
    document.addEventListener('click', (e) => {
        
        // 1. Abrir Modal de Artículo del Blog
        const btnLeer = e.target.closest('[data-articulo-id]');
        if (btnLeer) {
            const articuloId = btnLeer.getAttribute('data-articulo-id');
            abrirModalArticulo(articuloId);
            if (typeof trackEvent === 'function') trackEvent('lectura_articulo_blog', articuloId);
            return;
        }

        // 2. Cerrar Modal (clic fuera o botón X)
        const modal = document.getElementById('modal-articulo');
        const btnCerrar = e.target.closest('#btn-cerrar-modal');
        if (modal && !modal.classList.contains('hidden')) {
            if (e.target === modal || btnCerrar) {
                cerrarModalArticulo();
            }
        }

        // 3. Botón Copiar Email en el Footer
        const btnCopiar = e.target.closest('#btn-copiar-email');
        if (btnCopiar) {
            const email = btnCopiar.getAttribute('data-email') || 'iran.gutierrez.dev@gmail.com';
            copiarAlPortapapeles(email);
            if (typeof trackEvent === 'function') trackEvent('copiar_email', email);
        }

        // 4. Medir Clics en Descarga de CV
        const btnCV = e.target.closest('a[download]');
        if (btnCV) {
            if (typeof trackEvent === 'function') {
                trackEvent('clic_descarga_cv', btnCV.getAttribute('download') || 'CV-Iran-Salazar.pdf');
            }
        }

        // 5. Medir Clics en Enlaces de Navegación del Header / Menú
        const navLink = e.target.closest('header a[href^="#"], nav a[href^="#"]');
        if (navLink) {
            const seccionDestino = navLink.getAttribute('href');
            const textoEnlace = navLink.textContent.trim();
            if (typeof trackEvent === 'function') {
                trackEvent('clic_navegacion', `${textoEnlace} (${seccionDestino})`);
            }
            return;
        }

        // 6. Medir Redirecciones a Enlaces Externos (LinkedIn, GitHub, etc.)
        const linkExterno = e.target.closest('a[target="_blank"]');
        if (linkExterno && !btnCV) {
            if (typeof trackEvent === 'function') {
                trackEvent('redireccion_externa', linkExterno.href);
            }
        }
    });

    // Cerrar modal con la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') cerrarModalArticulo();
    });
}

// ==========================================
// 8. FUNCIONES AUXILIARES (MODAL & CLIPBOARD)
// ==========================================
function abrirModalArticulo(idArticulo) {
    const articulo = ARTICULOS_DB[idArticulo];
    if (!articulo) return;

    document.getElementById('modal-titulo').textContent = articulo.titulo;
    document.getElementById('modal-categoria').textContent = articulo.categoria;
    document.getElementById('modal-fecha').innerHTML = `<i class="bx bx-calendar text-pink-600"></i> ${articulo.fecha}`;
    document.getElementById('modal-tiempo').innerHTML = `<i class="bx bx-time-five text-pink-600"></i> ${articulo.tiempo}`;
    document.getElementById('modal-contenido').innerHTML = articulo.contenido;

    const modal = document.getElementById('modal-articulo');
    if (modal) {
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('overflow-hidden');
    }
}

function cerrarModalArticulo() {
    const modal = document.getElementById('modal-articulo');
    if (modal) {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('overflow-hidden');
    }
}

function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        const textoBtn = document.getElementById('texto-copiar');
        if (textoBtn) {
            textoBtn.textContent = '¡Copiado!';
            setTimeout(() => { textoBtn.textContent = 'Copiar'; }, 2000);
        }
    }).catch(err => console.error('Error al copiar:', err));
}