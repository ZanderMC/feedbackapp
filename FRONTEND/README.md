# FeedbackApp (Frontend)

**Live Demo:** [feedbackapp-fawn.vercel.app](https://feedbackapp-fawn.vercel.app/)

## English

The FeedbackApp frontend is a responsive React application for browsing feature requests and sharing new ideas. Visitors can vote for a suggestion or remove their vote without creating an account. Their anonymous voter ID is stored in the browser's `localStorage`.

### Features

- Browse feedback suggestions, descriptions, statuses, and vote totals.
- Submit a feature request using the collapsible feedback form.
- Vote for a suggestion or remove your vote.
- Keep an anonymous voter ID in `localStorage` so each browser can vote once per suggestion.
- Show loading, empty, success, and error states.
- Responsive layout for desktop and mobile screens.

### Tech stack

- React 19.
- Vite 8.
- Tailwind CSS 4.
- Sonner for toast notifications.

### API

The frontend currently sends feedback and voting requests directly to the production API hosted on Railway. Running the frontend locally will also use that API unless its URL is changed in the source.

## Español

El frontend de FeedbackApp es una aplicación adaptable hecha con React para explorar solicitudes de funciones y compartir nuevas ideas. Los visitantes pueden votar por una sugerencia o retirar su voto sin crear una cuenta. El identificador anónimo del votante se guarda en el `localStorage` del navegador.

### Funciones

- Explorar sugerencias, descripciones, estados y totales de votos.
- Enviar solicitudes de funciones mediante un formulario plegable.
- Votar por una sugerencia o retirar el voto.
- Guardar un identificador anónimo en `localStorage` para limitar a un voto por sugerencia en cada navegador.
- Mostrar estados de carga, lista vacía, éxito y error.
- Diseño adaptable a computadoras y dispositivos móviles.

### Tecnologías

- React 19.
- Vite 8.
- Tailwind CSS 4.
- Sonner para las notificaciones.

### API

Actualmente, el frontend envía las solicitudes de feedback y votos directamente a la API de producción alojada en Railway.