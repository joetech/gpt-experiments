let selectedWord; // Word to be guessed
let guessedLetters = []; // Guessed letters
let remainingGuesses; // Remaining guesses

const wordElement = document.getElementById("word");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const statusElement = document.getElementById("status");
const playAgainButton = document.getElementById("play-again");
const guessedLettersElement = document.getElementById("guessed-letters");
const hangmanArtElement = document.getElementById("hangman-art");

// Thanks https://gist.github.com/chrishorton/8510732aa9a80a03c829b09f12e20d9c
const hangmanParts = [
  `
  +---+
  |   |
      |
      |
      |
      |
`,
  `
  +---+
  |   |
  O   |
      |
      |
      |
`,
  `
  +---+
  |   |
  O   |
  |   |
      |
      |
`,
  `
  +---+
  |   |
  O   |
 /|   |
      |
      |
`,
  `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
`,
  `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
`,
  `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
`,
];

let wrongGuesses = 0; // Counter for wrong guesses


// Function to update the hangman art
function updateHangmanArt() {
  hangmanArtElement.textContent = hangmanParts[wrongGuesses];
}

// Update the hangman art and check the game status after each guess
function guessLetter() {
  const letter = guessInput.value.toLowerCase();
  guessInput.value = "";

  if (letter && !guessedLetters.includes(letter)) {
    guessedLetters.push(letter);

    if (!selectedWord.includes(letter)) {
      wrongGuesses++;
      if (wrongGuesses >= hangmanParts.length) {
        statusElement.innerHTML = `Game Over! The word was "${selectedWord}".`;
        submitButton.disabled = true;
        playAgainButton.style.display = "inline";
        return;
      }
    }
    remainingGuesses--;

    wordElement.innerHTML = getHiddenWord();
    updateHangmanArt();
    updateGuessedLetters();
    checkGameStatus();

    // Disable the guess form after the game is lost
    if (remainingGuesses === 0) {
      guessInput.disabled = true;
      submitButton.disabled = true;
      return;
    }
  }
}

// Initialize the game
function initializeGame() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  remainingGuesses = hangmanParts.length;
  guessedLetters = [];
  wrongGuesses = 0;
  wordElement.innerHTML = getHiddenWord();
  guessInput.value = "";
  statusElement.innerHTML = "";
  playAgainButton.style.display = "none";
  submitButton.disabled = false;
  updateHangmanArt();
  updateGuessedLetters();

  // Set focus to the guess form element
  guessInput.disabled = false;
  guessInput.focus();
}

// Function to update the guessed letters display
function updateGuessedLetters() {
  guessedLettersElement.textContent = "Guessed Letters: " + guessedLetters.join(", ");
}

// Generate the hidden word with underscores for unguessed letters
function getHiddenWord() {
  let hiddenWord = "";
  for (let i = 0; i < selectedWord.length; i++) {
    if (guessedLetters.includes(selectedWord[i])) {
      hiddenWord += selectedWord[i];
    } else {
      hiddenWord += "_";
    }
    hiddenWord += " ";
  }
  return hiddenWord.trim();
}

// Check the game status (win, lose, or continue)
function checkGameStatus() {
  console.log('remainingGuesses', remainingGuesses);
  console.log('wrongGuesses', wrongGuesses);
  if (remainingGuesses === 0) {
    statusElement.innerHTML = `Game Over! The word was "${selectedWord}".`;
    submitButton.disabled = true;
    playAgainButton.style.display = "inline";
  } else if (!getHiddenWord().includes("_")) {
    statusElement.innerHTML = "Congratulations! You guessed the word!";
    submitButton.disabled = true;
    playAgainButton.style.display = "inline";
  }
}

// Event listeners
submitButton.addEventListener("click", guessLetter);
guessInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    guessLetter();
  }
});
playAgainButton.addEventListener("click", initializeGame);

// Start the game
initializeGame();
