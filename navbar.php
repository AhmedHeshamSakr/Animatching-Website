
<?php
session_start();
if (!isset($_SESSION['firstname'])) {
    header("Location: index.html");
    exit();
}
$firstname = $_SESSION['firstname'];
?>
<link rel="stylesheet" href="main.css">
<nav class="navbar">
    <div class="nav-brand">Animatching</div>
    <ul class="nav-links">
        <li><a href="main.php">Home</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">About</a></li>
    </ul>
    <div class="nav-user">
        <span class="username"><?php echo htmlspecialchars($firstname); ?></span>
        
        <a href="logout.php" class="logout-link">Logout</a>
    </div>
</nav>