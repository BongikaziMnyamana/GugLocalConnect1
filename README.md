# GugsLocalConnect – Angular Frontend

Angular rewrite of the original HTML/CSS/JS site, restyled to match your
actual page designs, and structured to plug straight into a Spring Boot +
PostgreSQL backend (see your architecture diagram).

## Running it

```bash
npm install
npx ng serve
```
Then open the address it prints (usually http://localhost:4200)

## Why "log in" doesn't work yet

This is expected, not a bug. Just like your original HTML site's
`customer-login.js` / `business-login.js`, login makes a real network
request to a backend API. Since that backend doesn't exist yet, the request
fails and you'll see an error message on the login form. Nothing will
work end-to-end (login, search results, bookings, messages) until your
Spring Boot API is running and `environment.apiUrl` points at it.

## Connecting to your backend

Set your API base URL in:
- `src/environments/environment.ts` (dev)
- `src/environments/environment.prod.ts` (prod)

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

Every service already calls this base URL — nothing else to wire up once
your Spring Boot endpoints exist.

## Structure

- `src/app/core/models` – TypeScript interfaces matching your data layer
- `src/app/core/services` – one service per API module from your diagram
  (auth, business, search, booking, messaging, review)
- `src/app/core/guards/auth.guard.ts` – blocks dashboard/booking/messaging routes for logged-out users
- `src/app/core/interceptors/auth.interceptor.ts` – attaches the JWT to every request automatically
- `src/app/pages/*` – one component per original HTML page, styled to match the original designs
- `src/app/shared/navbar` and `src/app/shared/footer` – shared header/footer on every page
- `src/styles-legacy.css` – your original stylesheet plus a supplementary
  block covering chat, booking, add-service and my-services pages, whose
  styles were missing even in the original file (it cuts off mid-way
  through the CSS for the chat/messages section) — added in the same
  visual style as the rest of the site.

## Expected API endpoints (adjust to match your Spring Boot controllers)

```
POST /api/auth/register/customer
POST /api/auth/register/business
POST /api/auth/login/customer
POST /api/auth/login/business

GET  /api/categories
GET  /api/businesses/:id
GET  /api/businesses/me
PUT  /api/businesses/me
GET  /api/businesses/me/services
POST /api/businesses/me/services
DELETE /api/businesses/me/services/:id

GET  /api/search?q=&category=&area=

GET  /api/messages
GET  /api/messages/with/:userId
POST /api/messages

POST  /api/bookings
GET   /api/bookings/me
PATCH /api/bookings/:id/status

GET  /api/reviews/business/:businessId
POST /api/reviews
```

## What still needs to be built

This is the Angular **frontend only** (layer 2 of your architecture
diagram). Still needed:
- Spring Boot API (layer 3)
- PostgreSQL schema + row-level security (layer 4)
- External integrations (email, push, file storage, maps) — layer 5
