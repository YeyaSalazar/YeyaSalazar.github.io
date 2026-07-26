// ==========================================
// FUNCIÓN PARA CARGAR COMPONENTES HTML
// ==========================================
async function cargarComponente(idContenedor, rutaArchivo) {
    try {
        const respuesta = await fetch(rutaArchivo);
        if (respuesta.ok) {
            const html = await respuesta.text();
            const contenedor = document.getElementById(idContenedor);
            if (contenedor) {
                contenedor.innerHTML = html;
            }
        } else {
            console.error(`Error al cargar ${rutaArchivo} (${respuesta.status})`);
        }
    } catch (error) {
        console.error(`Error de red/fetch en ${rutaArchivo}:`, error);
    }
}

// Marcamos el callback de DOMContentLoaded como ASYNC
document.addEventListener("DOMContentLoaded", async () => {

    // 1. Cargamos TODOS los componentes primero en paralelo
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

    // ==========================================
    // 1. SCRIPT DE EFECTO MÁQUINA DE ESCRIBIR (HERO)
    // ==========================================
    const parte1 = "Hola, soy ";
    const parte2 = "Iran Salazar";

    const elSaludo = document.getElementById("texto-saludo");
    const elNombre = document.getElementById("maquina-nombre");
    const seccion = document.getElementById("seccion-hero");

    if (!seccion || !elSaludo || !elNombre) {
        console.warn("Elementos de la sección Hero no encontrados en esta vista.");
    } else {
        let timeoutIds = [];

        function reiniciarYEjecutar() {
            timeoutIds.forEach(id => clearTimeout(id));
            timeoutIds = [];

            elSaludo.textContent = "";
            elNombre.textContent = "";

            let cursor = document.getElementById("cursor-terminal");
            if (!cursor) {
                const h2 = elSaludo.parentElement;
                cursor = document.createElement("span");
                cursor.id = "cursor-terminal";
                cursor.className = "animate-pulse text-pink-500";
                cursor.textContent = "|";
                h2.appendChild(cursor);
            }

            let i = 0;
            let j = 0;

            function escribirSaludo() {
                if (i < parte1.length) {
                    elSaludo.textContent += parte1.charAt(i);
                    i++;
                    timeoutIds.push(setTimeout(escribirSaludo, 100));
                } else {
                    timeoutIds.push(setTimeout(escribirNombre, 150));
                }
            }

            function escribirNombre() {
                if (j < parte2.length) {
                    elNombre.textContent += parte2.charAt(j);
                    j++;
                    timeoutIds.push(setTimeout(escribirNombre, 120));
                }
            }

            timeoutIds.push(setTimeout(escribirSaludo, 300));
        }

        const observerHero = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    reiniciarYEjecutar();
                }
            });
        }, {
            threshold: 0.4
        });

        observerHero.observe(seccion);
    }

    // ==========================================
    // 2. SCRIPT DE ANIMACIÓN REPETIBLE EN PROYECTOS
    // ==========================================
    const tarjetasProyectos = document.querySelectorAll(".proyecto-card");

    if (tarjetasProyectos.length > 0) {
        const observerProyectos = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove("opacity-0", "-translate-x-10");
                } else {
                    entry.target.classList.add("opacity-0", "-translate-x-10");
                }
            });
        }, {
            threshold: 0.2
        });

        tarjetasProyectos.forEach(tarjeta => {
            observerProyectos.observe(tarjeta);
        });
    }

    // ==========================================
    // 3. MENÚ HAMBURGUESA MÓVIL (HEADER)
    // ==========================================
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });
    }

    // ==========================================
    // 4. EVENT LISTENERS PARA CERRAR MODAL BLOG
    // ==========================================
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('modal-articulo');
        const btnCerrar = document.getElementById('btn-cerrar-modal');

        if (modal && !modal.classList.contains('hidden')) {
            if (e.target === modal || (btnCerrar && btnCerrar.contains(e.target))) {
                cerrarModalArticulo();
            }
        }
    });

    // Cerrar modal al presionar la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cerrarModalArticulo();
        }
    });
});

// ==========================================
// 5. FUNCIÓN PARA COPIAR CORREO (FOOTER)
// ==========================================
function copiarEmail(email) {
    navigator.clipboard.writeText(email).then(() => {
        const textoBtn = document.getElementById('texto-copiar');
        if (textoBtn) {
            textoBtn.textContent = '¡Copiado!';
            setTimeout(() => {
                textoBtn.textContent = 'Copiar';
            }, 2000);
        }
    }).catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
    });
}

// ==========================================
// 6. LÓGICA Y BASE DE DATOS DEL BLOG (MODAL)
// ==========================================
const articulosDB = {
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

function abrirArticulo(idArticulo) {
    const articulo = articulosDB[idArticulo];
    if (!articulo) return;

    const modalTitulo = document.getElementById('modal-titulo');
    const modalCategoria = document.getElementById('modal-categoria');
    const modalFecha = document.getElementById('modal-fecha');
    const modalTiempo = document.getElementById('modal-tiempo');
    const modalContenido = document.getElementById('modal-contenido');
    const modal = document.getElementById('modal-articulo');

    if (modalTitulo && modalCategoria && modalFecha && modalTiempo && modalContenido && modal) {
        modalTitulo.textContent = articulo.titulo;
        modalCategoria.textContent = articulo.categoria;
        modalFecha.innerHTML = `<i class="bx bx-calendar text-pink-600"></i> ${articulo.fecha}`;
        modalTiempo.innerHTML = `<i class="bx bx-time-five text-pink-600"></i> ${articulo.tiempo}`;
        modalContenido.innerHTML = articulo.contenido;

        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }
}

function cerrarModalArticulo() {
    const modal = document.getElementById('modal-articulo');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
}