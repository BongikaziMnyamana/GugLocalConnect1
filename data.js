/* =========================================
   GugsLocalConnect – API Connection Layer
   Connects the frontend to the deployed
   Railway backend API.
   ========================================= */

const API_BASE = "https://gugslocalconnect-backend-production.up.railway.app";

// ---------- HEALTH CHECK ----------
async function apiHealth() {
  const res = await fetch(`${API_BASE}/`);
  return res.json();
}

// ---------- BUSINESSES ----------
async function apiGetBusinesses(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = query ? `${API_BASE}/api/businesses?${query}` : `${API_BASE}/api/businesses`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load businesses: ${res.status}`);
  return res.json();
}

async function apiGetBusiness(id) {
  const res = await fetch(`${API_BASE}/api/businesses/${id}`);
  if (!res.ok) throw new Error(`Business ${id} not found`);
  return res.json();
}

async function apiGetBusinessServices(id) {
  const res = await fetch(`${API_BASE}/api/businesses/${id}/services`);
  return res.json();
}

async function apiGetBusinessReviews(id) {
  const res = await fetch(`${API_BASE}/api/businesses/${id}/reviews`);
  return res.json();
}

// ---------- CATEGORIES (static list, matches backend) ----------
const categories = [
  { id: 1, name: "Hairdressing" },
  { id: 2, name: "Catering" },
  { id: 3, name: "Tutoring" },
  { id: 4, name: "Plumbing" },
  { id: 5, name: "Carpentry" },
  { id: 6, name: "Cleaning" }
];

// ---------- AUTH ----------
async function apiRegister({ name, email, password, role, phone }) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role, phone })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Registration failed");
  localStorage.setItem("glc_token", data.token);
  localStorage.setItem("glc_user", JSON.stringify(data.user));
  return data;
}

async function apiLogin(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  localStorage.setItem("glc_token", data.token);
  localStorage.setItem("glc_user", JSON.stringify(data.user));
  return data;
}

function apiLogout() {
  localStorage.removeItem("glc_token");
  localStorage.removeItem("glc_user");
}

function apiCurrentUser() {
  const raw = localStorage.getItem("glc_user");
  return raw ? JSON.parse(raw) : null;
}

function apiToken() {
  return localStorage.getItem("glc_token");
}

// ---------- BOOKINGS ----------
async function apiCreateBooking({ businessId, serviceId, requestedAt, notes }) {
  const res = await fetch(`${API_BASE}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken()}`
    },
    body: JSON.stringify({ businessId, serviceId, requestedAt, notes })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Booking failed");
  return data;
}

async function apiGetBookings() {
  const res = await fetch(`${API_BASE}/api/bookings`, {
    headers: { Authorization: `Bearer ${apiToken()}` }
  });
  if (!res.ok) throw new Error("Could not load bookings");
  return res.json();
}

// ---------- MESSAGES ----------
async function apiSendMessage(receiverId, content) {
  const res = await fetch(`${API_BASE}/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken()}`
    },
    body: JSON.stringify({ receiverId, content })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Could not send message");
  return data;
}

async function apiGetMessages() {
  const res = await fetch(`${API_BASE}/api/messages`, {
    headers: { Authorization: `Bearer ${apiToken()}` }
  });
  return res.json();
}

// ---------- EXPOSE GLOBALLY ----------
window.glcAPI = {
  base: API_BASE,
  health: apiHealth,
  getBusinesses: apiGetBusinesses,
  getBusiness: apiGetBusiness,
  getServices: apiGetBusinessServices,
  getReviews: apiGetBusinessReviews,
  register: apiRegister,
  login: apiLogin,
  logout: apiLogout,
  currentUser: apiCurrentUser,
  token: apiToken,
  createBooking: apiCreateBooking,
  getBookings: apiGetBookings,
  sendMessage: apiSendMessage,
  getMessages: apiGetMessages,
  categories
};