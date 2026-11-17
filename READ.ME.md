# FeedbackApp

**Live Demo:** [feedbackapp-fawn.vercel.app](https://feedbackapp-fawn.vercel.app/)

## English

FeedbackApp is a full-stack feedback board where visitors can share feature requests without creating an account. Visitors can browse suggestions, see their statuses, and vote or remove their vote. Anonymous voting uses a browser-specific ID stored in `localStorage`, so voting is limited to one vote per feedback per browser.

The frontend is deployed to Vercel, and the API is deployed to Railway.

### Features


- Create feature requests without registering.
- Browse feedback suggestions and their statuses.
- Vote for a suggestion or remove your vote.
- Persist anonymous voter identity per browser with `localStorage`.
- Validate feedback and vote requests on the API.
- Rate-limit feedback creation, updates, and voting.
- Responsive interface for desktop and mobile.

### Tech stack

- React 19 and Vite.
- Tailwind CSS 4.
- Sonner for notifications.
- Node.js, Express 5, and TypeScript.
- MongoDB with Mongoose.
- Zod for request validation.
- Vercel for frontend deployment.
- Railway for API deployment.

## Español

FeedbackApp es un tablero de comentarios full-stack donde los visitantes pueden compartir solicitudes de funciones sin crear una cuenta. Pueden explorar sugerencias, consultar sus estados y votar o retirar su voto. La votación anónima utiliza un identificador de navegador guardado en `localStorage`, por lo que cada navegador puede votar una vez por sugerencia.

El frontend está desplegado en Vercel y la API en Railway.

### Funciones

- Crear solicitudes de funciones sin registrarse.
- Explorar sugerencias y consultar sus estados.
- Votar por una sugerencia o retirar el voto.
- Guardar la identidad anónima del votante en el navegador mediante `localStorage`.
- Validar las solicitudes de comentarios y votos en la API.
- Limitar la frecuencia de creación, actualización y votación.
- Interfaz adaptable a computadoras y dispositivos móviles.

### Tecnologías

- React 19 y Vite.
- Tailwind CSS 4.
- Sonner para las notificaciones.
- Node.js, Express 5 y TypeScript.
- MongoDB con Mongoose.
- Zod para la validación de solicitudes.
- Vercel para desplegar el frontend.
- Railway para desplegar la API.