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
```

> Se recomienda usar **Node.js 20 LTS o superior**.

---

## Clonar el repositorio

```bash
git clone https://github.com/JofreTiconaPlata/Conecta2.git
cd Conecta2
```

---

## Instalación de dependencias

Desde la raíz del proyecto, ejecuta:

```bash
npm install
```

### Dependencias principales

El proyecto utiliza principalmente estas dependencias:

- **express**: servidor HTTP
- **ws**: comunicación en tiempo real con WebSocket
- **sqlite3**: persistencia local de mensajes y eventos
- **dotenv**: manejo de variables de entorno

Si se desea instalar manualmente, sería:

```bash
npm install express ws sqlite3 dotenv
```

---

## Configuración del entorno

### Crear archivo `.env`

PORT=3000
HOST=0.0.0.0
NODE_ENV=development
DB_PATH=database/conecta2.db

FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_CLIENT_EMAIL=tu_service_account_client_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_CLAVE_PRIVADA_AQUI\n-----END PRIVATE KEY-----\n"
SESSION_SECRET=conecta2_dev_secret


### Contenido del archivo `.env`

```env
PORT=3000
HOST=0.0.0.0
NODE_ENV=development
DB_PATH=database/conecta2.db
```

> Si no se crea el archivo `.env`, el sistema puede usar valores por defecto definidos en la configuración, pero es recomendable tenerlo.

---

## Cómo ejecutar el proyecto

Desde la raíz del proyecto, ejecuta:

```bash
node server/src/server.js
```

### Salida esperada en terminal

```bash
Base de datos SQLite conectada en: /ruta/completa/database/conecta2.db
Migraciones SQLite ejecutadas correctamente.
Servidor HTTP ejecutándose en http://localhost:3000
Health check disponible en http://0.0.0.0:3000/health
```

---

## Cómo acceder al sistema

Abrir el navegador en:

```text
http://localhost:3000
```

---

## Verificación del backend

Para comprobar que el servidor funciona correctamente, abrir:

```text
http://localhost:3000/health
```

### Respuesta esperada

```json
{
  "status": "ok",
  "service": "Conecta2 API",
  "timestamp": "2026-05-07T00:00:00.000Z"
}
```

---

## Cómo probar el chat

1. Iniciar el servidor.
2. Abrir `http://localhost:3000` en una pestaña del navegador.
3. Abrir la misma dirección en otra pestaña o en otro navegador.
4. Conectar usuarios distintos.
5. Enviar mensajes entre ellos.
6. Verificar que:
   - los mensajes aparecen en tiempo real
   - se notifica cuando un usuario entra
   - se notifica cuando un usuario sale
   - el historial se mantiene visible

---

## Funcionalidades principales

- chat en tiempo real con WebSocket
- conexión simultánea de varios usuarios
- historial básico de mensajes
- notificación de entrada y salida de usuarios
- nombre temporal automático si el usuario no define uno
- persistencia básica mediante SQLite
- endpoint de verificación `/health`



## Estructura general del proyecto

Conecta2/
├── client/
│   ├── src/
│   │   ├── css/
│   │   │   └── styles.css
│   │   ├── js/
│   │   │   ├── app.js
│   │   │   ├── auth-ui.js
│   │   │   ├── chat-ui.js
│   │   │   ├── firebase-config.js
│   │   │   ├── utils.js
│   │   │   └── websocket.js
│   │   └── index.html
│   └── README.md
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middlewares/
│   │   ├── repositories/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   ├── server.js
│   │   └── websocket.js
│   └── README.md
│
├── shared/
│   ├── constants/
│   └── dto/
│
├── .gitignore 
├── package.json
├── package-lock.json
└── README.md


## Comandos útiles

### Editar el README

```bash
nano README.md
```

### Guardar cambios en Git

```bash
git add README.md
git commit -m "docs: actualizar readme del proyecto Conecta2"
git push origin main
```

---

## Autor

Proyecto desarrollado con fines académicos para la implementación de un sistema de chat colaborativo en tiempo real.
