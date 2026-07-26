// ==========================================
// 1. SCRIPT DE EFECTO MÁQUINA DE ESCRIBIR (HERO)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const parte1 = "Hola, soy ";
    const parte2 = "Iran Salazar";

    const elSaludo = document.getElementById("texto-saludo");
    const elNombre = document.getElementById("maquina-nombre");
    const seccion = document.getElementById("seccion-hero");

    if (!seccion || !elSaludo || !elNombre) {
        // Si no estamos en una página con la sección Hero, no interrumpimos el resto del script
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
});