function createWebSocketConnection() {
    // 🎯 AHORA BUSCA: .loca.lt (el tuyo) 
    const esTunel = window.location.hostname.includes(".loca.lt");
    const protocolo = window.location.protocol === "https:" ? "wss" : "ws";

    if (esTunel) {
        // ✅ CUALQUIER TÚNEL → SIN PUERTO
        return new WebSocket(`${protocolo}://${window.location.host}`);
    } else {
        // ✅ MISMA RED / TU CASA → CON PUERTO 3000
        return new WebSocket(`${protocolo}://${window.location.hostname}:3000`);
    }
}