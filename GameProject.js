//By: Jasper Bayani 100294720 CPSC-1045

// canvas handling
let game = document.getElementById("game"); 
let ctx = game.getContext("2d"); 

// start screen variables
let start = false, titleDown = true, titleRight = true, stopStartScreen = false; 
let titleX = 50, titleY = 100, mouseX = 0, mouseY = 0; 
let buttonColor = "#03002E"; 

// general game variables
let gameEnd = false; 
let textOpacity = 0; 
let gameRun = 0; 

// Bloop movement variables
let keepRight = false, keepLeft = false, keepFalling = true, jump = false, keepUpdating = true, lock = false; 
let count = 1, countG = 1; 
let s; 


// listeners for keys A, D and spacebar
document.addEventListener("keydown", updatePos, false); 
document.addEventListener("keyup", stopMove, false);
document.addEventListener("keydown", updateJump, false); 

// keeps track of user input mouse clicks
game.onclick = function(){
    mouseX = event.offsetX; 
    mouseY = event.offsetY; 
    checkStartBounds(); 
}

//checks bounds of start button
function checkStartBounds(){
    if((mouseX <= 350 && mouseX >= 250) && (mouseY <= 300 && mouseY>= 250) && !start){
        start = true; 
        levels[gameRun](); 
    }
}


// draws the actual start screen
function drawStartScreen(){
    
    ctx.fillStyle = "#03002E"; 
    ctx.fillRect(0, 0, game.width, game.height); 
    ctx.fillStyle = "white";
    ctx.font = "60px Comic Sans MS"; 
    ctx.fillText("Bloop Means Home", titleX, titleY); 
    ctx.strokeStyle = "lightblue"; 
    ctx.strokeText("Bloop Means Home", titleX, titleY);
    
    ctx.lineWidth = 3; 
    ctx.font = "35px Comic Sans MS"; 
    ctx.fillStyle = buttonColor; 
    ctx.fillRect(250, 250, 100, 50); 
    ctx.strokeStyle = "lightBlue";
    ctx.strokeRect(250, 250, 100, 50);
    ctx.fillStyle = "white";
    ctx.fillText("Start", 255, 290); 
    
    drawBloop();
    
}

// for the title picture of Bloop
function drawBloop(){
    ctx.beginPath(); 
    ctx.fillStyle = "lightblue"; 
    ctx.arc(750, 250, 150, 0, 2*Math.PI); 
    ctx.fill(); 
    ctx.strokeStyle = "darkblue"; 
    ctx.stroke(); 
    ctx.closePath(); 
    
    ctx.strokeStyle = "black"; 
    ctx.beginPath(); 
    ctx.arc(860, 165, 50, 0, 2*Math.PI); 
    ctx.fillStyle = "white"; 
    ctx.fill();
    ctx.stroke();
    ctx.closePath(); 
    ctx.beginPath(); 
    ctx.arc(800, 175, 50, 0, 2*Math.PI); 
    ctx.fill(); 
    ctx.stroke();
    
    ctx.fillStyle = "darkblue"; 
    ctx.beginPath(); 
    ctx.arc(830, 165, 15, 0, 2*Math.PI);
    ctx.fill(); 
    ctx.closePath(); 
    
    ctx.beginPath(); 
    ctx.arc(890, 150, 15, 0, 2*Math.PI); 
    ctx.fill(); 
    ctx.closePath();
    
    ctx.beginPath(); 
    ctx.fillStyle = "#908DDC"; 
    ctx.arc(665, 185, 20, 0, 2*Math.PI); 
    ctx.fill(); 
    ctx.closePath();
    
    ctx.beginPath(); 
    ctx.arc(630, 230, 10, 0, 2*Math.PI); 
    ctx.fill(); 
    ctx.closePath();
    
    ctx.beginPath(); 
    ctx.arc(660, 225, 5, 0, 2*Math.PI); 
    ctx.fill(); 
    ctx.closePath();
}



// player class is used to create Player/Bloop
class Player{
    
    constructor(x, y){
        this.respawnX = x; 
        this.respawnY = y; 
        this.x = x; 
        this.y = y; 
        this.radius = 25; 
        this.lives = 5; 
        this.gravity = 4; 
    }
    
    setX(value){
        this.x = value; 
    }
    
    setY(value){
        this.y = value; 
    }
    
    
    respawn(){
        this.x = this.respawnX; 
        this.y = this.respawnY; 
    }
    
    drawBloop(){
        ctx.lineWidth = 1; 
        
        //main body
        ctx.beginPath(); 
        ctx.fillStyle = "lightblue"; 
        ctx.arc(this.x, this.y, 25, 0, 2*Math.PI); 
        ctx.fill(); 
        ctx.strokeStyle = "darkblue"; 
        ctx.stroke(); 
        ctx.closePath(); 
        
        //eyeballs
        ctx.strokeStyle = "black"; 
        ctx.beginPath(); 
        ctx.arc(this.x + 18, this.y - 15, 8, 0, 2*Math.PI); 
        ctx.fillStyle = "white"; 
        ctx.fill();
        ctx.stroke();
        ctx.closePath(); 
        ctx.beginPath(); 
        ctx.arc(this.x + 8, this.y - 12, 8, 0, 2*Math.PI); 
        ctx.fill(); 
        ctx.stroke();
        
        //irises
        ctx.fillStyle = "darkblue"; 
        ctx.beginPath(); 
        ctx.arc(this.x + 12, this.y - 13, 2.5, 0, 2*Math.PI);
        ctx.fill(); 
        ctx.closePath(); 

        ctx.beginPath(); 
        ctx.arc(this.x + 22, this.y - 17, 2.5, 0, 2*Math.PI); 
        ctx.fill(); 
        ctx.closePath();

        ctx.beginPath(); 
        ctx.fillStyle = "#908DDC"; 
        ctx.arc(this.x - 13, this.y - 10, 3, 0, 2*Math.PI); 
        ctx.fill(); 
        ctx.closePath();

        ctx.beginPath(); 
        ctx.arc(this.x - 18, this.y - 3, 1.5, 0, 2*Math.PI); 
        ctx.fill(); 
        ctx.closePath();

        ctx.beginPath(); 
        ctx.arc(this.x - 13, this.y - 4, 1, 0, 2*Math.PI); 
        ctx.fill(); 
        ctx.closePath();
        
    }
}

// used to create the spikes
class Obstacle{
    
    constructor(x, y){
        this.x = x; 
        this.y = y;  
    }
    
    drawObstacle(){
        ctx.beginPath(); 
        ctx.fillStyle = "red"; 
        ctx.lineTo(this.x, this.y - 60);
        ctx.lineTo(this.x + 20,this.y - 20); 
        ctx.lineTo(this.x - 20, this.y - 20); 
        ctx.lineTo(this.x, this.y - 60); 
        ctx.fill(); 
    }
    
    calcDistFromPlayer(player){
        let d = Math.sqrt(Math.pow((player.x - this.x), 2) + Math.pow((player.y - this.y), 2)); 
        if(d <= player.radius + 25)
            return true;  
        return false; 
    }
    
}

// used to teleport the player to the next level/screen
class Portal{
    
    constructor(x, y){
        this.x = x; 
        this.y = y; 
    }
    
    drawPortal(){
        ctx.lineWidth = 10; 
        ctx.beginPath(); 
        ctx.strokeStyle = "white";
        ctx.arc(this.x, this.y, 25, 0, 2*Math.PI); 
        ctx.stroke();
    }
    
    calcDistFromPlayer(player){
        let d = Math.sqrt(Math.pow((player.x - this.x), 2) + Math.pow((player.y - this.y), 2)); 
        if(d <= player.radius + 30)
            return true;  
        return false; 
    }
}

// used for the player to be on top of something and collide with
class Platform{
    
    constructor(x, y, width, height, color){
        this.x = x; 
        this.y = y; 
        this.width = width; 
        this.height = height; 
        this.color = color; 
    }
    
    drawPlatform(){
        ctx.beginPath(); 
        ctx.fillStyle = this.color; 
        ctx.fillRect(this.x, this.y, this.width, this.height); 
    }
    
    checkCollisionRight(player){ 
        if((Math.abs(this.x - player.x) <= player.radius + 5) && player.y >= this.y + this.height/2) 
                return false; 

        return true; 
    }
    
    checkCollisionLeft(player){
        if(this.x > player.x - player.radius)
            return true; 
        
        if((Math.abs(this.x - player.x) <= player.radius + this.width + 5) && player.y >= this.y + this.height/2)
            return false;
        
        return true; 
    }
    
    checkCollisionTop(player){
        let thisTop = this.y; 
        let thisBot = this.y + this.height;
        let playerTop = player.y - player.radius;
        let playerBot = player.y + player.radius; 
        if(thisTop < playerBot && player.x >=  this.x && player.x <= this.x + this.width)
            return false; 
        
        return true; 
    }
    
}

// checks if the keys needed are released

function stopMove(e){
    switch(e.keyCode){
        case 37:
        case 65:
            keepLeft = false; 
            break; 
        case 39:
        case 68:
            keepRight = false;  
            break; 
    }
}

// checks if the jump keys are pressed
function updateJump(e){
    if(e.keyCode == 32 || e.keyCode == 87 || e.keyCode ==38){
        jump = true; 
        clearTimeout(s); 
        document.removeEventListener("keydown", updateJump, false); 
        //reset jump
        setTimeout(function(){document.addEventListener("keydown", updateJump, false);}, 900); 
    }
}

// checks and updates whether the Bloop should move to the left or to the right or should the game be paused
function updatePos(e){

    switch(e.keyCode){
        case 37:
        case 65:
            keepLeft = true; 
            break;
        case 39:
        case 68:
            keepRight = true; 
            break; 
        case 27: 
            //a way to pause the game
            keepUpdating = !keepUpdating;
            update(); 
            break; 
    }
    
}

// the main function to update everything on the canvas during gameplay is in action
function update(){
    if(!keepUpdating){
        return; 
    }
    
    setTimeout(function(){
        if(textOpacity <= 1)
            textOpacity += 0.005;
    }, 700);
    ctx.clearRect(0,0, 1000, 500); 
    updateBackground(); 
    updateText();
    if(bloop.lives == 0){
        deathScreen(); 
        return; 
    }
    
    if(portal.calcDistFromPlayer(bloop)){
        gameRun = gameRun + 1; 
        ctx.fillStyle = "black"; 
        ctx.fillRect(0, 0, 1000, 500); 
        levels[gameRun]();  
    }
    if(obstacles.length != 0){
        for(let i = 0; i < obstacles.length; i++){
            obstacles[i].drawObstacle(); 
        }
    }
    if(platforms.length != 0){
        for(let i = 0; i < platforms.length; i++){
            platforms[i].drawPlatform(); 
        }
    }
    portal.drawPortal();
    
    updatePlayer(); 
    
    if(keepUpdating)
        requestAnimationFrame(update); 
}

// updates and cleans the background
function updateBackground(){
    ctx.fillStyle = "black"; 
    ctx.fillRect(0, 0, 1000, 500); 
}

// updates the needed text for the story, it also makes the text fade-in
function updateText(){
    ctx.globalAlpha = textOpacity; 
    ctx.fillStyle = "white";
    ctx.font = "20px Comic Sans MS";
    let textSize = 1; 
    if(gameRun >= 10){
        textSize = 3;
        ctx.font = "60px Comic Sans MS";
    }
    for(let i = 0; i < str.length; i++){
        ctx.fillText(str[i], 100, (i*25*textSize) + 80); 
    }
    ctx.globalAlpha = 1; 
}

// starts the animation for the jump
function startJump(){
    bloop.setY(bloop.y - 25 * count); 
}

// updates all the values for the player object, Bloop
function updatePlayer(){
    if(platforms.length <= 1){
      for(let i = 0; i < platforms.length; i++){
            if(keepRight && bloop.x <= 972 && platforms[i].checkCollisionRight(bloop))
                bloop.setX(bloop.x + 8); 
            if(keepLeft && bloop.x >= 25 && platforms[i].checkCollisionLeft(bloop))
                bloop.setX(bloop.x - 8);
            if(bloop.y <= 400 && platforms[i].checkCollisionTop(bloop))
                bloop.setY(bloop.y + bloop.gravity*countG); 
        }
    }
    else{
        if(keepRight && bloop.x <= 972 && platforms[1].checkCollisionRight(bloop))
            bloop.setX(bloop.x + 8); 
        if(keepLeft && bloop.x >= 25 && platforms[1].checkCollisionLeft(bloop))
            bloop.setX(bloop.x - 8);
        if(bloop.y <= 400 && platforms[1].checkCollisionTop(bloop))
            bloop.setY(bloop.y + bloop.gravity*countG); 
    }
    
    //for jumping
    if(jump){
        lock = true; 
        startJump();
        if(count >= 0)
            count -= 0.05; 
        if(countG <= 2)
            countG += 0.1; 
        s = setTimeout(function(){
            jump = false; 
            countG = 1; 
            count = 1; 
        }, 300); 
        
    }
    
    // for collisions
    let checkObstacles = true; 
    if(obstacles.length != 0){
        for(let i = 0; i < obstacles.length && checkObstacles; i++){
            if(obstacles[i].calcDistFromPlayer(bloop)){
                bloop.lives--; 
                checkObstacles = false; 
                bloop.respawn();
            }
        }
    }
        
    bloop.drawBloop(); 
}

// creation of the different levels using an array of functions
var levels = [
    
    //level 1
    function (){
        bloop = new Player(100, 350); 
        platforms.length = 0; 
        platforms.push(new Platform(0, 425, 1000, 75, "white")); 
        obstacles.length = 0; 
        portal = new Portal(800, 350); 
        str.length = 0; 
        str.push("Bloop didn't quite remember anything. It seemed as if he just existed where he was out "); 
        str.push("of thin air. A faint glimpse of a memory burried inside him reminds his body that he "); 
        str.push("must eventually move forwar'D'."); 
        update(); 
        if(textOpacity > 0)
            textOpacity = 0; 
    },
    
    //level 2
    function (){
        bloop = new Player(50, 150); 
        platforms.length = 0; 
        platforms.push(new Platform(0, 425, 1000, 75, "white")); 
        platforms.push(new Platform(0, 200, 300, 225, "white")); 
        obstacles.length = 0; 
        portal = new Portal(800, 350); 
        str.length = 0; 
        str.push("Moving forward for what reason? Bloop didn't know. Nor did he NEED to know!"); 
        str.push("The rush of an adventure somehow excited him! Now... where would these");  
        str.push("white, circular portals take him next?"); 
        if(textOpacity > 0)
            textOpacity = 0; 
    }, 
    
    //level 3
    function (){
        bloop = new Player(100, 350); 
        platforms.length = 0; 
        platforms.push(new Platform(0, 425, 1000, 75, "white"));
        platforms.push(new Platform(500, 275, 100, 150, "white")); 
        obstacles.length = 0; 
        portal = new Portal(800, 350); 
        str.length = 0; 
        str.push("'An obstacle!' Bloop thought. He thought that there was no way around to get passed it."); 
        str.push("If only he had a lot more SPACE to get over it."); 
        str.push("Bloop wonders if there was a BAR he could press to get above it."); 
        if(textOpacity > 0)
            textOpacity = 0; 
    }, 
    
    //level 4
    function (){
        bloop = new Player(100, 350); 
        platforms.length = 0; 
        platforms.push(new Platform(0, 425, 1000, 75, "white"));
        obstacles.length = 0; 
        obstacles.push(new Obstacle(400, 450)); 
        portal = new Portal(800, 350); 
        str.length = 0; 
        str.push("That red spike looked like trouble. Should Bloop avoid it?"); 
        str.push("'Will it hurt me if I touch it?' Bloop thought. Do slimes get 'hurt'?"); 
        str.push("That was an existential question Bloop would rather not find out the answer to."); 
        str.push("Bloop was certain that slimes only had 5 lives. ")
        if(textOpacity > 0)
            textOpacity = 0; 
    },
    
    //level 5
    function (){
        bloop = new Player(100, 350); 
        platforms.length = 0; 
        platforms.push(new Platform(0, 425, 1000, 75, "white")); 
        platforms.push(new Platform(375, 375, 75, 75, "white" )); 
        obstacles.length = 0; 
        for(let i = 1; i <= 3; i++){
            obstacles.push(new Obstacle(250 + 30*i, 450)); 
        }
        for(let i = 1; i <= 3; i++){
            obstacles.push(new Obstacle(450 + 30* i, 450)); 
        }
        portal = new Portal(800, 350); 
        str.length = 0; 
        str.push("Bloop was befuddled that there were even more spikes."); 
        str.push("It was as if there was a diety plotting the slimeball's demise."); 
        str.push("But it was a mere setback. The adventure must go on!"); 
        if(textOpacity > 0)
            textOpacity = 0; 
    },
    
    //level 6
    function (){
        bloop = new Player(800, 350); 
        platforms.length = 0; 
        platforms.push(new Platform(0, 425, 1000, 75, "white"));
        obstacles.length = 0;  
        portal = new Portal(100, 350); 
        str.length = 0; 
        str.push("Or does it? ...");
        str.push("Well... this is a little bit awkward isn't it?"); 
        str.push("It looks exactly like where Bloop beg'A'n... But flipped?"); 
        if(textOpacity > 0)
            textOpacity = 0; 
    },
    
    //level 7
    function (){
        bloop = new Player(900, 75); 
        platforms.length = 0; 
        platforms.push(new Platform(0, 425, 1000, 75, "white"));
        platforms.push(new Platform(825, 125, 175, 75, "white"))
        obstacles.length = 0; 
        for(let i = 1; i <= 7; i++){
            obstacles.push(new Obstacle(100 + 110*i, 450)); 
        }
        portal = new Portal(100, 350); 
        str.length = 0; 
        str.push("Is Bloop going backwards now? Is he undoing all his work?"); 
        str.push("'But there are a lot of differences still' Bloop thought."); 
        str.push("He must still be moving forward? Right? Even though it was");
        str.push("a different direction at first. Progress is never linear.");
        if(textOpacity > 0)
            textOpacity = 0; 
    }, 
    
    //level 8
    function (){
        bloop = new Player(100, 75); 
        platforms.length = 0; 
        platforms.push(new Platform(0, 425, 1000, 75, "white"));
        platforms.push(new Platform(0, 125, 100, 75, "white"));
        obstacles.length = 0; 
        for(let i = 1; i <= 30; i++){
            obstacles.push(new Obstacle(10 + 30*i, 450)); 
        }
        portal = new Portal(700, 350); 
        str.length = 0; 
        str.push("Ah! Bloop is going right once more. But the direction doesn't really matter?"); 
        str.push("An adventure is always a leap of faith into the unknown.");
        if(textOpacity > 0)
            textOpacity = 0; 
    }, 
    
    //level 9
    function (){
        bloop = new Player(100, 350); 
        platforms.length = 0; 
        platforms.push(new Platform(0, 425, 1000, 75, "white"));
        platforms.push(new Platform(400, 350, 50, 25, "white")); 
        obstacles.length = 0; 
        for(let i = 0; i < 2; i++){
            obstacles.push(new Obstacle(300, 450 - 50*i)); 
        }
        for(let i = 0; i < 4; i++){
            obstacles.push(new Obstacle(300, 200 - 50*i));
        }
        for(let i = 0; i < 3; i++){
            obstacles.push(new Obstacle(500, 450 - 50*i)); 
        }
        for(let i = 0; i < 2; i++){
            obstacles.push(new Obstacle(500, 100 - 50*i)); 
        }
        obstacles.push(new Obstacle(750, 450));
        portal = new Portal(800, 250); 
        str.length = 0;
        for(let i = 0; i < 6; i++){
            str.push("");
        }
        str.push("'These obstacles have gotten tougher' Bloop thought. But Bloop urges to");
        str.push("keep moving for the sake of a forgotten promise kept deep inside him.");
        if(textOpacity > 0)
            textOpacity = 0; 
    },
    
    //level 10
    function (){
        bloop = new Player(100, 350); 
        platforms.length = 0; 
        platforms.push(new Platform(0, 425, 1000, 75, "white"));
        obstacles.length = 0; 
        portal = new Portal(800, 350); 
        str.length = 0; 
        str.push("Bloop somehow returns to where he began as if nothing had changed."); 
        str.push("But Bloop felt a little different amidst his delirium of adventure."); 
        str.push("He remembered a bit of his past. Bloop can't believe that he almost forgot about it...");
        str.push("The fact that no matter how far he goes or how the adventure may shake him...");
        str.push("He must never forget...");
        if(textOpacity > 0)
            textOpacity = 0; 
    },
    
    // level 11 or victory end screen
    function (){
        bloop = new Player(500, 250); 
        platforms.length = 0; 
        platforms.push(new Platform(0, 425, 1000, 75, "white"));
        obstacles.length = 0; 
        portal = new Portal(850, 350); 
        str.length = 0; 
        str.push("That Bloop Means Home"); 
        str.push("And the adventure continues..."); 
        str.push(""); 
        str.push("THANKS FOR PLAYING!"); 
        if(textOpacity > 0)
            textOpacity = 0; 
        
    },
    
    // loops back to level one to keep "continuing" the adventure, but this time, time moves faster, so it's a little more challenging
    function (){
        gameRun = -1; 
        bloop.lives = 5; 
        loadGameLoop(); 
    }
    
]

// a function for when Bloop dies/ loses 5 of his lives
function deathScreen(){
    ctx.clearRect(0, 0, 1000, 500); 
    ctx.fillStyle = "black"; 
    ctx.fillRect(0, 0, 1000, 500); 
    ctx.fillStyle = "red";
    ctx.font = "50px Comic Sans MS"; 
    ctx.fillText("Bloop Has Died.", titleX, titleY) 
    ctx.fillText("Please reload the page to continue.", titleX, titleY + 80);
}

// initiates the game loop
function loadGameLoop(){ 
    drawStartScreen();
}

// Some global variables to be used for the game logic
let bloop = new Player(0, 0); 
let platforms = []; 
platforms.length = 0; 
let portal = new Portal(800, 350); 
let obstacles = []; 
let str = []; 

// starts the game
loadGameLoop(); 




