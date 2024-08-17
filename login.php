<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Animatching";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Start the session
session_start();

// Get form data
$email = isset($_POST['email']) ? $_POST['email'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

if (empty($email) || empty($password)) {
    die("Email and password are required.");
}

// Retrieve user from database
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // User found, verify password
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        // Password correct, login successful
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['firstname'] = $user['firstname'];
        header("Location: main.php");
        exit();
    } else {
        // Incorrect password
        echo "Incorrect password.";
    }
} else {
    // User not found
    echo "User not found.";
}

$stmt->close();
$conn->close();
?>
