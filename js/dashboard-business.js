const API_BASE = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", async () => {
    const currentUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

    if (!currentUser) {
        window.location.href = "index.html";
        return;
    }

    // Set greeting
    const greetingElem = document.getElementById("owner-greeting");
    if (greetingElem) {
        greetingElem.textContent = `Welcome, ${currentUser.name || "Partner"}`;
    }

    // Logout handler
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            sessionStorage.clear();
            window.location.href = "index.html";
        });
    }

    const userId = currentUser.userid || currentUser.id;

    // Fetch Business Profile Details & Stats
    loadBusinessStatsAndInquiries(userId);
});

async function loadBusinessStatsAndInquiries(ownerId) {
    const inquiryContainer = document.getElementById("inquiry-list");

    try {
        // 1. Fetch Owner Business Profile
        const profileRes = await fetch(`${API_BASE}/business-profiles/owner/${ownerId}`);

        if (!profileRes.ok) {
            if (inquiryContainer) {
                inquiryContainer.innerHTML = "<p>Please complete your business profile setup to start receiving inquiries.</p>";
            }
            return;
        }

        const profile = await profileRes.json();
        const profileId = profile.businessProfileId || profile.businessProfileid || profile.id || profile.business_profileid;

        // Set subtitle and public profile link
        const subtitleElem = document.getElementById("business-subtitle");
        if (subtitleElem && profile.businessName) {
            subtitleElem.textContent = `Managing ${profile.businessName}`;
        }

        const publicLink = document.getElementById("view-public-profile-link");
        if (publicLink && profileId) {
            publicLink.href = `business.html?id=${profileId}`;
        }

        // 2. Fetch Active Services Count
        if (profileId) {
            try {
                const servicesRes = await fetch(`${API_BASE}/services/business/${profileId}`);
                if (servicesRes.ok) {
                    const services = await servicesRes.json();
                    document.getElementById("stat-services-count").textContent = services.length;
                }
            } catch (e) {
                console.warn("Could not load services count:", e);
            }

            // 3. Fetch Bookings Count
            try {
                const bookingsRes = await fetch(`${API_BASE}/bookings/business/${profileId}`);
                if (bookingsRes.ok) {
                    const bookings = await bookingsRes.json();
                    document.getElementById("stat-bookings-count").textContent = bookings.length;
                }
            } catch (e) {
                console.warn("Could not load bookings count:", e);
            }
        }

        // 4. Fetch Recent Messages / Inquiries
        try {
            const messagesRes = await fetch(`${API_BASE}/messages/user/${ownerId}`);
            if (messagesRes.ok) {
                const messages = await messagesRes.json();
                document.getElementById("stat-messages-count").textContent = messages.length;

                if (!inquiryContainer) return;

                if (messages.length === 0) {
                    inquiryContainer.innerHTML = "<p>No recent inquiries found.</p>";
                    return;
                }

                inquiryContainer.innerHTML = messages.map(m => `
                    <div class="booking-item">
                      <div>
                        <h4>${m.sender ? m.sender.name : "Customer"}</h4>
                        <p>${m.content}</p>
                      </div>
                      <span class="chat-time">${new Date(m.sentAt || m.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                `).join("");
            }
        } catch (e) {
            console.warn("Could not load messages:", e);
            if (inquiryContainer) {
                inquiryContainer.innerHTML = "<p>No recent inquiries found.</p>";
            }
        }

    } catch (err) {
        console.error("Dashboard error:", err);
        if (inquiryContainer) {
            inquiryContainer.innerHTML = "<p>Unable to load dashboard details.</p>";
        }
    }
}