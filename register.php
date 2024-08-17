<?php
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

// Get form data
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password

// Check if email already exists
$sql = "SELECT id FROM users WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "Email already registered!";
} else {
    // Insert data into database
    $sql = "INSERT INTO users (firstname, lastname, email, password) VALUES ('$firstname', '$lastname', '$email', '$password')";
    if ($conn->query($sql) === TRUE) {
        echo "Registration successful!";
        header("Location: index.html");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
// Handle logout
if (isset($_GET['action']) && $_GET['action'] == 'logout') {
    session_destroy();
    header("Location: index.html");
    exit();
}

// Extract the user's first name
$userFirstName = "Current User";
if (isset($_SESSION['firstname'])) {
    $userFirstName = $_SESSION['firstname'];
}


$conn->close();
?>
