let words;

const wordText = document.querySelector(".word"),
   hintText = document.querySelector(".hint span"),
   timeText = document.querySelector(".time b"),
   inputField = document.querySelector("input"),
   refreshBtn = document.querySelector(".refresh-word"),
   checkBtn = document.querySelector(".check-word");

let correctWord, timer;
let currentWordIndex = 0;

const initTimer = async (maxTime) => {
   clearInterval(timer);
   timer = setInterval(async () => {
      if (maxTime > 0) {
         maxTime--;
         timeText.innerText = maxTime;
      } else {
         clearInterval(timer); // Clear the interval when time is up
         await customAlert(`Time off! ${correctWord.toUpperCase()} was the correct word`, 'red');
         initGame();
      }
   }, 1000);
};

const initGame = () => {
   initTimer(30);
   let randomObj = words[currentWordIndex];
   let wordArray = randomObj.word.split("");
   for (let i = wordArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
   }
   wordText.innerText = wordArray.join("");
   hintText.innerText = randomObj.hint;
   correctWord = randomObj.word.toLowerCase();;
   inputField.value = "";
   inputField.setAttribute("maxlength", correctWord.length);
   if (currentWordIndex === words.length - 1) {
      currentWordIndex = 0;
   } else {
      currentWordIndex++;
   }
}

const checkWord = async () => {
   let userWord = inputField.value.toLowerCase();
   if (!userWord) {
      await customAlert("Please enter the word to check!", 'red');
      return; // Exit the function after showing the alert
   }
   if (userWord !== correctWord) {
      await customAlert(`Oops! ${userWord} is not the correct word for this.`, 'red');
      return; // Exit the function after showing the alert
   }
   await customAlert(`Congrats! ${correctWord.toUpperCase()} is the correct word`, 'green');
   initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);


// loading fill up type questions from the question bank

// Function to get URL parameter by name
function getQueryParam(name) {
   const urlParams = new URLSearchParams(window.location.search);
   return urlParams.get(name);
}

// Get the grade from the URL, default to 6 if missing or invalid
const grade = parseInt(getQueryParam('grade')) || 6;
const validGrade = [6, 7, 8].includes(grade) ? grade : 6;

// fetch different files depending on grade
let gradeArray;
switch (validGrade) {
   case 6:
      gradeArray = ['kips-6-ch-1', 'kips-6-ch-2', 'kips-6-ch-3', 'kips-6-ch-4'];
      break;
   case 7:
      gradeArray = ['kips-7-ch-1', 'kips-7-ch-2', 'kips-7-ch-3', 'kips-7-ch-4'];
      break;
   case 8:
      gradeArray = ['kips-8-ch-1', 'kips-8-ch-2', 'between-8-ch-1', 'between-8-ch-2'];
      break;
   default:
      gradeArray = [];
      console.log("Invalid grade");
}

// Helper function to fetch text files and process them
async function fetchQuestions(fileName) {
   const response = await fetch(`https://sourabhsuneja.github.io/question-paper/question-bank/${fileName}.txt`);
   const text = await response.text();
   // Split by line and filter out any blank or whitespace-only lines
   const lines = text.split('\n').filter(line => line.trim() !== '');
   return lines;
}

// Fetch and process the questions from all files
async function loadQuestions() {
   const files = gradeArray;
   let allQuestions = [];

   for (const file of files) {
      const questions = await fetchQuestions(file);
      allQuestions = allQuestions.concat(questions);
   }

   return filterQuestions(allQuestions);
}

// Filter and structure only Fill up type questions
function filterQuestions(questions) {
   const filteredQuestions = [];

   questions.forEach((line) => {
      const [questionText, jsonParams] = line.split('JSONParams:');
      const params = JSON.parse(jsonParams);

      // Only keep fill up questions
      if (params) {
         let word, hint;

         if (params.qType === 'MCQ') {
            // Extract the MCQ options and correct answer from the question text
            const questionParts = questionText.match(/(.*)\(Options: (.*?) Correct: (.*?)\)/);
            hint = questionParts[1].trim(); // Cleaned question hint
            const choices = questionParts[2].split(/Option [A-D]} /).slice(1); // Extract options
            word = questionParts[3].trim(); // Correct answer

            if (/^\w+$/.test(word) && (hint.endsWith('.') || hint.endsWith('___'))) {
               filteredQuestions.push({
                  word: word,
                  hint: hint
               });
            }
         } else if (params.qType === 'Fill up') {
            hint = questionText.trim();
            word = params.ansExplanation.trim();
            if (/^\w+$/.test(word)) {
               filteredQuestions.push({
                  word: word,
                  hint: hint
               });
            }
         }
      }
   });

   return shuffleArray(filteredQuestions); // Shuffle questions
}

// Shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
   }
   return array;
}

// function to create a custom alert
function customAlert(message, color) {
   return new Promise((resolve) => {
      const alertBox = document.getElementById('customAlertBox');
      const alertMessage = document.getElementById('alertMessage');
      const okButton = document.getElementById('alertOkBtn');

      // Set the message text
      alertMessage.textContent = message;

      // Apply the color class (remove old and add new)
      alertBox.classList.remove('red-background', 'green-background');
      if (color === 'red') {
         alertBox.classList.add('red-background');
      } else if (color === 'green') {
         alertBox.classList.add('green-background');
      }

      // Show the alert box
      alertBox.style.display = 'flex';

      // Handle the Ok button click
      okButton.onclick = () => {
         alertBox.style.display = 'none'; // Hide the alert box
         resolve(); // Resolve the promise
      };
   });
}

// Initialize the game and questions
async function init() {
   words = await loadQuestions();
   initGame();
}

window.onload = init;
