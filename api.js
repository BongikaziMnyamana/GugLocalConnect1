/* =========================================
   GugsLocalConnect – Backend API helper
   Talks to the Spring Boot backend at BASE_URL.
   Change BASE_URL if you deploy the backend
   somewhere other than your own machine.
   ========================================= */

const BASE_URL = "http://localhost:8080";

async function apiRequest(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    // The backend throws RuntimeExceptions (e.g. "Email already registered")
    // which Spring turns into a plain-text 500 response body.
    const text = await res.text();
    throw new Error(text || `Request failed (${res.status})`);
  }

  const contentType = res.headers.get("content-type") || "";
  return contentType.includes("application/json") ? res.json() : null;
}

const api = {
  // ---- Users ----
  registerCustomer: (user) =>
    apiRequest("/users/create-customer", { method: "POST", body: JSON.stringify(user) }),

  registerBusinessOwner: (user) =>
    apiRequest("/users/create-businessOwner", { method: "POST", body: JSON.stringify(user) }),

  login: (email, password) =>
    apiRequest("/users/login", { method: "POST", body: JSON.stringify({ email, password }) }),

  // ---- Categories ----
  getCategories: () => apiRequest("/category/getAll"),
  createCategory: (name) =>
    apiRequest("/category/create", { method: "POST", body: JSON.stringify({ name }) }),

  // Looks a category up by name, creating it if it doesn't exist yet.
  // Lets the business-signup form keep using plain category names.
  getOrCreateCategoryId: async (name) => {
    const categories = await api.getCategories();
    const existing = categories.find((c) => c.name.toLowerCase() === name.toLowerCase());
    if (existing) return existing.categoryID;
    const created = await api.createCategory(name);
    return created.categoryID;
  },

  // ---- Business profiles ----
  getBusinessProfiles: () => apiRequest("/businessprofile/getAll"),
  createBusinessProfile: (profile) =>
    apiRequest("/businessprofile/create", { method: "POST", body: JSON.stringify(profile) }),
};

// ---- Session helpers (kept in localStorage, per-browser) ----
const session = {
  save(user) {
    localStorage.setItem("gugsUser", JSON.stringify(user));
  },
  get() {
    const raw = localStorage.getItem("gugsUser");
    return raw ? JSON.parse(raw) : null;
  },
  clear() {
    localStorage.removeItem("gugsUser");
  },
};