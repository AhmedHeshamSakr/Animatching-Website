<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Animatching</title>
    <link rel="stylesheet" href="main.css">
    <link rel="icon" href="http://localhost/Animatching/img/jjk logo.png" type="image/x-icon" />
</head>
<body>
    <?php include 'navbar.php'; ?>
    <div class="background"></div>
    <div class="slider">
        <button class="nav prev">&#10094;</button>
        <div class="slides" id="slides-container">
            <!-- Slides will be inserted here by JavaScript -->
        </div>
        <button class="nav next">&#10095;</button>
    </div>
    <section class="section" id="section1">
        <h2>Card Matching Games</h2>
        <div class="section-content">
            <a href="game.php?boxId=jjk" class="box" style="background-image: url('img/jjk/Box1.jpg');">
                <span class="box-name">Jujutsu Kaisen</span>
            </a>
            <a href="game.php?boxId=bsd" class="box" style="background-image: url('img/bsd/Box22.jpg');">
                <span class="box-name">Bungo Stray Dogs</span>
            </a>
            <a href="game.php?boxId=haikyuu" class="box" style="background-image: url('img/haikyuu/Box3.jpg');">
                <span class="box-name">Haikyuu!!</span>
            </a>
        </div>
        <div class="section-content">
            <a href="game.php?boxId=hxh" class="box" style="background-image: url('img/hxh/Box4.jpg');">
                <span class="box-name">Hunter x Hunter</span>
            </a>
            <a href="game.php?boxId=op" class="box" style="background-image: url('img/op/Box5.jpg');">
                <span class="box-name">One Piece</span>
            </a>
            <a href="game.php?boxId=naruto" class="box" style="background-image: url('img/naruto/Box6.jpg');">
                <span class="box-name">Naruto</span>
            </a>
        </div>
    </section>
    <!-- Audio Player -->
    <audio id="background-music" loop>
        <source src="http://localhost/Animatching/music/main.mp3" type="audio/mpeg">
        <source src="http://localhost/Animatching/music/main.ogg" type="audio/ogg">

    </audio>
    <div class="audio-controls">
        <button id="mute-button" class="sound-on"></button>
    </div>

    <div class="grid-container"></div>
    <p>Clicks: <span class="clicks">0</span></p>

    <script src="main.js"></script>
    <script>
        // Automatically play the music when the page loads
        window.addEventListener('load', () => {
            const audio = document.getElementById('background-music');
            const muteButton = document.getElementById('mute-button');

            const updateButtonIcon = () => {
                if (audio.muted) {
                    muteButton.classList.remove('sound-on');
                    muteButton.classList.add('sound-off');
                } else {
                    muteButton.classList.remove('sound-off');
                    muteButton.classList.add('sound-on');
                }
            };

            const tryToPlay = () => {
                audio.play().catch(error => {
                    console.log('Auto-play was prevented:', error);
                    document.body.addEventListener('click', () => {
                        audio.play();
                    }, { once: true });
                });
            };

            tryToPlay();

            muteButton.addEventListener('click', () => {
                audio.muted = !audio.muted;
                updateButtonIcon();
            });

            updateButtonIcon(); // Initialize button state
        });
    </script>
</body>
</html>
