/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/**
 * DOM: Document Object Model
 * Structured representation of an HTML document (each element have an object and prototype in DOM)
 *
 * JS use DOM to interact with webpage.
 *
 * JS is a language. DOM is an object.
 *
 * DOM manipulation / interaction in JS
 *
 */

var scores, currentScore, activePlayer, dice;

scores = [0, 0];
currentScore = 0;
activePlayer = 0;

// dice = Math.floor(Math.random() * 6) + 1;
// floor - round downward to nearest integer
// random - number between 0-1.

// SETTER (set a value to HTML element)
// document.querySelector('#current-' + activePlayer).textContent = dice;
// .querySelector select only first found element of a given type.
// .textContent can only set plain text, without HTML.

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// .innerHTML can set text with HTML.

// GETTER (get a value from HTML element)
var x = document.querySelector('#current-1').textContent;

// We can change inline CSS styles:
// document.querySelector('.dice').style.display = 'none';


/**
 * MY SOLUTION:
 */

var changePlayer = () => {
  currentScore = 0;
  document.querySelector('#current-' + activePlayer).textContent = currentScore;
  document
    .querySelector('.player-' + activePlayer + '-panel')
    .classList.remove('active');
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document
    .querySelector('.player-' + activePlayer + '-panel')
    .classList.add('active');
};

var reset = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  document
    .querySelectorAll('.player-score')
    .forEach(score => (score.textContent = 0));
  document
    .querySelectorAll('.player-current-score')
    .forEach(score => (score.textContent = 0));
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').className = 'player-0-panel active';
  document.querySelector('.player-1-panel').className = 'player-1-panel';
};

document.querySelector('.btn-roll').addEventListener('click', () => {
  dice = Math.floor(Math.random() * 6) + 1;
  document.querySelector('.dice').src = 'dice-' + dice + '.png';

  if (dice === 1) {
    changePlayer();
  } else {
    currentScore += dice;
    document.querySelector(
      '#current-' + activePlayer
    ).textContent = currentScore;
  }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  scores[activePlayer] += currentScore;
  document.querySelector('#score-' + activePlayer).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
    document.querySelector('.player-' + activePlayer + '-panel').className =
      'player-' + activePlayer + '-panel winner';
  }
  changePlayer();
});

document.querySelector('.btn-new').addEventListener('click', () => {
  reset();
});
