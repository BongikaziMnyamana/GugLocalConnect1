const signupForm = document.getElementById("businessSignupForm");
const categorySelect = document.getElementById("category");

// Load categories from the backend
async function loadCategories() {
    try {
        const response = await fetch("http://localhost:8080/category/getAll");

        if (!response.ok) {
            throw new Error("Could not load categories");
        }

        const categories = await response.json();

        categories.forEach(function(category) {
            const option = document.createElement("option");

            option.value = category.name;
            option.textContent = category.name;

            categorySelect.appendChild(option);
        });

    } catch (error) {
        console.error("Error loading categories:", error);
        alert("Could not load business categories.");
    }
}

// Handle business signup
signupForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm").value;

    const businessName = document.getElementById("bizname").value.trim();
    const category = document.getElementById("category").value;
    const location = document.getElementById("location").value.trim();
    const description = document.getElementById("description").value.trim();

    // Check passwords
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const business = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        businessName: businessName,
        category: category,
        location: location,
        description: description
    };

    console.log("Business signup data:", business);

    try {
        const response = await fetch("http://localhost:8080/businessprofile/create-business", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(business)
        });

        if (response.ok) {
            const createdBusiness = await response.json();

            console.log("Business created:", createdBusiness);

            alert("Business account created successfully!");

            window.location.href = "login-business.html";

        } else {
            const errorMessage = await response.text();

            console.error("Registration failed:", errorMessage);

            alert("Registration failed: " + errorMessage);
        }

    } catch (error) {
        console.error("Error:", error);

        alert("Could not connect to the server. Make sure your backend is running.");
    }
});

// Load categories when the page opens
loadCategories();