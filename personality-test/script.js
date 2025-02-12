let roleInputValue;

const questionsSet1 = [
   "जब आप थक जाते हो, तो क्या करना पसंद करते हो?",
   "जब आप नए लोगों से मिलते हो, तो कैसा महसूस करते हो?",
   "आप चीज़ें कैसे समझते हो?",
   "आप बात करते समय किस पर ध्यान देते हो?",
   "जब आपको कोई फैसला लेना हो, तो आप कैसे सोचते हो?",
   "अगर झगड़ा हो जाए, तो आप क्या करोगे?",
   "आप अपना दिन कैसे प्लान करते हो?",
   "कोई काम करते समय आप कैसे शुरू करते हो?",
   "आपको क्या ज्यादा अच्छा लगता है?",
   "आप चीज़ें कैसे देखते हो?",
   "आप फैसले लेते समय क्या ध्यान रखते हो?",
   "अगर कोई काम अचानक बदल जाए, तो क्या करते हो?",
   "जब आपको कोई problem solve करनी हो, तो आप कैसे सोचते हो?",
   "जब आप अपने ideas बताते हो, तो कैसे बताते हो?",
   "जब आप किसी party में जाते हो, तो क्या करते हो?",
   "जब कोई काम प्लान करना हो, तो आप क्या करते हो?",
   "आप अपनी feelings कैसे handle करते हो?",
   "काम करते समय आप कैसे behave करते हो?",
   "आपको क्या inspire करता है?",
   "जब आप group project में हो, तो आप क्या करते हो?"
];

const optionsDataSet1 = [
   ["अकेले बैठकर सोचते हो या कोई शांति वाला काम करते हो।", "दोस्तों से बात करते हो या कुछ मजेदार करते हो।"],
   ["पहले थोड़ा शांत रहते हो।", "तुरंत उनसे बात करने लगते हो।"],
   ["जो साफ और सच्चा दिखता है, उस पर भरोसा करते हो।", "नई और अलग बातें सोचने में मजा आता है।"],
   ["छोटे-छोटे facts और details पर।", "बड़ी बातें और future के ideas पर।"],
   ["दिमाग से सोचते हो कि क्या सही है।", "दिल से सोचते हो कि दूसरों को अच्छा लगे।"],
   ["जो सही है, वही कहोगे, भले किसी को बुरा लगे।", "सबको खुश रखने की कोशिश करोगे।"],
   ["पहले से plan बनाकर सब कुछ ठीक से करते हो।", "बिना plan के, जो हो रहा है वही करते हो।"],
   ["सब सोच-समझकर काम शुरू करते हो।", "पहले शुरू करते हो और फिर धीरे-धीरे समझते हो।"],
   ["अकेले रहकर सोचने का समय।", "दोस्तों के साथ बात करना और मजा करना।"],
   ["जो अभी है और जो दिखता है।", "जो हो सकता है और जो अलग लगता है।"],
   ["जो सही और तर्कसंगत (logical) हो।", "जो सबकी feelings का ख्याल रखे।"],
   ["परेशान हो जाते हो और पुराने plan पर रहना पसंद करते हो।", "जल्दी से नए तरीके में ढल जाते हो।"],
   ["पुराने तरीके अपनाते हो।", "नए और creative तरीके ढूंढते हो।"],
   ["सीधे और simple तरीके से।", "imagination के साथ और अलग examples देकर।"],
   ["चुपचाप बैठकर सबको देखते हो।", "सबसे मिलते हो और बातें करते हो।"],
   ["पहले से सब fix करते हो।", "लास्ट टाइम तक flexible रहते हो।"],
   ["अपनी feelings छुपा लेते हो और facts पर ध्यान देते हो।", "अपनी feelings दूसरों के साथ share करते हो।"],
   ["समय पर और धीरे-धीरे काम पूरा करते हो।", "काम late करते हो, लेकिन जल्दी-जल्दी खत्म कर लेते हो।"],
   ["छोटे और practical goals।", "बड़े और नए ideas।"],
   ["सब organize करते हो और सबकुछ ठीक रखते हो।", "नए और fun ideas देते हो।"]
];

const mappingsSet1 = [
   ["I", "E"],
   ["I", "E"],
   ["S", "N"],
   ["S", "N"],
   ["T", "F"],
   ["T", "F"],
   ["J", "P"],
   ["J", "P"],
   ["I", "E"],
   ["S", "N"],
   ["T", "F"],
   ["J", "P"],
   ["S", "N"],
   ["S", "N"],
   ["I", "E"],
   ["J", "P"],
   ["T", "F"],
   ["J", "P"],
   ["S", "N"],
   ["J", "P"]
];

const questions = [
   "जब आप थक जाते हो, तो क्या करना पसंद करते हो?",
   "जब आप नए दोस्तों से मिलते हो, तो कैसा महसूस करते हो?",
   "जब आपको कुछ नया सीखना हो, तो कैसे समझते हो?",
   "जब कोई चीज़ देखते हो, तो किस पर ध्यान देते हो?",
   "अगर आपको कोई फैसला लेना हो, तो कैसे सोचते हो?",
   "अगर कोई दोस्त उदास हो, तो आप क्या करोगे?",
   "जब आपको स्कूल का होमवर्क करना हो, तो कैसे करते हो?",
   "जब आपको कोई नया गेम खेलना हो, तो कैसे शुरू करते हो?",
   "आपको क्या ज्यादा अच्छा लगता है?",
   "आप अपने आसपास की चीज़ों को कैसे देखते हो?",
   "जब आप किसी से झगड़ते हो, तो कैसे फैसला लेते हो?",
   "अगर अचानक प्लान बदल जाए, तो आप क्या करोगे?",
   "अगर टीचर आपको कोई प्रॉब्लम सॉल्व करने को कहे, तो आप कैसे सोचोगे?",
   "जब आप अपनी बातें किसी को समझाते हो, तो कैसे करते हो?",
   "जब आप किसी पार्टी में जाते हो, तो क्या करते हो?",
   "अगर आपको एक दिन का टाइमटेबल बनाना हो, तो कैसे बनाओगे?",
   "अगर आपको कुछ अच्छा या बुरा लगे, तो क्या करोगे?",
   "जब आपको कोई काम करना हो, तो कैसे करोगे?",
   "आपको कौन सी चीज़ ज्यादा पसंद है?",
   "अगर आपको किसी ग्रुप में काम करने को कहा जाए, तो आप क्या करोगे?"
];

const optionsData = [
   ["अकेले बैठकर आराम करूँगा।", "दोस्तों से मिलकर मज़ा करूँगा।"],
   ["पहले थोड़ा शांत रहूँगा।", "जल्दी से दोस्ती कर लूँगा।"],
   ["जो साफ दिखता है, उसे मानता हूँ।", "नए और अजीब तरीके से सोचता हूँ।"],
   ["छोटी-छोटी चीज़ों और details पर ध्यान देता हूँ।", "बड़ी बातें और नए ideas सोचता हूँ।"],
   ["जो सही लगे, वह करता हूँ।", "जो लोगों को अच्छा लगे, वह करता हूँ।"],
   ["सच बोलूँगा, चाहे दोस्त नाराज हो जाए।", "उसका दिल रखने के लिए अच्छा बोलूँगा।"],
   ["पहले से plan बनाकर धीरे-धीरे करता हूँ।", "बिना सोचे बस शुरू कर देता हूँ।"],
   ["पहले सारे rules समझकर खेलता हूँ।", "पहले खेलता हूँ, फिर धीरे-धीरे सीखता हूँ।"],
   ["अकेले बैठकर सोचने का समय।", "दोस्तों से बातें करना और हँसना।"],
   ["जो अभी दिख रहा है, उसे देखता हूँ।", "जो हो सकता है, उसकी कल्पना करता हूँ।"],
   ["जो सही और तर्कसंगत (logical) हो।", "जो सबकी feelings का ख्याल रखे।"],
   ["थोड़ा परेशान हो जाता हूँ और पुराने plan पर रहना पसंद करता हूँ।", "मस्ती में नए तरीके अपनाने को तैयार रहता हूँ।"],
   ["पहले से सिखाए गए तरीके अपनाता हूँ।", "खुद के नए और मज़ेदार तरीके ढूँढता हूँ।"],
   ["साधारण शब्दों में समझाता हूँ।", "कहानी बनाकर और examples देकर समझाता हूँ।"],
   ["चुपचाप बैठकर देखता हूँ।", "सबसे मिलता हूँ और बातें करता हूँ।"],
   ["पहले से सब fix कर लेता हूँ।", "लास्ट टाइम तक flexible रहता हूँ।"],
   ["अपनी feelings अंदर रखता हूँ।", "अपनी feelings दूसरों को बताता हूँ।"],
   ["धीरे-धीरे पूरा करता हूँ।", "लेट करता हूँ, लेकिन जल्दी-जल्दी खत्म करता हूँ।"],
   ["छोटे और practical goals पसंद हैं।", "बड़े और नए ideas अच्छे लगते हैं।"],
   ["सबकुछ ठीक से organize करता हूँ।", "नए और मज़ेदार ideas देता हूँ।"]
];

const mappings = [
   ["I", "E"],
   ["I", "E"],
   ["S", "N"],
   ["S", "N"],
   ["T", "F"],
   ["T", "F"],
   ["J", "P"],
   ["J", "P"],
   ["I", "E"],
   ["S", "N"],
   ["T", "F"],
   ["J", "P"],
   ["S", "N"],
   ["S", "N"],
   ["I", "E"],
   ["J", "P"],
   ["T", "F"],
   ["J", "P"],
   ["S", "N"],
   ["J", "P"]
];

let currentQuestionIndex = 0;
const responses = [];
const responseMappings = {
   'I': 0,
   'E': 0,
   'N': 0,
   'S': 0,
   'T': 0,
   'F': 0,
   'J': 0,
   'P': 0
};
let resultLink;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const overlay = document.getElementById("submission-overlay");
const successOverlay = document.getElementById("success-overlay");

document.getElementById("next-question").addEventListener("click", () => {
   // Get selected answer
   const selectedOption = document.querySelector('input[name="option"]:checked');
   if (selectedOption) {
      responses.push(selectedOption.value);
      responseMappings[selectedOption.dataset.mapping] += 1;

      // Move to next question
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
         loadQuestion();
      } else {
         //submitFeedback();
         alert(JSON.stringify(responseMappings));
      }
   } else {
      alert("Please select an option.");
   }
});

function loadQuestion() {
   questionText.textContent = questions[currentQuestionIndex];
   const options = optionsData[currentQuestionIndex];
   const mapping = mappings[currentQuestionIndex];

   optionsContainer.innerHTML = '';
   options.forEach((option, index) => {
      const radioId = `option${index + 1}`;
      const radioInput = `<input type="radio" id="${radioId}" name="option" value="${option}" data-mapping="${mapping[index]}">`;
      const radioLabel = `<label for="${radioId}">${option}</label>`;
      optionsContainer.innerHTML += radioInput + radioLabel;
   });
}

function submitFeedback() {
   // Show the overlay
   overlay.classList.add('visible');

   const scriptURL = 'https://script.google.com/macros/s/AKfycbymkt6to6SQN6CydehpEDfDyuC43GVC5DgXdVOPb8BNzbMX8hDnbxXLO0HJSW5Zjin5KA/exec';
   const formData = new FormData();
   formData.append('responses', JSON.stringify(responses));

   fetch(scriptURL, {
         method: 'POST',
         body: formData,
         mode: 'no-cors'
      })
      .then(() => {
         successOverlay.classList.add("visible");
         setTimeout(function () {
            window.location.href = resultLink;
         }, 2000);
      })
      .catch(() => {
         alert('Error submitting feedback!');
      })
      .finally(() => {
         // Hide the overlay once submission is complete
         overlay.classList.remove('visible');
      });
}

// Function to create and display custom prompt dialog
function customPrompt() {
   return new Promise((resolve) => {
      const modal = document.getElementById('cmCustomModal');
      const nameInput = document.getElementById('cmNameInput');
      const gradeInput = document.getElementById('cmGradeInput');
      const sectionInput = document.getElementById('cmSectionInput');
      const submitButton = document.getElementById('cmSubmitName');
      roleInputValue = document.getElementById("cmRoleInput").value;

      // Display the modal
      modal.style.display = 'block';

      // Focus on the input field when the modal is shown
      nameInput.focus();

      // Event listener for the submit button
      submitButton.addEventListener('click', function () {
         const name = capitalizeFirstLetter(nameInput.value.trim());
         const grade = gradeInput.value;
         const section = sectionInput.value;

         if ((name && grade && section) || (name && roleInputValue !== 'Student')) {

            // check if name is spammy
            if (!isValidName(name)) {
               alert('It looks like a spammy name. Please enter a valid name.');
            } else {

               // Hide the modal and resolve the promise with the entered name, grade, and section
               modal.style.display = 'none';
               resolve({
                  name,
                  grade,
                  section
               });
            }
         } else {
            alert('Please fill all fields.');
         }
      });
   });
}

// function to capitalize first letter of each word
function capitalizeFirstLetter(string) {
   return string
      .toLowerCase() // Convert the entire string to lowercase
      .split(' ') // Split the string into an array of words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(' '); // Join the array of words back into a single string
}

// function to get student details through custom prompt
async function getStudentDetails() {
   // open custom prompt
   let studentDetails = await customPrompt();

   // set timestamp
   let timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
   });

   // push the details in the responses array
   responses.push(studentDetails.name, studentDetails.grade, studentDetails.section, timestamp);

   // create result link
   resultLink = `https://sourabhsuneja.github.io/academic-resources/favourite-student-certificate.html?name=${encodeURIComponent(studentDetails.name + ', ' + studentDetails.grade + '-' + studentDetails.section)}`;
}

// function to identify possibly spammy names
function isValidName(inputName) {
   // Trim the input to remove leading and trailing spaces
   inputName = inputName.trim();

   // Basic check: length should be reasonable (between 3 and 60 characters)
   if (inputName.length < 3 || inputName.length > 60) {
      return false;
   }

   // Check for repeating characters like "aaaa" or "1111"
   if (/(\w)\1{3,}/.test(inputName)) {
      return false;
   }

   // Check for too many digits or symbols (considered spam)
   if (/[^a-zA-Z\s]/.test(inputName)) {
      return false;
   }

   // Check if there are too many consonants in a row (likely spam)
   if (/[bcdfghjklmnpqrstvwxyz]{5,}/i.test(inputName)) {
      return false;
   }

   // Check for a good mix of vowels and consonants (names should have vowels)
   let vowels = inputName.match(/[aeiou]/gi) || [];
   let consonants = inputName.match(/[bcdfghjklmnpqrstvwxyz]/gi) || [];
   if (vowels.length === 0 || consonants.length === 0 || consonants.length / vowels.length > 5) {
      return false;
   }

   // If all checks pass, consider it a valid name
   return true;
}


// add a change event listener to the role select
document.getElementById("cmRoleInput").addEventListener("change", function () {
    const gradeInput = document.getElementById("cmGradeInput");
    const sectionInput = document.getElementById("cmSectionInput");

    if (this.value === "Student") {
        gradeInput.style.display = "block";
        sectionInput.style.display = "block";
    } else {
        gradeInput.style.display = "none";
        sectionInput.style.display = "none";
    }
});


// Call the function to execute the code
getStudentDetails();
