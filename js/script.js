// The unordered list where the player’s guessed letters will appear.
const guessedLetters = document.querySelector(".guessed-letters");
// The button with the text “Guess!” in it.
const button = document.querySelector(".guess");
// The text input where the player will guess a letter.
const letterInput = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display.
const remaining = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display.
const remainingSpan = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again.
const playAgain = document.querySelector(".play-again");
// Create another global variable called word and give it the value of "magnolia". Magnolia is your starting word to test out the game until you fetch words from a hosted file in a later step.
const word = "magnolia";

// Write a Function to Add Placeholders for Each Letter
const addPlaceholders = function(word){
    const lettersArrey = [];
    for (const letter of word){
        console.log(letter);
        lettersArrey.push("●");
    }
    wordInProgress.innerText = lettersArrey.join("")
}; 
addPlaceholders(word);

// Add an Event Listener for the Button

button.addEventListener("click", function(e){
    // The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
    e.preventDefault();
    const letter = letterInput.value;
    console.log(letter);
    letterInput.value = "";

});

