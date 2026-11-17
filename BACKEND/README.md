# FeedbackApp API
feedbackapp-production-671a1753.up.railway.app

**Live Demo:** [feedbackapp-production-671a1753.up.railway.app](https://feedbackapp-production-671a1753.up.railway.app/feedback)

## English

The FeedbackApp backend is a REST API for creating, listing, updating, and deleting feature requests, as well as voting and removing votes. It uses MongoDB Atlas for hosted persistence and Mongoose to model and query the data.

### Features

- Create feedback without requiring visitors to register.
- List feedback with vote totals and an optional `hasVoted` value for a browser voter ID.
- Update feedback titles and descriptions.
- Delete feedback and its associated individual votes.
- Store anonymous votes separately, with a unique index per feedback and voter.
- Validate request bodies with Zod and apply rate limits to write and vote routes.
- Expose a health check at `GET /health`.

 
### Tech stack

- Node.js, Express 5, and TypeScript.
- MongoDB Atlas and Mongoose.
- Zod request validation.
- `express-rate-limit` for rate limiting.


### API routes

Base URL: `/feedback`

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/feedback?voterId=<uuid>` | List feedback, totals, and whether that voter has voted. `voterId` is optional. |
| `POST` | `/feedback` | Create feedback with `title`, `description`, and optional `imageUrl`. |
| `PATCH` | `/feedback/:id` | Update a feedback title and/or description. |
| `DELETE` | `/feedback/:id` | Delete feedback and its individual votes. |
| `POST` | `/feedback/:id/votes` | Add a vote with JSON body `{"voterId":"<uuid>"}`. |
| `DELETE` | `/feedback/:id/votes` | Remove a vote with JSON body `{"voterId":"<uuid>"}`. |
| `GET` | `/health` | Check whether the API process is running. |

  `imageUrl`, when provided, must be an HTTP or HTTPS URL. Feedback statuses are managed by the API.

### Deployment

The API is deployed separately from the Vercel frontend (currently on Railway). 

## Español

El backend de FeedbackApp es una API REST para crear, listar, actualizar y eliminar solicitudes de funciones, además de emitir y retirar votos. Usa MongoDB Atlas para alojar los datos y Mongoose para modelarlos y consultarlos.

### Funciones

- Crear feedback sin exigir que los visitantes se registren.
- Listar feedback con el total de votos y, opcionalmente, `hasVoted` para el identificador de votante del navegador.
- Actualizar títulos y descripciones.
- Eliminar feedback y los votos individuales asociados.
- Guardar los votos anónimos por separado, con un índice único por feedback y votante.
- Validar los cuerpos de las solicitudes con Zod y limitar la frecuencia de las rutas de escritura y votación.
- Exponer una comprobación de estado en `GET /health`.

### Tecnologías

- Node.js, Express 5 y TypeScript.
- MongoDB Atlas y Mongoose.
- Zod para validar las solicitudes.
- `express-rate-limit` para limitar la frecuencia de las solicitudes.

URL base: `/feedback`

| Método | Ruta | Propósito |
| --- | --- | --- |
| `GET` | `/feedback?voterId=<uuid>` | Lista feedback, totales y si ese votante ya votó. `voterId` es opcional. |
| `POST` | `/feedback` | Crea feedback con `title`, `description` y `imageUrl` opcional. |
| `PATCH` | `/feedback/:id` | Actualiza el título y/o la descripción. |
| `DELETE` | `/feedback/:id` | Elimina el feedback y sus votos individuales. |
| `POST` | `/feedback/:id/votes` | Añade un voto con el cuerpo JSON `{"voterId":"<uuid>"}`. |
| `DELETE` | `/feedback/:id/votes` | Retira un voto con el cuerpo JSON `{"voterId":"<uuid>"}`. |
| `GET` | `/health` | Comprueba si el proceso de la API está activo. |


`imageUrl`, debe ser una URL HTTP o HTTPS. Los estados del feedback los administra la API.

### Despliegue

La API se despliega por separado del frontend en Vercel (actualmente, en Railway). 