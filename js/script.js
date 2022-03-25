// The unordered list where the player’s guessed letters will appear.
const guessedLettersElement = document.querySelector(".guessed-letters");
// The button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
// The text input where the player will guess a letter.
const letterInput = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display.
const remainingElement = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display.
const remainingSpan = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");
// Create another global variable called word and give it the value of "magnolia". Magnolia is your starting word to test out the game until you fetch words from a hosted file in a later step.
const word = "magnolia";
// This array will contain all the letters the player guesses. 
const guessedLetters = [];

// Write a Function to Add Placeholders for Each Letter
const addPlaceholders = function(word){
    const lettersArray = [];
    for (const letter of word){
        console.log(letter);
        lettersArray.push("●");
    }
    wordInProgress.innerText = lettersArray.join("")
}; 
addPlaceholders(word);

// Add an Event Listener for the Button

guessButton.addEventListener("click", function(e){
    // The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
    e.preventDefault();
    message.innerText = "";
    const letter = letterInput.value;
    console.log(letter);
    letterInput.value = "";
    const validLetter = checkPlayerInput(letter);
    // console.log(validLetter);
    if (validLetter){
        makeGuess(letter);
    };
});

// a Function to Check Player’s Input
const checkPlayerInput = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter :)";
    } else if (input.length > 1) {
        message.innerText = "Please enter only one letter :)";
    } else if (!input.match(acceptedLetter)){
        message.innerText = "Please enter a letter A-Z :)";
    } else {
        return input;
    }
};

// a Function to Capture Input
const makeGuess = function(letter){
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)){
        message.innerText = "You have already guessed that letter. Try again. :)"
    } else {
        guessedLetters.push(letter);
        console.log(guessedLetters);
        displayGuessedLetters(letter);
        showWordInProgress(guessedLetters);
    }
};

// a Function to Show the Guessed Letters
const displayGuessedLetters = function(letter){
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerHTML = letter;
        guessedLettersElement.append(li);
    };
};

// Create a Function to Update the Word in Progress
const showWordInProgress = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    // console.log(wordArray);
    // ['M', 'A', 'G', 'N', 'O', 'L', 'I', 'A']
    const newWordArray = [];
    for (const item of wordArray){
        if (guessedLetters.includes(item)){
            newWordArray.push(item);
        } else {
            newWordArray.push("●");
        };
    };
    wordInProgress.innerText = newWordArray.join("");
    checkIfWin();
};

// Create a Function to Check If the Player Won
const checkIfWin = function(){
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`
    };
};
