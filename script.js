const currentScoreLabel1 = document.querySelector('#current--0');
const currentScoreLabel2 = document.querySelector('#current--1');
const btnRoll = document.querySelector('.btn--roll');
const btnReset = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const src = document.querySelector('.dice');
const scores1 = document.querySelector('#score--0');
const scores2 = document.querySelector('#score--1');

let score = [0, 0];
let currentScore = 0;
let currentPlayer = 0;
let playing = true;

function reset() {
  currentScoreLabel1.textContent = 0;
  currentScoreLabel2.textContent = 0;
  currentScore = 0;
  scores1.textContent = 0;
  scores2.textContent = 0;
  score = [0, 0];
  src.classList.add('hidden');
  playing = true;
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--winner', 'name');
  document.querySelector(`#name--${currentPlayer}`).textContent = `PLAYER ${
    currentPlayer + 1
  }`;
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  currentPlayer = 0;
}
reset();

function setCurrentScore() {
  return (document.getElementById(`current--${currentPlayer}`).textContent =
    currentScore);
}
function setScore() {
  return (document.getElementById(`score--${currentPlayer}`).textContent =
    score[currentPlayer]);
}

function switchPlayers() {
  document.querySelector(`.player--0`).classList.toggle('player--active');
  document.querySelector(`.player--1`).classList.toggle('player--active');
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  return;
}

const rollDice = () => {
  if (!playing) return;
  src.classList.remove('hidden');
  const dice = Math.trunc(Math.random() * 6) + 1;
  src.src = `dice-${dice}.png`;
  if (dice === 1) {
    switchPlayers();
    return;
  }
  currentScore += dice;
  setCurrentScore();
  return;
};

function winner() {
  if (score[currentPlayer] >= 100) {
    src.classList.add('hidden');
    playing = false;
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner', 'name');
    document.querySelector(`#name--${currentPlayer}`).textContent =
      'Congratulation You Win !!!!!';
    return;
  }
  switchPlayers();
  return;
}

function btnHoldScore() {
  if (playing) {
    score[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      score[currentPlayer];
    winner();
    return;
  }
}

btnHold.addEventListener('click', function () {
  btnHoldScore();
});

btnRoll.addEventListener('click', () => {
  rollDice();
});

btnReset.addEventListener('click', () => {
  reset();
});
