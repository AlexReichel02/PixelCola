       function refresh(){
       $("#banner").load(window.location.href +" #banner");
    }
  
let words = [
    {
            word: "Confidentiality",
            hint: "a baseline security consideration?"
    },
    {
            word: "Stakeholders",
            hint: "the deciding factor in the prioritization of requirements?"
    },
    {
            word: "Product Scope",
            hint: "refers to the work that is to be completed?"
    },
    {
            word: "E-R Model",
            hint: "relational diagram is used to establish tables?",
    },
    {
            word: "Object",
            hint: "the instantiation of the class template?"
    },
    {
            word: "Association",
            hint: "what level of system description can vulnerability mapping begin?"
    },
    {
            word: "Object oriented",
            hint: "procedural programming still exist in the form of most object functions?"
    },
    {
            word: "Attack Surface",
            hint: "the profile of the system that is accessible to potential attackers"
    },
    {
            word: "Virtualization",
            hint: "use of one machine to simulate the operation of another machine or machines."
    },
    {
            word: "Network mapping",
            hint: "you will determine live hosts, routers, and servers to establish a picture of the network topology."
    },
    {
            word: "Development",
            hint: "phase of an update should the placement of new components be logical within the overall structure of the existing system?"
    },
    {
            word: "Port scanning",
            hint: "act of checking the available ports that can communicate on a network connection."
    },
    {
            word: "Awareness",
            hint: "the first step in the development of an effective computer security training program?"
    },
    {
            word: "Guidelines",
            hint: " set of constraints that can be used toward the implementation of a process."
    },
    {
            word: "Buffer",
            hint: "Small custom web applications generally experience what type of overflow?"
    },
   
]

const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText= document.querySelector(".time span"),
inputField = document.querySelector(".userInput"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word"),
messageText = document.querySelector(".message span"),
scoreText = document.querySelector(".score"),
levelText = document.querySelector(".level"),
form = document.querySelector(".checkForm");


form.addEventListener('submit',(e=>{
  e.preventDefault();

}))

let correctWord, timer;
let gameStarted=false;

const initTimer = (maxTime) => {
    clearInterval(timer);
   
    timer = setInterval(()=>{
        if(maxTime >0){
            maxTime--;
           // timeText.innerText = maxTime;
            return (timeText.innerText = maxTime);
        }
        let text={correctWord};
        messageText.innerText="Time off " +correctWord +"  was the correct word";
        //alert("Time off ${correctWord.toUpperCase()} was the correct word");
        initGame();
    }, 1000);
};

function initGame (){
  
  animationElement.style.display = 'none'; // Hide the animation
 // animationElement.classList.remove('animate'); 
 
    gameStarted=true;
    handleWin();
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for( let i = wordArray.length-1;i>0;i--){
        let j = Math.floor(Math.random() * (i+1));
        [wordArray[i],wordArray[j]] = [wordArray[j],wordArray[i]];
        }
    wordText.innerText = wordArray.join("");
    hintText.innerText=randomObj.hint;
    correctWord=randomObj.word.toLowerCase();
    inputField.value="";
    inputField.setAttribute("maxlength",correctWord.length+1);

};

const winMessage = document.querySelector('.win-message');
const animationElement = document.querySelector('.animation');
const level = document.querySelector('.level');

function handleWin() {
  if(level.textContent == '1'){
  console.log(level);
  animationElement.style.display = 'block'; // Display the animation
  animationElement.classList.add('animate');
  }else{
    animationElement.style.display='none';
  }
}

const checkWord = () => {
    if(gameStarted==true){
        let userWord = inputField.value.toLowerCase();
        console.log(userWord)
        console.log(correctWord)
    
        if(!userWord){
            score.value=0;
            messageText.innerText="Please enter word to check";
          
        } 

        if(userWord == correctWord){

           // handleWin();
           
            messageText.innerText="Congrats! " + correctWord +" is the correct Word";
            
    
            score.value=5;

            $.ajax({
            url: '/update_score',
            type: 'POST',
            data: { score: score.value },
            success: function (data) {
                // Update the score displayed on the page
                $('#current-score').text(data.score);
                $('#current-level').text(data.level);
            },
            error: function (error) {
                console.error('Error updating score:', error);
            }
            });
            //refresh();

           
           
        
            setTimeout(function(){
             
              initGame()
            },1000);
           
        }else{
            score.value=0;
            
            return (messageText.innerText = "Oops! " + userWord + " is not the correct Word");
   
        }

        //alert("Oops! ${userWord} is not a correct Word");
       
        console.log(scoreText);
        console.log(levelText);
  
    //level.value=level.value+5;
    //alert("Congrats! ${correctWord.toUpperCase() is the correct Word}");
      
    }else{
       
        messageText.innerText="Game has not started";
        score.value=0;
    }
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);