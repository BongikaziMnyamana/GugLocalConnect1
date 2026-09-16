/* =========================================
   GugsLocalConnect – Sample Data
   This file is a placeholder for the backend.
   Your backend team can replace these with
   API calls later without changing the HTML.
   ========================================= */

const categories = [
  { id: 1, name: "Hairdressing" },
  { id: 2, name: "Catering" },
  { id: 3, name: "Tutoring" },
  { id: 4, name: "Plumbing" },
  { id: 5, name: "Carpentry" },
  { id: 6, name: "Cleaning" }
];

const businesses = [
  {
    id: 1,
    name: "Thandi's Hair Studio",
    category: "Hairdressing",
    location: "NY 108, Gugulethu",
    rating: 4.8,
    reviews: 23,
    description: "Professional hair styling and braiding.",
    verified: true
  },
  {
    id: 2,
    name: "Mama Nomsa's Kitchen",
    category: "Catering",
    location: "Section 3, Gugulethu",
    rating: 4.9,
    reviews: 41,
    description: "Home-cooked meals and event catering.",
    verified: true
  },
  {
    id: 3,
    name: "Sipho's Maths Tutoring",
    category: "Tutoring",
    location: "Guguletu, Cape Town",
    rating: 4.6,
    reviews: 15,
    description: "Maths and science tutoring for high school learners.",
    verified: true
  },
  {
    id: 4,
    name: "Lutho Plumbing Services",
    category: "Plumbing",
    location: "Gugulethu",
    rating: 4.6,
    reviews: 32,
    description: "Reliable plumbing installation and repairs.",
    verified: true
  }
];

const services = [
  { id: 1, businessId: 4, name: "Leak Detection", price: "R250 – R500" },
  { id: 2, businessId: 4, name: "Pipe Installation", price: "R500 – R1500" },
  { id: 3, businessId: 4, name: "Bathroom Renovations", price: "R1500 – R5000" },
  { id: 4, businessId: 4, name: "General Plumbing", price: "From R200" }
];

const bookings = [
  { id: 1, customer: "Vuyelwa", businessId: 1, service: "Braiding", date: "2026-09-20", status: "Confirmed" },
  { id: 2, customer: "Vuyelwa", businessId: 2, service: "Catering quote", date: "2026-09-25", status: "Pending" }
];

const messages = [
  { id: 1, from: "Sipho M.", to: "Lutho Plumbing", text: "Hi, I need help with my sink.", time: "10:30" },
  { id: 2, from: "Thandi K.", to: "Lutho Plumbing", text: "How much for installation?", time: "09:15" }
];

// Expose for later use (backend integration)
window.gugsData = { categories, businesses, services, bookings, messages };