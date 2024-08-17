<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Animatching</title>
    <link rel="icon" href="img/jjk logo.png" type="image/x-icon"/>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <?php include 'navbar.php'; ?>
    <h1>Card Matching Game</h1>
    <div class="grid-container"></div>
    <p>Moves: <span class="clicks">0</span></p>
    <div class="actions">
        <button onclick="restart()">Reset</button>
    </div>

    <!-- Audio Player -->
    <audio id="background-music" loop>
        <source src="" type="audio/mpeg">
    </audio>
    <div class="audio-controls">
        <button id="mute-button" class="sound-on"></button>
    </div>

    <div class="celebration"></div>
    <div class="end-message"></div>

    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
    <script src="game.js"></script>
</body>
</html>
