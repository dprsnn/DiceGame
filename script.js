'use strict';

const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let score0 = document.getElementById('score--0');
let score1 = document.getElementById('score--1');

const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

const diceEl = document.querySelector('.dice');
diceEl.classList.add('hidden');

score0.textContent = score1.textContent = 0;
let currentPlayer = 0;
let currentScore = 0;

let playing = true;

// user rolls dice
rollBtn.addEventListener('click', function () {
  if (!playing) return;

  const diceNumber = Math.trunc(Math.random() * 6) + 1;

  // display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `img/dice-${diceNumber}.png`;

  currentScore = Number(
    document.getElementById(`current--` + currentPlayer).textContent
  );

  if (diceNumber !== 1) {
    // calculate current score
    currentScore += diceNumber;
    document.getElementById('current--' + currentPlayer).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

// user holds the result
holdBtn.addEventListener('click', function () {
  if (!playing) return;

  if (currentPlayer === 0) {
    score0.textContent = Number(score0.textContent) + currentScore;
    checkWinner(score0.textContent);
    switchPlayer();
  } else {
    score1.textContent = Number(score1.textContent) + currentScore;
    checkWinner(score1.textContent);
    switchPlayer();
  }
});

//user start new game

newGameBtn.addEventListener('click', function () {
  location.reload();
});

// switching players
function switchPlayer() {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  currentScore = 0;
}

// check winner
function checkWinner(scorePlayer) {
  if (scorePlayer >= 100) {
    console.log('+++');
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');
    playing = false;
  }
}
