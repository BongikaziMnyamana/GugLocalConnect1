# GugsLocalConnect – Frontend

A community marketplace connecting Gugulethu residents with local businesses and service providers.

## What's in this folder

19 files total:

- **HTML pages** – `index.html`, `login*.html`, `signup*.html`, `dashboard*.html`, `search.html`, `business.html`, `chat.html`, `booking.html`, `add-service.html`, `my-services.html`, `messages.html`
- **Stylesheet** – `styles.css` (shared by all pages)
- **Sample data** – `data.js`
- **This file** – `README.md`

## How to run locally

1. Open the folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` → **Open with Live Server**.
4. The site opens in your browser and refreshes when you save.

Or simply double-click any `.html` file to open it in a browser.

## Page flow

### Customer flow

1. `index.html` – Home
2. `login.html` → `login-customer.html` → `dashboard.html`
3. `search.html` → `business.html` → `chat.html` → `booking.html`

### Business owner flow

1. `index.html` – Home
2. `login.html` → `login-business.html` → `dashboard-business.html`
3. `add-service.html`, `my-services.html`, `messages.html`

### Signup flow

1. `signup.html` → `signup-customer.html` OR `signup-business.html`

## Colour palette

| Role             | Colour     | Hex       |
| ---------------- | ---------- | --------- |
| Primary dark     | Indigo     | `#343B73` |
| Primary accent   | Terracotta | `#C77B4E` |
| Secondary accent | Sage       | `#8FA87C` |
| Background       | Cream      | `#F5F0E8` |
| Surface          | Off-white  | `#FDFBF7` |
| Text             | Charcoal   | `#2E2A26` |
| Muted            | Warm grey  | `#6B6560` |
| Border           | Sand       | `#E8E1D5` |

## Fonts

- **Outfit** – headings
- **Figtree** – body text

Loaded from Google Fonts via `<link>` tags in each page.

## Connecting to the backend

Sample data lives in `data.js`. To connect real API endpoints:

1. Replace `window.gugsData` with actual `fetch()` calls to your Spring Boot API.
2. See the API endpoint list provided separately.
3. Test with Postman before wiring the frontend.

## Porting to Angular

Each `.html` file maps to an Angular component:

| HTML file             | Angular component               |
| --------------------- | ------------------------------- |
| `index.html`          | `home.component.html`           |
| `login.html`          | `login.component.html`          |
| `login-customer.html` | `login-customer.component.html` |
| (etc.)                | (etc.)                          |

Shared `styles.css` goes into `src/styles.css` in the Angular project.

Replace `<a href="page.html">` with `routerLink="/page"`.

Replace hard-coded business cards with `*ngFor` over data from an Angular service.

## Team

**Backend:** 3 members (Spring Boot + PostgreSQL)
**Frontend:** 3 members (Angular port + this prototype)

## License

Built for academic use – Cape Peninsula University of Technology, Professional Practice III (PFP362S).
