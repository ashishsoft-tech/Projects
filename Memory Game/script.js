const cards = document.querySelectorAll(".card");
const restartBtn = document.getElementById("restart");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Flip cards
cards.forEach(card => {
card.addEventListener("click", flipCard);
});

// Flip function
function flipCard() {

if (lockBoard) return;
if (this === firstCard) return;

this.classList.add("flip");

if (!firstCard) {
firstCard = this;
return;
}

secondCard = this;

checkMatch();
}

// Check match
function checkMatch() {

let firstValue =
firstCard.querySelector(".card-front").textContent;

let secondValue =
secondCard.querySelector(".card-front").textContent;

if (firstValue === secondValue) {
matchedPairs++;
disableCards();
checkWin();
} else {
unflipCards();
}

}

// Disable matched cards
function disableCards() {
firstCard.removeEventListener("click", flipCard);
secondCard.removeEventListener("click", flipCard);

resetBoard();
}

// Unflip if not match
function unflipCards() {

lockBoard = true;

setTimeout(() => {
firstCard.classList.remove("flip");
secondCard.classList.remove("flip");

resetBoard();

}, 800);
}

// Reset board
function resetBoard() {
[firstCard, secondCard, lockBoard] = [null, null, false];
}

// WIN CONDITION
function checkWin() {
if (matchedPairs === cards.length / 2) {
setTimeout(() => {
alert("🎉 You Won the Game!");
}, 300);
}
}

// SHUFFLE CARDS
function shuffleCards() {

cards.forEach(card => {
let randomPos = Math.floor(Math.random() * 12);
card.style.order = randomPos;
});

}

// RESTART GAME
restartBtn.addEventListener("click", restartGame);

function restartGame() {

cards.forEach(card => {
card.classList.remove("flip");
card.addEventListener("click", flipCard);
});

matchedPairs = 0;
resetBoard();
shuffleCards();

}

// Shuffle on load
shuffleCards();