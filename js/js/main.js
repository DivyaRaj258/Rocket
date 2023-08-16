let countdownGame = null


class Game {
    constructor() {
        this.player = new Player();
        this.rocketArr = []; //will store instances of the class Rocket
        this.astroidArr = []; //will store instances of the class Obstacle
        this.score = 0;  // Initialize scoure
        //this.counter = 0; // initialize counter
      
    }

    start() {

        // Initiate sound
        const audioElement = new Audio('./css/sound.wav'); // Audio initialize
        audioElement.loop = true;
        audioElement.play();
        console.log (" AUDIO IS STARTED*************");
        
        // attach event listeners
        this.attachEventListeners();

        // Intialize score board
        this.newScoreBoard = new ScoreBoard();
        this.newScoreBoard.updateScore(this.score);

        // Intialize timer 
        this.newCounter = new CountDown();
        this.newCounter.startCountdown();

        // create Rocket
        setInterval(() => {
            const newRocket = new Rocket();
            this.rocketArr.push(newRocket);
        }, 3500);

        // create astroid
        setInterval(() => {
            const newAstroid = new Astroid();
            this.astroidArr.push(newAstroid);
        }, 2500);

        // move all Rockets
        setInterval(() => {
            this.rocketArr.forEach((rocketInstance) => {
                rocketInstance.moveDown(); // move
                this.removeRocketIfOutside(rocketInstance); // remove if outside
                this.detectCollision(rocketInstance);  // detect 100% collision

            });
        }, 75);

        // move astroid
        setInterval(() => {
            this.astroidArr.forEach((astroidInstance) => {
                astroidInstance.moveDown(); // move
                this.removeAstroidIfOutside(astroidInstance); // remove if outside
                this.detectCollisionAstroid(astroidInstance); // detect collision

            });
        }, 100);


    }

    attachEventListeners() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                this.player.moveLeft();
            } else if (event.key === "ArrowRight") {
                this.player.moveRight();
            }
        });
    }

    removeRocketIfOutside(rocketInstance) {
        if (rocketInstance.positionY < 0 - rocketInstance.height) {
            rocketInstance.domElement.remove(); //remove from the dom
            this.rocketArr.shift(); // remove from the array
        }
    }


    // New method for Astroid
    removeAstroidIfOutside(astroidInstance) {
        if (astroidInstance.positionY < 0 - astroidInstance.height) {
            astroidInstance.domElement.remove(); //remove from the dom
            this.astroidArr.shift(); // remove from the array
        }
    }


    detectCollision(rocketInstance) {
        if (
            // Modified Code
            this.player.positionX === rocketInstance.positionX &&
            this.player.positionY === rocketInstance.positionY &&
            this.player.width <=rocketInstance.width
            //this.player.height === RocketInstance.height
        ) {
            // Calling the update score board display
            this.score++
            this.newScoreBoard.updateScore(this.score);


            if (this.score === 3) {
                // Collision detected! Change to Success Landing
                console.log("The Eagle has Landed " + this.score);
                console.log(this.score);
                clearInterval(countdownGame)
                countdownGame = null
                // Collision detected! Change to Success Landing
                location.href = "gameoverWin.html";

            }


        }
    }

    detectCollisionAstroid(astroidInstance) {
        if (

            // Astroid Collision
            this.player.positionX < astroidInstance.positionX + astroidInstance.width &&
            this.player.positionX + this.player.width > astroidInstance.positionX &&
            this.player.positionY < astroidInstance.positionY + astroidInstance.height &&
            this.player.positionY + this.player.height > astroidInstance.positionY
        ) {
            // Collision detected! Change to Success Landing
            console.log("The Eagle has CRASHED ");
            location.href = "gameoverCrash.html";
        }

    }

       

}   // End Class Game



// Player Class 1
class Player {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.positionX = 50 - (this.width / 2);
        this.positionY = 0;
        this.domElement = null;

        this.createDomElement();
    }
    createDomElement() {
        // create dom element
        this.domElement = document.createElement("div");

        // Landing Platform Image code
        this.domElement = document.createElement('img');
        this.domElement.src = 'css/platform.png';
        this.domElement.style.width = this.width + 'px';
        this.domElement.style.height = this.height + 'px';
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = this.positionX + 'px';
        //


        // set id
        this.domElement.id = "player";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        //append to the dom
        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.domElement);
    }
    moveLeft() {
        this.positionX--;
        this.domElement.style.left = this.positionX + "vw";
    }
    moveRight() {
        this.positionX++;
        this.domElement.style.left = this.positionX + "vw";
    }
}
// Rocket Class 2
class Rocket {
    constructor() {

        this.width = 10;
        this.height = 20;
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and (100 - width)
        this.positionY = 100;
        this.domElement = null;
        this.createDomElement();
    }
    createDomElement() {
        // create dom element
        this.domElement = document.createElement("div");


        // Image Rocket code
        this.domElement = document.createElement('img');
        this.domElement.src = 'css/Rocket.png';
        this.domElement.style.width = this.width + 'px';
        this.domElement.style.height = this.height + 'px';
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = this.positionX + 'px';
        //

        // set id
        this.domElement.className = "obstacle";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        //append to the dom
        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.domElement);


    }
    moveDown() {
        this.positionY -= 2;
        this.domElement.style.bottom = this.positionY + "vh";
    }

}
// Score Board Class 3
class ScoreBoard {
    constructor() {

        this.domElement = null;
        this.scoreElement = null;
        this.createDomElement();
        let points = 0;
        let score1 = 0;
    }

    createDomElement() {
        // create dom element
        this.domElement = document.createElement("div");
        this.scoreElement = document.createElement("div");

    }

    // Update the Html
    updateScore(score1) {
        // Scoring

        this.scoreElement.innerText = 'SCORE = : ' + score1;
        console.log("Inside Update score***********   " + score1);
        this.scoreElement.className = "score";

        //append to the dom
        const parentElm = document.getElementById("score");
        parentElm.appendChild(this.domElement);

        // Append the score element to the parent element (assuming you have a "board" parent element)
        parentElm.appendChild(this.scoreElement);
        console.log("*&*&*&*&*& " + score1);

    }


}
// Astroid Class 4
class Astroid {
    constructor() {

        this.width = 10;
        this.height = 20;
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and (100 - width)
        this.positionY = 100;
        this.domElement = null;
        this.createDomElement();
    }
    createDomElement() {
        // create dom element
        this.domElement = document.createElement("div");

        // Image Rocket code
        this.domElement = document.createElement('img');
        this.domElement.src = 'css/Astroid1.png';
        this.domElement.style.width = this.width + 'px';
        this.domElement.style.height = this.height + 'px';
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = this.positionX + 'px';
        //

        // set id
        this.domElement.className = "astroid";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        //append to the dom
        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.domElement);
    }
    moveDown() {
        this.positionY -= 2;
        this.domElement.style.bottom = this.positionY + "vh";
    }
    /*
       moveDiagonal() {
           this.positionX -= 1;
           this.positionY -= 2;
           this.domElement.style.bottom = this.positionY + "vh";
           this.domElement.style.bottom = this.positionX + "vh";
       }
       */
}

// New Class CountDown 5
class CountDown {
    constructor() {
        this.remainingTime = 1000 * 60; // Initialize Timer
        this.domElement = null;
        this.createDomElement();
        this.startCountdown();
    }

    createDomElement() {
        this.domElement = document.createElement("div");
        const parentElm = document.getElementById("timer");
        parentElm.appendChild(this.domElement);
    }

    updateDomElement() {
        this.domElement.innerText = `Time Remaining: ${Math.ceil(this.remainingTime / 1000)} seconds`;
    }

    startCountdown() {
        this.updateDomElement();

        countdownGame = setInterval(() => {
            this.remainingTime -= 1000;
            this.updateDomElement();

            if (this.remainingTime <= 0) {
                clearInterval(countdownGame);
                location.href = "gameoverTime.html";
                //this.newButton.createRestartButton(); // Create the replay button 
                
                
            }
        }, 1000);
    }
}



/*
// Countdown functions
class CountDown {
    constructor() {
       
        this.domElement = null;
        //this.scoreElement = null;
        this.createDomElement();
        this.countDown();

        countdownGame = setTimeout(()=> 
        {
            location.href = "gameoverTime.html"
        }, 500 * 60);
    }

     createDomElement() {
        // create dom element
        this.domElement = document.createElement("div");
        //this.scoreElement = document.createElement("div");

                        
     }

     // Update the Html
     countDown()
     {
        //append to the dom
        const parentElm = document.getElementById("timer");
        parentElm.appendChild(this.domElement);

        // Append the time element to the parent element (assuming you have a "board" parent element)
        //parentElm.appendChild(this.countdownGame);
        console.log("COUNTDOWN 1**********--- " + countdownGame);
     }
 
    }  
 */
/*
function countdown() {
countdownGame = setTimeout(()=> 
{
location.href = "gameoverTime.html"
}, 1000 * 60);

 
}
*/
//function play(){
    //var audio = new Audio (/css/sound.wav)
    //audio.play();
//}

const game = new Game();
game.start();