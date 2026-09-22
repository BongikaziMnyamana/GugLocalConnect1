const API_BASE = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", async () => {
    // Check logged-in user session
    const currentUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

    if (!currentUser) {
        window.location.href = "index.html"; // Redirect to login if unauthenticated
        return;
    }

    // Set greeting
    const greetingElem = document.getElementById("user-greeting");
    if (greetingElem) {
        greetingElem.textContent = `Hi ${currentUser.name || "Customer"}`;
    }

    // Set logout event
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            sessionStorage.clear();
            window.location.href = "index.html";
        });
    }

    // Handle hero search form submission
    const searchForm = document.getElementById("search-form");
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const query = document.getElementById("search-input").value.trim();
            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        });
    }

    // Fetch sections
    loadCategories();
    loadBusinesses();
    loadBookings(currentUser.userid || currentUser.id);
});

// 1. Fetch Categories
async function loadCategories() {
    const container = document.getElementById("category-grid");
    try {
        const res = await fetch(`${API_BASE}/categories`);
        if (!res.ok) throw new Error("Failed to load categories");
        const categories = await res.json();

        if (categories.length === 0) {
            container.innerHTML = "<p>No categories available.</p>";
            return;
        }

        container.innerHTML = categories.map(cat => `
      <a href="search.html?category=${cat.categoryid || cat.id}" class="category-card">
        <svg viewBox="0 0 24 24" fill="none" stroke="#343B73" stroke-width="1.8">
          <circle cx="12" cy="12" r="10"/>
        </svg>
        <span>${cat.name}</span>
      </a>
    `).join("");
    } catch (err) {
        container.innerHTML = "<p>Unable to load categories.</p>";
        console.error(err);
    }
}

// 2. Fetch Businesses
async function loadBusinesses() {
    const container = document.getElementById("business-grid");
    try {
        const res = await fetch(`${API_BASE}/business-profiles`);
        if (!res.ok) throw new Error("Failed to load businesses");
        const businesses = await res.json();

        if (businesses.length === 0) {
            container.innerHTML = "<p>No local businesses registered yet.</p>";
            return;
        }

        container.innerHTML = businesses.map(biz => {
            const bizId = biz.businessProfileId || biz.businessProfileid || biz.id || biz.business_profileid;
            return `
      <article class="business-card">
        <div class="business-image" style="background:linear-gradient(135deg,#343B73,#5A628F);"></div>
        <div class="business-body">
          <span class="tag">${biz.category ? biz.category.name : "Service"}</span>
          <h3>${biz.businessName || biz.business_name}</h3>
          <p class="location">${biz.location}</p>
          <div class="business-foot">
            <a href="business.html?id=${bizId}" class="btn-small">View</a>
          </div>
        </div>
      </article>
    `;
        }).join("");
    } catch (err) {
        container.innerHTML = "<p>Unable to load local businesses.</p>";
        console.error(err);
    }
}

// 3. Fetch Bookings for Logged-in Customer
async function loadBookings(customerId) {
    const container = document.getElementById("booking-list");
    try {
        const res = await fetch(`${API_BASE}/bookings/customer/${customerId}`);
        if (!res.ok) throw new Error("Failed to load bookings");
        const bookings = await res.json();

        if (bookings.length === 0) {
            container.innerHTML = "<p>You have no recent bookings.</p>";
            return;
        }

        container.innerHTML = bookings.map(b => `
      <div class="booking-item">
        <div>
          <h4>${b.businessProfile ? (b.businessProfile.businessName || b.businessProfile.business_name) : "Business Service"}</h4>
          <p>${b.service ? b.service.name : "Service"} · ${new Date(b.requestedAt || b.requested_at).toLocaleDateString()}</p>
        </div>
        <span class="status ${b.status ? b.status.toLowerCase() : 'pending'}">${b.status}</span>
      </div>
    `).join("");
    } catch (err) {
        container.innerHTML = "<p>No recent bookings found.</p>";
        console.error(err);
    }
}