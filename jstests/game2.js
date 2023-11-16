let canvas;
let context2D;
let DIRECTION = {
    IDLE: 0,
    DOWN: 100,
    LEFT: 2,
    RIGHT: 3,
    UP: 4
};
let direction;

let gameOver;

let questionCount = 0;
let questionCountReset = 0;
let currentQuestion;
let currentAnswers;
const questions = [
    {
        x: 150, y: 10, width: 50, height: 50, question: "HTTP", answer: "Port 80",
        answers: [
            { x: 4, y: 320, width: 50, height: 50, answer: "Port 110" },
            { x: 100, y: 320, width: 50, height: 50, answer: "Port 25" },
            { x: 200, y: 320, width: 50, height: 50, answer: "Port 443" },
            { x: 298, y: 320, width: 50, height: 50, answer: "Port 80" }
        ]
    },
    {
        x: 150, y: 10, width: 50, height: 50, question: "SMTP", answer: "Port 25",
        answers: [
            { x: 4, y: 320, width: 50, height: 50, answer: "Port 110" },
            { x: 100, y: 320, width: 50, height: 50, answer: "Port 25" },
            { x: 200, y: 320, width: 50, height: 50, answer: "Port 443" },
            { x: 298, y: 320, width: 50, height: 50, answer: "Port 22" }
        ]
    },
    {
        x: 150, y: 10, width: 50, height: 50, question: "IMAP", answer: "Port 110",
        answers: [
            { x: 4, y: 320, width: 50, height: 50, answer: "Port 22" },
            { x: 100, y: 320, width: 50, height: 50, answer: "Port 25" },
            { x: 200, y: 320, width: 50, height: 50, answer: "Port 110" },
            { x: 298, y: 320, width: 50, height: 50, answer: "Port 80" }
        ]
    },
    {
        x: 150, y: 10, width: 50, height: 50, question: "SSH", answer: "Port 22",
        answers: [
            { x: 4, y: 320, width: 50, height: 50, answer: "Port 110" },
            { x: 100, y: 320, width: 50, height: 50, answer: "Port 25" },
            { x: 200, y: 320, width: 50, height: 50, answer: "Port 443" },
            { x: 298, y: 320, width: 50, height: 50, answer: "Port 22" }
        ]
    },

    {
        x: 150, y: 10, width: 50, height: 50, question: "FTP", answer: "Port 21",
        answers: [
            { x: 4, y: 320, width: 50, height: 50, answer: "Port 110" },
            { x: 100, y: 320, width: 50, height: 50, answer: "Port 25" },
            { x: 200, y: 320, width: 50, height: 50, answer: "Port 21" },
            { x: 298, y: 320, width: 50, height: 50, answer: "Port 80" }
        ]
    },
    {
        x: 150, y: 10, width: 50, height: 50, question: "DNS", answer: "Port 53",
        answers: [
            { x: 4, y: 320, width: 50, height: 50, answer: "Port 110" },
            { x: 100, y: 320, width: 50, height: 50, answer: "Port 25" },
            { x: 200, y: 320, width: 50, height: 50, answer: "Port 443" },
            { x: 298, y: 320, width: 50, height: 50, answer: "Port 53" }
        ]
    },
    {
        x: 150, y: 10, width: 50, height: 50, question: "NTP", answer: "Port 123",
        answers: [
            { x: 4, y: 320, width: 50, height: 50, answer: "Port 123" },
            { x: 100, y: 320, width: 50, height: 50, answer: "Port 25" },
            { x: 200, y: 320, width: 50, height: 50, answer: "Port 110" },
            { x: 298, y: 320, width: 50, height: 50, answer: "Port 80" }
        ]
    },
    {
        x: 150, y: 10, width: 50, height: 50, question: "HTTPS", answer: "Port 443",
        answers: [
            { x: 4, y: 320, width: 50, height: 50, answer: "Port 110" },
            { x: 100, y: 320, width: 50, height: 50, answer: "Port 25" },
            { x: 200, y: 320, width: 50, height: 50, answer: "Port 443" },
            { x: 298, y: 320, width: 50, height: 50, answer: "Port 22" }
        ]
    }

];

let instruct;
let questionStartPosistionX = 150;
let questionStartPosistionY = 10;
let interval;

/*DOMContentLoaded event is fired when the initial HTML 
document has been completely loaded and parsed, without 
waiting for stylesheets, images, and subframes to finish 
loading. The "PortrisCanvas" element is stored in teh canvas variable.
Also, the 2D rendering is stored in the context2D. 
Then the DrawCanvas() function is called.
*/
document.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById('PortrisCanvas');
    context2D = canvas.getContext('2d');
    DrawCanvas();
});

/* DrawCanvas function displays the canvas, a border, 
listener for the key strokes, displays the first level,
and calls the Button() function.
*/
function DrawCanvas() {
    canvas.width = 685;
    canvas.height = 728;

    context2D.scale(2, 2);    
    context2D.fillStyle = 'white';
    context2D.fillRect(0, 0, canvas.width, canvas.height);

    context2D.strokeStyle = 'green';
    context2D.strokeRect(1, 1, 340, 362);

    document.addEventListener('keydown', KeyMoveShape);
    
    Buttons();  
        
}

/* Buttons() function stores the "startButton" and "resetButton" elements 
in the startButton and resetButton variables. When called if the game is not a gameOver,
then the first "if" statement is called, 
aftwards the second "if" statement will be called. 
It will also hide the startbutton and display the reset button. After the reset button is pressed,
the resetGame() function is called along with the Question(), Answer(), and start functions.
*/
function Buttons(){   
    const startButton = document.getElementById("startButton");  
    const resetButton = document.getElementById("resetButton");  
        
    if(!gameOver) {               
        startButton.addEventListener("click", function () {
            startButton.style.display = "none";            
            Question();
            Answer();
            Start();

        });
    }     

    if (gameOver){                                  
        startButton.style.display = "none";        
        resetButton.style.display = "block";                       
        resetButton.addEventListener("click", function () {
            window.clearInterval(interval);
            gameOver = false;         
            resetButton.style.display = "none"; 
            ResetGame();            
            Question();            
            Answer();              
            Start();                   
        });        
    }   
}

/*Displays the question when called.*/
function Question() {        
    currentQuestion = questions[questionCount];    
    context2D.fillStyle = "green";
    context2D.fillRect(currentQuestion.x, currentQuestion.y, currentQuestion.width, currentQuestion.height);     
    context2D.fillStyle = "black";
    context2D.textAlign = "middle";    
    context2D.font = "16px Arial";
    context2D.fillText(currentQuestion.question, currentQuestion.x + 1, currentQuestion.y + 30, 39);           
}

/*Displays the answers when called.*/
function Answer() {     
    currentAnswers = questions[questionCount].answers;
    for (let i = 0; i < currentAnswers.length; i++) {        
        context2D.fillStyle = "red";
        context2D.fillRect(currentAnswers[i].x, currentAnswers[i].y, currentAnswers[i].width, currentAnswers[i].height);
        context2D.fillStyle = "black";
        context2D.textAlign = "middle";
        context2D.font = "16px Arial";
        context2D.fillText(currentAnswers[i].answer, currentAnswers[i].x + 1, currentAnswers[i].y + 30, 39);
    }     
}

/*Deletes the question by replacing its shape with the background color.*/
function Delete(){    
    context2D.fillStyle = "white";
    context2D.fillRect(currentQuestion.x, currentQuestion.y, currentQuestion.width, currentQuestion.height);
    context2D.fillStyle = "white";
    context2D.fillText(currentQuestion.question, currentQuestion.x + 1, currentQuestion.y + 30, 39);    
}

/*Responds to the A,S,D keys when playing the game.*/
function KeyMoveShape(key){
    if(!gameOver) {
        if (key.keyCode === 83) {           
            WordCollision();
            direction = DIRECTION.DOWN;
            Delete();
            currentQuestion.y++;
            Question();
        }

        if (key.keyCode === 68) {            
            HorizontalCollision();
            WordCollision();
            direction = DIRECTION.RIGHT;
            Delete();
            currentQuestion.x +=5;
            Question();
        }

        if (key.keyCode === 65) {            
            HorizontalCollision();
            WordCollision();
            direction = DIRECTION.LEFT;
            Delete();
            currentQuestion.x -=5;
            Question();
        }
    }   
}

/*Checks for collisions with the walls.*/
function HorizontalCollision() {
    let leftWall = 3;
    let rightWall = 348;

    if (currentQuestion.x <= leftWall) {        
        Delete();
        currentQuestion.x++;

    } else if (currentQuestion.x + 60 >= rightWall) {        
        Delete();
        currentQuestion.x--;
    }
}

/*Detects collision with the shapes and sends over the question 
and the answer to be checked to the QandACheck() function. 
Also detects if the questions shape hits the bottom of the gameboard.
If true, then the nextQuestion() function is called.
*/
function WordCollision() { 
    let answer; 
    let bottomFrame = 360; 

    if(currentQuestion.y + currentQuestion.height > bottomFrame) {
        NextQuestion();
    } else {
        for (let i = 0; i < currentAnswers.length; i++) {
            if (currentQuestion.x < currentAnswers[i].x + currentAnswers[i].width && currentQuestion.x + currentQuestion.width > currentAnswers[i].x && currentQuestion.y < currentAnswers[i].y + currentAnswers[i].height && currentQuestion.y + currentQuestion.height > currentAnswers[i].y) {
                answer = currentAnswers[i].answer;
                Delete();
                currentQuestion.y--;                
                QandACheck(currentQuestion, answer);
            }         
        }
    }    
}

/*Checks to see if teh questions's answer object matches the answer's object. 
If true then points are awarded. As teh player scores higher points, 
the level will increase. Then the NextQuestion() function is called. 
*/
function QandACheck(currentQuestion, answer){      
    if (currentQuestion.answer === answer) {
        console.log("works")
        $.ajax({
            url: '/update_score',
            type: 'POST',
            data: { score: 5 },
            success: function (data) {
                // Update the score displayed on the page
                $('#current-score').text(data.score);
                $('#current-level').text(data.level);
            },
            error: function (error) {
                console.error('Error updating score:', error);
            }
            });
    }           
    NextQuestion();
}

/*Resets all the variables in the game to thier original posistion( the last question) and value.
The canvas is also deleted and reDrawn with DrawCanvas() Function.
*/
function ResetGame(){           
     
    questionCount = questionCountReset;
    context2D.clearRect(0, 0, canvas.width, canvas.height);
    direction = DIRECTION.IDLE;     
    currentQuestion.x = questionStartPosistionX;
    currentQuestion.y = questionStartPosistionY; 
    
    DrawCanvas();
}

/* Detects when the game is over and displays "Game Over".
Afterwards all questions positions are reset to their original posistions.
*/
function GameOver(){
    context2D.fillStyle = "black";
    context2D.textAlign = "middle";    
    context2D.font = "16px Arial";
    context2D.fillText("Game Over", 150, 100, 50, 30);    
    for(let i = 0; i < questions.length - 1; i++){
        questions[i].x = questionStartPosistionX;
        questions[i].y = questionStartPosistionY;
    }   
    Buttons();
}



function nextQuestion(questionCount, questions) {
    if (questionCount < questions.length - 1) {
        return {
            questionCount: questionCount + 1,
            gameOver: false
        };
    } else {
        return {
            questionCount,
            gameOver: true
        };
    }
}


/*Checks to see if the game is over. 
If false then the block will increment by a timer,
deleting and redrawing. Giving the illusion of it falling.
*/
function Start(){    
    interval = window.setInterval(function(){        
        if (!gameOver) {
            WordCollision();
            Delete();      
            currentQuestion.y++;
            Question();
        } 
    }, 20);
} 


module.exports = { nextQuestion };