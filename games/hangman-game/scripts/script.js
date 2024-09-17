// Function to fetch data from all 7 JSON files
async function fetchWords() {
    const jsonFiles = [
        'data1.json', 'data2.json', 'data3.json', 'data4.json',
        'data5.json', 'data6.json', 'data7.json'
    ];
    const allWordData = [];
    const baseURL = 'https://sourabhsuneja.github.io/word-of-the-day/';

    // Map the array of files to an array of fetch promises
    const fetchPromises = jsonFiles.map(async (file) => {
        try {
            const response = await fetch(`${baseURL}${file}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // Push all words into the allWordData array
            allWordData.push(...data.words);
        } catch (error) {
            console.error('Error fetching words:', error);
        }
    });

    // Wait for all fetches to complete
    await Promise.all(fetchPromises);

    // Return all the data after everything has been fetched and processed
    return allWordData;
}

// Function to generate word/hint list
async function generateWordList(allWordData) {
    const wordList = [];

    allWordData.forEach((wordData) => {
        // Get the word and convert to lowercase
        const word = wordData.word.toLowerCase();

        // Filter out words with spaces and words with more than 5 unique letters
        if (word.includes(' ')) return;

        const uniqueLetters = new Set(word.replace(/[^a-z]/gi, '').split(''));
        if (uniqueLetters.size <= 5) {
            let hint = '';

            // 70% chance to use meaning as the hint, 30% for synonym/antonym
            const randomHintType = Math.random();

            if (randomHintType < 0.7) {
                // Use the first part of the meaning if there are multiple parts
                const firstMeaning = wordData.meaning.split(';')[0];
                hint = firstMeaning.trim();
            } else if (randomHintType < 0.85 && wordData.synonym) {
                // Use synonym as the hint
                hint = `The synonym for this word is ${wordData.synonym}.`;
            } else if (wordData.antonym) {
                // Use antonym as the hint
                hint = `The antonym for this word is ${wordData.antonym}.`;
            }

            // Add the word and hint to the wordList array
            wordList.push({ word, hint });
        }
    });

    return wordList;
}

// Game variables and UI elements
let allWordData = [];
let wordList = [];

const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

// Initializing game variables with async functions
const init = async () => {
    try {
        allWordData = await fetchWords();
        wordList = await generateWordList(allWordData);
        getRandomWord();
    } catch (error) {
        console.error('Error initializing the game:', error);
    }
};

init();
playAgainBtn.addEventListener("click", getRandomWord);