const images = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg',
  'image4.jpg',
  'image5.jpg',
  'image6.jpg',
  'image7.jpg',
  'image8.jpg',
  'image1.jpg',
  'image2.jpg',
  'image3.jpg',
  'image4.jpg',
  'image5.jpg',
  'image6.jpg',
  'image7.jpg',
  'image8.jpg',
];

const gameContainer = document.getElementById('gameContainer');
const movesDisplay = document.getElementById('moves');
const resetBtn = document.getElementById('resetBtn');
let moves = 0;
let cardsFlipped = 0;
let firstCard, secondCard;
let lockBoard = false;

let startTime, timerInterval;

// Shuffle the images array
images.sort(() => 0.5 - Math.random());

// Create the game board with cards
function createGameBoard() {
  for (let i = 0; i < images.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<img class="hide" src="${images[i]}" alt="Card">`;
    card.addEventListener('click', flipCard);
    gameContainer.appendChild(card);
  }
}

// Flip the card on click
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.firstChild.classList.remove('hide');

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    checkForMatch();
  }
}

// Check if the flipped cards match
function checkForMatch() {
  moves++;
  movesDisplay.textContent = `Moves: ${moves}`;
  lockBoard = true;

  if (firstCard.firstChild.src === secondCard.firstChild.src) {
    cardsFlipped += 2;
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
  } else {
    setTimeout(() => {
      firstCard.firstChild.classList.add('hide');
      secondCard.firstChild.classList.add('hide');
      resetBoard();
    }, 1000);
  }
}

// Reset the board after each round
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;

  if (cardsFlipped === images.length) {
    clearInterval(timerInterval);
    const endTime = new Date();
    const totalTimeInSeconds = Math.floor((endTime - startTime) / 1000);
    setTimeout(() => {
      alert(`Congratulations! You won in ${moves} moves and ${totalTimeInSeconds} seconds.`);
      resetGame();
    }, 500);
  }
}

// Reset the game to play again
function resetGame() {
  gameContainer.innerHTML = '';
  moves = 0;
  movesDisplay.textContent = 'Moves: 0';
  cardsFlipped = 0;
  images.sort(() => 0.5 - Math.random());
  createGameBoard();
}

// Event listener for the reset button
resetBtn.addEventListener('click', () => {
  resetGame();
});

createGameBoard();

// Start the timer when the game starts
function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(updateTimer, 1000);
}

// Update the timer display
function updateTimer() {
  const currentTime = new Date();
  const totalTimeInSeconds = Math.floor((currentTime - startTime) / 1000);
  // You can display the timer wherever you want (e.g., on the page or in the console)
  console.log(`Time: ${totalTimeInSeconds} seconds`);
}

startTimer();
