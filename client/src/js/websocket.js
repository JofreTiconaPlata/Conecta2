//ARCHIVO CORREGIDO 100% - PARA QUE FUNCIONE CON LOCALTUNNEL
function createWebSocketConnection() {
    const esTunel = window.location.hostname.includes(".loca.lt");
    const protocolo = window.location.protocol === "https:" ? "wss" : "ws";

    if (esTunel) {
        // 🟢 PARA TU AMIGO: SIN PUERTO, SOLO EL DOMINIO DEL TÚNEL
        return new WebSocket(`${protocolo}://${window.location.host}`);
    } else {
        // 🟡 PARA TI EN TU PC: CON PUERTO 3001
        return new WebSocket(`${protocolo}://${window.location.hostname}:3000`);
    }
}