// Enemies our player must avoid
var Enemy = function(sideways,updown) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    //Added the roach x&y locations and assigned them values so that they would be on the page and in the correct starting positions.
    //Used the 'this' keyword, based on the Enemy render method that was included, to assign the values passed to the method to values assigned to each instance of the method.
    this.sprite = 'images/enemy-bug.png';
    this.x=sideways;
    this.y=updown;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Used an if statement to set the roaches horizontal movement across the x axis so long as they are not off the edge of the canvas.
    // Used an else statement to reset the roaches after they have reached the edge of the frame, so that they don't continue indefinately.
    // This method was chosen based on the fact that there was only one variable, the position on the x-axis, that was important for the roaches to be able to move. Once it was off the edge of the canvas, it would then be reset by the else statement, to be ready to cross again.
        if (this.x<820) { this.x+=(200*dt); }
        else {this.x=-140;}
    }

// Draw the enemy on the screen, required method for game
    Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite),
            this.x,
            this.y);
    }

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Created the Player class, modeled on the Enemy class.

var Player = function(sideways,updown) {
    this.sprite='images/char-boy.png';
    this.x=sideways;
    this.y=updown;
};
// Created the update method, based on a 2d collision detection code from Mozilla's developer guide, to test if the player has had a collision with one of the enemies. The if statement was the one used in that structure, and was the best solution to use given that it would only run if there were a collision.
// Used the for loop because it would continue to run while there were still instances of the roach stored in the array, meaning that every roach would be used when checking for collisions.
// The array was used to keep track of the individual enemies and manage the collisions with the player.
// The second if statement in the update method was used to reset the player should they reach the water. A while loop could have worked by checking that the player was still below the water row, but seemed to be a waste of resources, when an if statement would accomplish the same thing.

    Player.prototype.update = function() {
        for (var roach in allEnemies) {
            if( allEnemies[roach].x < this.x +10 &&
                allEnemies[roach].x + 50 > this.x + 15&&
                allEnemies[roach].y === this.y)
                {player.reset();}
        };
        if(this.y === -10){player.reset();}
    };
//Used the Enemy.prototype.render method that was provided to render the player on the convas, just renaming it to support the Player class.

    Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite),
            this.x,
            this.y);
    }

// The reset method was set up to place the player in the middle of the first row of grass on the canvas, using the this keyword to set the correct position. It was also modeled on the Enemy.prototype.render method, just removing the rendering from that function, while maintaining the this structure., assigning them values. Additionally, should at some point a second instance of the Player be created, each would be able to take in different values.
    Player.prototype.reset = function() {
        this.x = 200;
        this.y = 390;
    };
// Set up the amount of movement the player will make with each press of the key, allowing for finer control of the player on the canvas.
    Player.prototype.handleInput = function (input) {
        if (input == "up" && this.y >25) {this.y = this.y - 40;}
        if (input == "down" && this.y < 350) {this.y = this.y + 40;}
        if (input == "left" && this.x > 0) {this.x = this.x -50;}
        if (input == "right" && this.x < 400) {this.x = this.x +50}
    };
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Created each roach as a new instance ot the Enemy class, assigning it a specific starting position. The new keyword allows each roach to have all the properties of the Enemy class without having to recode it all again.
var roach1 = new Enemy (-450, 230);
var roach2 = new Enemy (-280, 150);
var roach3 = new Enemy (-130, 70);
var roach4 = new Enemy (-400, 70);

// The allEnemies array contains each roach in a single variable to allow the game to process each in sequence and handle all the various movements and collision checks that each needs to make.
var allEnemies = [
    roach1,
    roach2,
    roach3,
    roach4
];

// Establishes the player as a new instance of the PLayer class and passes in the starting position
var player = new Player (200, 390);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
