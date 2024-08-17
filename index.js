// Function to toggle responsive navigation menu
function myMenuFunction() {
    var i = document.getElementById("navMenu");
    if (i.className === "nav-menu") {
        i.className += " responsive";
    } else {
        i.className = "nav-menu";
    }
}

// Function to switch to login form
function login() {
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    var a = document.getElementById("loginBtn");
    var b = document.getElementById("registerBtn");

    x.style.left = "4px";
    y.style.right = "-520px";
    a.className += " white-btn";
    b.className = "btn";
    x.style.opacity = 1;
    y.style.opacity = 0;
}

// Function to switch to registration form
function register() {
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    var a = document.getElementById("loginBtn");
    var b = document.getElementById("registerBtn");

    x.style.left = "-510px";
    y.style.right = "5px";
    a.className = "btn";
    b.className += " white-btn";
    x.style.opacity = 0;
    y.style.opacity = 1;
}

// Simulated user database
let users = [];

// Function to save user data to local storage
function saveUserToStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

// Function to retrieve user data from local storage
function getUserFromStorage() {
    return JSON.parse(localStorage.getItem('user'));
}

// Function to register a new user
function registerUser(firstName, lastName, email, password) {
    if (!email || !password) {
        alert('Email and password are required fields');
        return;
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert('Email is already registered');
        return;
    }

    const newUser = {
        firstName,
        lastName,
        email,
        password
    };

    users.push(newUser);
    saveUserToStorage(newUser);
    alert('Registration successful');
}

// Function to simulate login
function loginUser(email, password, rememberMe) {
    if (!email || !password) {
        alert('Email and password are required fields');
        return;
    }

    const user = users.find(user => user.email === email);

    if (user && user.password === password) {
        if (rememberMe) {
            saveUserToStorage(user);
        }
        alert('Login successful');
    } else {
        alert('Invalid email or password');
    }
}

// Function to simulate password reset
function resetPassword(email) {
    if (!email) {
        alert('Email is required');
        return;
    }

    const user = users.find(user => user.email === email);

    if (user) {
        const resetToken = Math.random().toString(36).substr(2);
        // Simulated sending reset link via email
        alert(`Password reset link sent to ${email}`);
    } else {
        alert('No user found with this email');
    }
}
