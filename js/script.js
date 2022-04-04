// The unordered list where the player’s guessed letters will appear.
const guessedLettersElement = document.querySelector(".guessed-letters");
// The button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
// The text input where the player will guess a letter.
const letterInput = document.querySelector(".letter");
// The label for the text input where the player will guess a letter.
const labelForLetterInput = document.querySelector(".label-for-letter");
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
let word = "magnolia";
// This array will contain all the letters the player guesses. 
const guessedLetters = [];
// Global Variable for the Number of Guesses. Set it to a value of 8
let remainingGuesses = 8;

// an async function to upgrade the game from displaying one word to fetching a random word from a file of over 800 words.
const getWord = async function(){
    const res = await fetch (
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const words = await res.text();
    // console.log(words);
    const wordArray = words.split("\n");
    // console.log(wordArray);
    // Randomly Select the Index of a word
    const randomIndex = Math.floor(Math.random()*wordArray.length);
    const randomWord = wordArray[randomIndex];
    // console.log(randomIndex);
    // console.log(randomWord);
    word = randomWord.trim();
    // console.log(word);
    addPlaceholders(word);
};
getWord();

// Write a Function to Add Placeholders for Each Letter
const addPlaceholders = function(word){
    const lettersArray = [];
    for (const letter of word){
        console.log(letter);
        lettersArray.push("●");
    }
    wordInProgress.innerText = lettersArray.join("")
};

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
        countRemainingGuesses (letter);
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

// Create a Function to Count Guesses Remaining
const countRemainingGuesses = function(guess){
    const wordUpper = word.toUpperCase();
    if (!wordUpper.includes(guess)){
        message.innerText= `The letter ${guess} is not in the word :()`;
        remainingGuesses -= 1;
    } else {
        message.innerText= `Good guess! The word has the letter ${guess}.`;
    };
    if (remainingGuesses === 0){
        message.innerHTML= `No more guesses left. The game is over. :( The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1){
        remainingSpan.innerText = `${remainingGuesses} guess`;
    } else if (remainingGuesses > 1) {
        remainingSpan.innerText = `${remainingGuesses} guesses`;
    };
};

// Create a Function to Check If the Player Won
const checkIfWin = function(){
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`
        startOver();
    };
};

// Create a Function to Hide and Show Elements
const startOver = function(){
    // hide the Guess button.
    guessButton.classList.add("hide");
    // hide the paragraph where the remaining guesses will display.
    remainingElement.classList.add("hide");
    // hide the unordered list where the guessed letters appear. 
    guessedLettersElement.classList.add("hide");
    // hide the text input where the player guesses a letter.
    letterInput.classList.add("hide");
    // hide the label for the text input where the player guesses a letter.
    labelForLetterInput.classList.add("hide");
    // show the button to play again.
    playAgainButton.classList.remove("hide");
};

// Add a Click Event to the Play Again Button
playAgainButton.addEventListener("click", function(e){
    // The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
    e.preventDefault();
    // Remove the class of “win” applied to the message element.
    message.classList.remove("win");
    // Empty the message text and the unordered list where the guessed letters appear.
    message.innerText = "";
    guessedLettersElement.innerHTML = "";
    // Set the remaining guess back to 8
    remainingGuesses = 8;
    // Set guessedLetters global variable back to an empty array.
    guessedLetters.length = 0;
    // Populate the text of the span inside the paragraph where the remaining guesses display with the new amount of guesses.
    remainingSpan.innerText = `${remainingGuesses} guesses`
    // Show the Guess button
    guessButton.classList.remove("hide");
    // Show the paragraph with remaining guesses
    remainingElement.classList.remove("hide");
    // Show the guessed letters
    guessedLettersElement.classList.remove("hide");
    // Show the text input where the player guesses a letter.
    letterInput.classList.remove("hide");
    // Show the label for the text input where the player guesses a letter.
    labelForLetterInput.classList.remove("hide");
    // Hide the Play Again button.
    playAgainButton.classList.add("hide");
    // Call the getWord() async function that pulls the new word so the player can play again!
    getWord();
});