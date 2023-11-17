//global variables
const restartBtn = document.getElementById('restartBtn');
const guessBtn = document.getElementById('guessBtn');
const guessLi = document.querySelector('.guess-li');
const numberInput = document.getElementById('number-input');
let guess;
let numberOfGuesses = 0; 
let gameOver = false;

//generate random number between 0 and 100
const secretNumber = Math.floor(Math.random()*100) +1;
console.log(secretNumber);

//add eventlistener to restartBtn for mouse click
restartBtn.addEventListener('click', function(){
    location.reload();
});

//add eventlistener to guessBtn for mouse click
guessBtn.addEventListener('click', checkGuess);

//add eventlistener to guessBtn for Enter
document.addEventListener('keydown', function(event){
    if(event.key === "Enter"){
        checkGuess();
    }
});

//------------------------------------------------------------------------------
//----------------- MAIN FUNCTION FOR CHECKING GUESS ---------------------------
//------------------------------------------------------------------------------
function checkGuess(){
    //local variables
    guess = Number(numberInput.value); 
    const guessHighLow = document.getElementById('guessHighLow');
    const outcome = document.getElementById('outcome');

    if(!gameOver){ //if gameOver is false the game can continue

        //if statement to check number of guesses
        if(numberOfGuesses < 5){

            //nested if statement to check guess vs secretNumber
            if (guess < 1 || guess > 100){
                guessHighLow.innerHTML = "Du ska gissa på ett nummer 1-100.<br>Prova igen!";
                numberInput.focus();
            } else if (guess < secretNumber || guess > secretNumber){
                //functions to print out guess text and numbers
                printTooHighOrLow();
                printWrong(guess);
            } else if (guess === secretNumber){
                //function to run when guess is right
                printRight(); 
            }
        }

        //if statement that runs when number of guesses is 5 (without it "gissa" must be pressed a 6:th time before game over is displayed)
        if(numberOfGuesses === 5 && guess !== secretNumber) {
            guessHighLow.textContent = "";
            outcome.innerHTML = "Game Over!<br>Det rätta talet var: " + secretNumber;
            gameOver = true;
            numberInput.blur();
            guessBtn.style.background = "grey";
            guessBtn.style.cursor = "default";
        }
    } 
    //Clears the input field
    numberInput.value = "";
}

//------------------------------------------------------------------------------
//----------------- FUNCTION FOR TOO HIGH OR TOO LOW TEXT-----------------------
//------------------------------------------------------------------------------
function printTooHighOrLow(){
    
    numberOfGuesses++;

    //ternary operator for guess text
    guess < secretNumber? 
        guessHighLow.innerHTML = "Tyvärr för lågt.<br>Gissa på ett högre tal." : guessHighLow.innerHTML = "Tyvärr för högt.<br>Gissa på ett lägre tal.";
    
    numberInput.focus();
}

//------------------------------------------------------------------------------
//-------------- FUNCTION FOR PRINTING WRONG GUESS IN LIST----------------------
//------------------------------------------------------------------------------

function printWrong(){
    for(let i=1; i<=numberOfGuesses; i++) {
        const guessElement = document.getElementById(`guess${i}`);
        //If statement to check if guessElement is empty
        if (!guessElement.textContent){
            //adding wrongGuess class 
            guessElement.classList.add('wrongGuess');
            guessElement.textContent = guess;
            break;
        }
    }
};

// *******ALT. KOD MED SWITCH ******************* */

// function printWrong(){
//     switch(numberOfGuesses){
//         case 1:
//             const guess1 = document.getElementById('guess1');
//             guess1.classList.add('wrongGuess');
//             guess1.textContent = guess;
//             console.log("1");
//             break;
//         case 2:
//             const guess2 = document.getElementById('guess2');
//             guess2.classList.add('wrongGuess');
//             guess2.textContent = guess;
//             console.log("2");
//             break;
//         case 3:
//             const guess3 = document.getElementById('guess3');
//             guess3.classList.add('wrongGuess');
//             guess3.textContent = guess;
//             console.log("3");
//             break;
//         case 4:
//             const guess4 = document.getElementById('guess4');
//             guess4.classList.add('wrongGuess');
//             guess4.textContent = guess;
//             console.log("4");
//             break;
//         case 5:
//             const guess5 = document.getElementById('guess5');
//             guess5.classList.add('wrongGuess');
//             guess5.textContent = guess;
//             console.log("5");
//             break;
//     }
// }

//------------------------------------------------------------------------------
//----------------------- FUNCTION FOR RIGHT GUESS -----------------------------
//------------------------------------------------------------------------------
function printRight(){
    //Clear guess text
    guessHighLow.textContent = "";
    numberOfGuesses++;

    //creating a variable for the right guess
    const right = document.querySelector(`#guess${numberOfGuesses}`);

    //adding rightGuess class
    right.classList.add('rightGuess');

    right.textContent = guess;

    //adding congrats class to outcome
    outcome.classList.add('congrats');
    outcome.textContent = "GRATTIS!!! Rätt Gissat!";

    //change style on button
    numberInput.blur();
    guessBtn.style.background = "grey";
    guessBtn.style.cursor = "default";

    gameOver = true;  
}

