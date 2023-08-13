class Game {
    constructor() {
        this.player = new Player();
        this.obstaclesArr = []; //will store instances of the class Obstacle
    }
    start() {

        // attach event listeners
        this.attachEventListeners();

        // create obstacles
        setInterval(() => {
            const newObstacle = new Obstacle();
            this.obstaclesArr.push(newObstacle);
        }, 3000);

        // move all obstacles
        setInterval(() => {
            this.obstaclesArr.forEach((obstacleInstance) => {
                obstacleInstance.moveDown(); // move
                this.removeObstacleIfOutside(obstacleInstance); // remove if outside
                this.detectCollision(obstacleInstance); // detect collision

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
    removeObstacleIfOutside(obstacleInstance){
        if (obstacleInstance.positionY < 0 - obstacleInstance.height) {
            obstacleInstance.domElement.remove(); //remove from the dom
            this.obstaclesArr.shift(); // remove from the array
        }
    }
    detectCollision(obstacleInstance)
    {
        if (
            
           /*
            this.player.positionX === obstacleInstance.positionX + obstacleInstance.width &&
            this.player.positionX + this.player.width > obstacleInstance.positionX &&
            this.player.positionY === obstacleInstance.positionY + obstacleInstance.height &&
            this.player.positionY + this.player.height > obstacleInstance.positionY
            */
            
            // Modified Code
            this.player.positionX === obstacleInstance.positionX &&
            this.player.positionY === obstacleInstance.positionY &&
            this.player.width === obstacleInstance.width
            //this.player.height === obstacleInstance.height
        
                       
        ) 
         
        {
            // Collision detected! Change to Success Landing
            console.log("The Eagle has Crashed ");
            location.href = "gameover.html";
        }
    }
}


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


class Obstacle {
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


const game = new Game();
game.start();