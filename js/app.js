var game = {
    minSpeed: 100,
    maxSpeed: 600,
    score: document.getElementById("score"),
    playerScore: Number(this.score.textContent),
    firstTry: document.getElementById("first-try"),
    secondTry: document.getElementById("second-try"),
    thirdTry: document.getElementById("third-try"),
    lastTry: document.getElementById("last-try"),
    numOfTries: 4,
    playButton: document.getElementById("play-again"),
    gameResult: document.getElementById("result"),
    gameMessage: document.getElementById("message-result"),
    resultIcon: document.getElementById("result-icon")
};
// Enemies our player must avoid
var Enemy = function (x, y) {
    "use strict";
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
    this.x = x;
    this.y = y;
    //random speed method
    this.RandomSpeed = function (min, max) {
        min = game.minSpeed;
        max = game.maxSpeed;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    //each enemy has random speed between min & max
    this.speed = this.RandomSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    "use strict";
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 505) {
    //if the enemy arrive to the end of canvas >> start a new track
        this.x = -101;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    "use strict";
    this.sprite = "images/char-boy.png";
    this.x = x;
    this.y = y;
    this.goToStart = function () {
        //go to start position
        this.x = 200;
        this.y = 410;
    };
    //keep track of the score
    this.IncreaseScore = function () {
        game.playerScore += 1;
        game.score.innerHTML = game.playerScore;
    };
};
Player.prototype.update = function () {
    "use strict";
    for (var i = 0, len = allEnemies.length; i < len; i++) {
    //the acual width of each enemy is 101 but to make the moves more easier i made it 75
    if (
      this.x < allEnemies[i].x + 75 &&
      this.x + 68 > allEnemies[i].x &&
      this.y < allEnemies[i].y + 70 &&
      this.y + 70 > allEnemies[i].y
    ) {
      this.goToStart(); //when collisions happen go to start
      game.numOfTries -= 1;
      console.log(game.numOfTries);
    }
    }
    //player status
    (function checkPlayer() {
    if (game.numOfTries === 3) {
      game.firstTry.style.transform = "translatey(-100px)";
    }
    if (game.numOfTries === 2) {
      game.secondTry.style.transform = "translatey(-100px)";
    }
    if (game.numOfTries === 1) {
      game.thirdTry.style.transform = "translatey(-100px)";
    }
    if (game.numOfTries === 0) {
      game.lastTry.style.transform = "translatey(-100px)";
    }
    //check if the player win the game
    if (game.numOfTries != 0 && game.playerScore === 10) {
      game.gameResult.style.transform = "scale(1)";
      game.resultIcon.style.transform = "scale(1.5)";
      game.gameMessage.innerHTML = "Congrates! You Won &#40;:";
    }
    //check if the player lose the game
    if (game.numOfTries === 0 && game.playerScore < 10) {
      game.gameResult.style.transform = "scale(1)";
      game.resultIcon.className = "fa fa-exclamation-circle";
      game.resultIcon.style.color = "#FFD83B";
      game.resultIcon.style.transform = "scale(1.5)";
      game.gameMessage.innerHTML = "you are close ! try again..";
      game.playButton.innerHTML = "Try Again!";
    }
    })();
};

Player.prototype.render = function() {
  "use strict";
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  switch (key) {
    case "right":
      if (this.x < 400) {
        this.x += 101;
      }
      break;
    case "left":
      if (this.x > 0) {
        this.x -= 100;
      }
      break;
    case "down":
      if (this.y < 400) {
        this.y += 85;
      }
      break;
    case "up":
      if (this.y > 0) {
        this.y -= 85;
      }
      break;
  }
  if (this.y <= 0) {
    this.goToStart();
    this.IncreaseScore();
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(0, 60), new Enemy(0, 145), new Enemy(0, 230)];

// Place the player object in a variable called player
var player = new Player(200, 410);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  "use strict";
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
//play again function
game.playButton.addEventListener("click", function() {
  location.reload();
});