# Conecta2

**Conecta2** es una aplicación web de **chat colaborativo en tiempo real** desarrollada con **Node.js, Express, WebSocket y SQLite**.  
Permite que múltiples usuarios se conecten desde el navegador, intercambien mensajes en tiempo real y mantengan un historial básico de conversación.

---

## Descripción del proyecto

El sistema fue desarrollado como una **SPA (Single Page Application)** orientada a la comunicación colaborativa en tiempo real.  
La interacción entre cliente y servidor se realiza mediante **WebSocket**, evitando el uso de polling o long-polling, y los mensajes relevantes se almacenan en **SQLite** para mantener persistencia básica.

---

## Objetivo

Implementar un chat colaborativo en tiempo real que permita:

- conexión simultánea de múltiples usuarios
- envío y recepción de mensajes instantáneos
- visualización de historial de mensajes
- notificación cuando un usuario entra o sale del chat
- asignación de nombre temporal si no se proporciona uno
- persistencia de mensajes y eventos relevantes

---

## Tecnologías utilizadas

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express
- WebSocket (`ws`)

### Base de datos
- SQLite3

### Configuración
- dotenv

---

## Requisitos previos

Antes de ejecutar el proyecto, debes tener instalado:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- npm

### Verificar instalación

Ejecuta en terminal:

```bash
git --version
node --version
npm --version
