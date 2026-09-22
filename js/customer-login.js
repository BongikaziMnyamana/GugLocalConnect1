const API_BASE = "http://localhost:8080/users";

document.getElementById("customerLoginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const errorEl = document.getElementById("loginError");
    errorEl.style.display = "none";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorBody = await response.json().catch(() => null);
            const message = errorBody?.error || "Invalid email or password.";
            throw new Error(message);
        }

        const user = await response.json();

        if (user.role !== "CUSTOMER") {
            errorEl.textContent = "This account isn't registered as a Customer. Try the business login instead.";
            errorEl.style.display = "block";
            return;
        }

        sessionStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "dashboard.html";

    } catch (err) {
        console.error("Login failed:", err);
        errorEl.textContent = "Login failed: " + err.message;
        errorEl.style.display = "block";
    }
});