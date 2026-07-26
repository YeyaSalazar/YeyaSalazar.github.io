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
});

// ==========================================
// 4. FUNCIÓN PARA COPIAR CORREO (FOOTER)
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