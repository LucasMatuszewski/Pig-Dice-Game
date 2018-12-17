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

var scores, goal, roundScore, activePlayer, prevDices;

// STATE VARIABLE - a state of our app. Is a game active? (without initial state)
var gamePlaying;

init();

document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gamePlaying) {
    // 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    // floor - round downward to nearest integer
    // random - number between 0-1.

    // 2. Display the result
    var diceDOM = document.getElementById("dice1");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    var dice2DOM = document.getElementById("dice2");
    dice2DOM.style.display = "block";
    dice2DOM.src = "dice-" + dice2 + ".png";

    var dices = dice + dice2;

    // CHALLENGE: nextPlayer if two times 6 points in a row.
    console.log('dices', dices, 'prevDices', prevDices);
    if (prevDices === 6 && dices === 6) {
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
      nextPlayer();
      
    // 3. Update the round score IF the rolled number was NOT a 1
    } else if (dice !== 1 && dice2 !== 1) {
      // Ad Score
      roundScore += dices;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
      prevDices = dices;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // Check a GOAL (scores to win a game)
    goal = document.getElementById('scores').value;
    console.log('goal:', goal);
    
    // Check if player won the game
    if (scores[activePlayer] >= goal) {
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document.getElementById("name-" + activePlayer).textContent = "Winner!";
      document.getElementById("dice1").style.display = "none";
      document.getElementById("dice2").style.display = "none";
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

// we don't use anonymous callback function. We provide a name of function to use (without invoking it)
document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer() {
  // Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  prevDices = undefined;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // document.getElementById("dice1").style.display = "none";
}

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  prevDices = undefined;

  // Check a GOAL (scores to win a game)
  goal = document.getElementById('scores').value;
  console.log('goal:', goal);

  // We can change inline CSS styles:
  document.getElementById("dice1").style.display = "none";
  document.getElementById("dice2").style.display = "none";

  // getElementById is little faster then querySelector:
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active"); // to don't make duplicate
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

// SETTER (set a value to HTML element)
// document.querySelector('#current-' + activePlayer).textContent = dice;
// .querySelector select only first found element of a given type.
// .textContent can only set plain text, without HTML.

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// .innerHTML can set text with HTML.

// GETTER (get a value from HTML element)
// var x = document.querySelector('#current-1').textContent;
