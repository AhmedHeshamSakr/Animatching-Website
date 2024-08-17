const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let clicks = 0;

document.querySelector(".clicks").textContent = clicks;

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const boxId = urlParams.get('boxId');

    // Display the boxId for debugging purposes (if needed)
    const debugElement = document.createElement('div');
    debugElement.classList.add('debug');
    debugElement.textContent = `Received Box ID: ${boxId}`;
    document.body.appendChild(debugElement);

    // Set the background image and related properties
    const body = document.querySelector('body');
    body.style.backgroundImage = `url("http://localhost/Animatching/img/${boxId}/${boxId}.jpg")`;
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundPosition = 'center';
    body.style.backgroundSize = 'cover';

    // Add background music
    const audio = document.getElementById('background-music');
    audio.src = `http://localhost/Animatching/music/${boxId}.mp3`;
    audio.play().catch(error => {
        console.log('Auto-play was prevented:', error);
    });

    // Add sound icon control
    const muteButton = document.getElementById('mute-button');
    muteButton.classList.add('sound-on');

    const updateButtonIcon = () => {
        if (audio.muted) {
            muteButton.classList.remove('sound-on');
            muteButton.classList.add('sound-off');
        } else {
            muteButton.classList.remove('sound-off');
            muteButton.classList.add('sound-on');
        }
    };

    muteButton.addEventListener('click', () => {
        audio.muted = !audio.muted;
        updateButtonIcon();
    });

    updateButtonIcon(); // Initialize button state

    // Fetch JSON based on boxId (similar to previous logic)
    fetch(`http://localhost/Animatching/data/${boxId}.json`)
        .then((res) => res.json())
        .then((data) => {
            cards = [...data, ...data];
            shuffleCards();
            generateCards();
        });
};

// Shuffle cards
function shuffleCards() {
    let currentIndex = cards.length, randomIndex, temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}

// Generate cards in the DOM
function generateCards() {
    gridContainer.innerHTML = ''; // Clear any existing cards
    for (let card of cards) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", card.name);
        cardElement.innerHTML = `
          <div class="front">
            <img class="front-image" src=${card.image} />
          </div>
          <div class="back"></div>
        `;
        gridContainer.appendChild(cardElement);
        cardElement.addEventListener("click", flipCard);
    }
}

// Handle card flip
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add("flipped");

    clicks++;
    document.querySelector(".clicks").textContent = clicks;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

// Check if the cards match
function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;
    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }

    if (clicks > 50) {
        displayFalseMessage();
    }
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    setTimeout(() => {
        firstCard.classList.add("hidden");
        secondCard.classList.add("hidden");
        resetBoard();
        setTimeout(checkGameEnd, 500); // Ensure the game end check happens after the hide animation
    }, 850);
}

// Unflip unmatched cards
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
}

// Reset board state
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Check if the game has ended
function checkGameEnd() {
    const matchedPairs = document.querySelectorAll(".card.hidden").length / 2;
    const totalPairs = cards.length / 2;
    if (matchedPairs === totalPairs) {
        endGame(clicks);
    }
}

function endGame(clicks) {
    lockBoard = true;
    // Create reset button
    const resetButton = document.createElement("button");
    resetButton.textContent = "YOU WIN! Play Again";
    resetButton.classList.add("reset-button");

    // Add event listener to reset button
    resetButton.addEventListener("click", () => {
        document.body.removeChild(resetButton);
        removeLoseButton();
        restart();
    });

    // Append reset button to the body
    document.body.appendChild(resetButton);
}

// Restart the game
function restart() {
    resetBoard();
    shuffleCards();
    clicks = 0;
    document.querySelector(".clicks").textContent = clicks;
    gridContainer.innerHTML = "";
    generateCards();

    // Remove lose message if it exists
    const loseMessage = document.querySelector(".lose-message");
    if (loseMessage) {
        document.body.removeChild(loseMessage);
    }

    // Remove lose button if it exists
    const loseButton = document.querySelector(".lose-button");
    if (loseButton) {
        document.body.removeChild(loseButton);
    }

    // Remove win button if it exists
    const resetButton = document.querySelector(".reset-button");
    if (resetButton) {
        document.body.removeChild(resetButton);
    }

    lockBoard = false;
}

function displayFalseMessage() {
    lockBoard = true; // Prevent any further card interaction

    // Create lose button
    const loseButton = document.createElement("button");
    loseButton.textContent = "YOU LOSE";
    loseButton.classList.add("lose-button", "reset-button");

    // Append lose button to the body
    document.body.appendChild(loseButton);
}

function removeResetButton() {
    const resetButton = document.querySelector(".reset-button");
    if (resetButton) {
        document.body.removeChild(resetButton);
    }
}

function removeLoseButton() {
    const loseButton = document.querySelector(".lose-button");
    if (loseButton) {
        document.body.removeChild(loseButton);
    }
}
