
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const authForm = document.getElementById("authForm");
const nameGroup = document.getElementById("nameGroup");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");
const dashboard = document.getElementById("dashboard");
const logoutBtn = document.getElementById("logoutBtn");

let isSignup = false;
let authToken = null;

function showMessage(text, type = "") {
    message.textContent = text;
    message.className = `message ${type}`;
}

function switchMode(signup) {
    isSignup = signup;

    loginTab.classList.toggle("active", !signup);
    signupTab.classList.toggle("active", signup);

    nameGroup.classList.toggle("hidden", !signup);
    nameInput.required = signup;

    passwordInput.autocomplete = signup
        ? "new-password"
        : "current-password";

    submitBtn.textContent = signup
        ? "Create Account"
        : "Login to Account";

    showMessage();
}

loginTab.addEventListener("click", () => switchMode(false));
signupTab.addEventListener("click", () => switchMode(true));

authForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    showMessage();

    submitBtn.disabled = true;
    submitBtn.textContent = "Please wait...";

    const payload = {
        email: emailInput.value.trim(),
        password: passwordInput.value
    };

    if (isSignup) {
        payload.name = nameInput.value.trim();
    }

    const endpoint = isSignup
        ? "/auth/signup"
        : "/auth/login";

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            showMessage(
                data.error || "Something went wrong.",
                "error"
            );
            return;
        }

        if (isSignup) {
            showMessage(
                "Account created! You can now log in.",
                "success"
            );

            authForm.reset();
            switchMode(false);
            showMessage(
                "Account created! You can now log in.",
                "success"
            );
        } else {
            authToken = data.token;

            authForm.classList.add("hidden");
            document.querySelector(".tabs").classList.add("hidden");
            document.querySelector(".subtitle").classList.add("hidden");

            document.getElementById("userName").textContent =
                data.user.name;

            document.getElementById("userEmail").textContent =
                data.user.email;

            dashboard.classList.remove("hidden");
        }
    } catch (error) {
        showMessage(
            "Could not connect to the server. Please try again.",
            "error"
        );
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = isSignup
            ? "Create Account"
            : "Login to Account";
    }
});

logoutBtn.addEventListener("click", () => {
    authToken = null;

    dashboard.classList.add("hidden");
    authForm.classList.remove("hidden");
    document.querySelector(".tabs").classList.remove("hidden");
    document.querySelector(".subtitle").classList.remove("hidden");

    authForm.reset();
    switchMode(false);
    showMessage("You have logged out successfully.", "success");
});
