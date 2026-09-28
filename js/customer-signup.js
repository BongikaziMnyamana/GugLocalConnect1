const signupForm = document.getElementById("customerSignupForm");

signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm").value;

    // Check passwords
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const customer = {
        name: name,
        email: email,
        password: password,
        phone: phone
    };

    try {
        const response = await fetch("http://localhost:8080/users/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        });

        if (response.ok) {
            const createdCustomer = await response.json();

            console.log("Customer created:", createdCustomer);

            alert("Account created successfully!");

            window.location.href = "login-customer.html";
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