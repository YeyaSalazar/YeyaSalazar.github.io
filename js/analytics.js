// ==========================================
// CONFIGURACIÓN Y CLIENTE SUPABASE (ANALYTICS)
// ==========================================
const SUPABASE_URL = 'https://hxuzcterqzeohttulnsh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_liHqRhv2T34ljDO1rkhDRg_lbK_Huti';

let supabaseClient = null;

if (typeof window.supabase !== 'undefined') {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    console.error("La librería de Supabase no se cargó correctamente en el HTML.");
}

/**
 * Helper para extraer información del entorno (Dispositivo, SO, Navegador)
 */
function getDeviceInfo() {
    const ua = navigator.userAgent;
    let dispositivo = 'Desktop';
    let sistemaOp = 'Otro';
    let navegador = 'Otro';

    if (/Mobi|Android|iPhone|iPod/i.test(ua)) dispositivo = 'Móvil';
    else if (/Tablet|iPad/i.test(ua)) dispositivo = 'Tablet';

    if (/iPhone|iPad|iPod/i.test(ua)) sistemaOp = 'iOS';
    else if (/Android/i.test(ua)) sistemaOp = 'Android';
    else if (/Win/i.test(ua)) sistemaOp = 'Windows';
    else if (/Mac/i.test(ua)) sistemaOp = 'macOS';
    else if (/Linux/i.test(ua)) sistemaOp = 'Linux';

    if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) navegador = 'Chrome';
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) navegador = 'Safari';
    else if (/Edg/i.test(ua)) navegador = 'Edge';
    else if (/Firefox/i.test(ua)) navegador = 'Firefox';

    return { dispositivo, sistemaOp, navegador };
}

/**
 * Helper para obtener la ubicación geográfica por IP (Ciudad y País)
 */
async function getUbicacion() {
    try {
        const res = await fetch('https://ipapi.co/json/');
        if (!res.ok) throw new Error("Error consultando geolocalización");
        const data = await res.json();
        return {
            ciudad: data.city || 'Desconocida',
            pais: data.country_name || 'Desconocido'
        };
    } catch (e) {
        return { ciudad: 'Desconocida', pais: 'Desconocido' };
    }
}

/**
 * Función global para registrar métricas en Supabase con timeout de resguardo
 * @param {string} tipoEvento - Nombre del evento (ej: 'clic_descarga_cv')
 * @param {string} detalle - Información adicional
 */
async function trackEvent(tipoEvento, detalle = '') {
    const DOMINIO_OFICIAL = 'https://yeyasalazar.github.io';
    
    if (window.location.origin !== DOMINIO_OFICIAL) {
        return; 
    }

    if (!supabaseClient) return;

    const { dispositivo, sistemaOp, navegador } = getDeviceInfo();
    const { ciudad, pais } = await getUbicacion();
    const resolucion = `${window.screen.width}x${window.screen.height}`;
    const idioma = navigator.language || navigator.userLanguage || 'Desconocido';

    try {
        const insertPromise = supabaseClient
            .from('metricas_eventos')
            .insert([{ 
                tipo_evento: tipoEvento, 
                detalle: detalle,
                ruta: window.location.pathname + window.location.hash,
                dispositivo: dispositivo,
                sistema_op: sistemaOp,
                navegador: navegador,
                resolucion: resolucion,
                idioma: idioma,
                ubica_ciudad: ciudad,
                ubica_pais: pais
            }]);

        // Timeout de seguridad de 1.5s
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout Analytics')), 1500)
        );

        const { error } = await Promise.race([insertPromise, timeoutPromise]);

        if (error) {
            console.error("Error devuelto por Supabase Analytics:", error);
        }
    } catch (error) {
        console.warn("⚠️ No se pudo registrar la métrica a tiempo:", error.message);
    }
}