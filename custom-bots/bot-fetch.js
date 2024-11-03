import {
   createClient
} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const redirectURL = 'https://sourabhsuneja.github.io/academic-resources/auth/sign-in-request.html';

const supabaseUrl = 'https://jmalbtekzzmktcvreyio.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptYWxidGVrenpta3RjdnJleWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2NjYzNzEsImV4cCI6MjA0NDI0MjM3MX0.vZtttF81KZh9zpHeB_qAk-upey532m75Tk7Itb0YggE';
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to fetch user data
function fetchBotData(botId) {
   return new Promise(async (resolve, reject) => {
      const {
         data: bot,
         error
      } = await supabase
         .from('custom_bots_view')
         .select('*')
         .eq('bot_id', botId)
         .single();

      if (error || !bot) {
         reject(`Error fetching bot data: ${error ? error.message : 'Bot not found'}`);
      } else {
         resolve(bot);
      }
   });
}

// Function to toggle overlay visibility
function toggleInvalidOverlay() {
   const overlay = document.getElementById("invalid-overlay");
   if (overlay.style.display === "none" || overlay.style.display === "") {
      overlay.style.display = "block";
   } else {
      overlay.style.display = "none";
   }
}

// Function to change a string to uppercase
function toUpperCase(str) {
   return str.toUpperCase();
}

// Function to change a string to lowercase
function toLowerCase(str) {
   return str.toLowerCase();
}

// Function to capitalize the first letter of each word
function capitalizeFirstLetterOfEachWord(str) {
   return str.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
}

// Function to prefix "a" or "an" before a string
function prefixArticle(word) {
   const firstLetter = word.charAt(0).toLowerCase();
   const vowels = ['a', 'e', 'i', 'o', 'u'];

   // Check if the first letter is a vowel
   if (vowels.includes(firstLetter)) {
      return `an ${word}`;
   } else {
      return `a ${word}`;
   }
}


function getRandomAdjective() {
   const descriptions = [
      "an outstanding",
      "a remarkable",
      "an excellent",
      "a fantastic",
      "an exceptional",
      "a wonderful",
      "an impressive",
      "a superb",
      "a brilliant",
      "an extraordinary"
   ];

   const randomIndex = Math.floor(Math.random() * descriptions.length);
   return descriptions[randomIndex];
}

function getBotIntro(bot) {
   return `<strong>I am ${getRandomAdjective()} AI chatbot named ${bot.bot_name}, designed by ${bot.student_name} of class ${bot.class}-${bot.section}.</strong> <br><br>With ${prefixArticle(toLowerCase(bot.bot_personality))} personality, I am trained to answer your questions mainly in ${bot.primary_language}. Here are a few more details about me:`;
}

function getGreeting(lang) {
   switch (lang.toLowerCase()) {
      case "english":
         return "Hello! How can I assist you today?";
      case "hindi":
         return "नमस्कार! आपके सवालों के जवाब के लिए मैं यहाँ हूँ।";
      case "hinglish":
         return "Hey there! Aapke questions ka jawab dene ke liye yahan hoon.";
      case "punjabi":
         return "Sat Sri Akal! Tuhada swagat hai!";
      default:
         return "Hello! How can I help you today?";
   }
}

async function init() {
   try {
      const id = new URLSearchParams(window.location.search).get('botID') || 0;
      const bot = await fetchBotData(id); console.log(bot);
      window.botDetails = encodeURIComponent(JSON.stringify(bot));
      // set heading
      document.getElementById('botHeading').innerText = bot.bot_name + ' | AI Chatbot';
      // set bot intro
      document.getElementById('botIntro').innerHTML = getBotIntro(bot);
      document.getElementById('chatName').innerHTML = bot.bot_name;
      // set gender
      document.getElementById('botGender').innerHTML = 'Gender: ' + ((bot.bot_gender === 'M') ? 'Male' : 'Female');
      // set knowledge scope
      document.getElementById('botScope').innerHTML = 'Knowlege Scope: ' + bot.knowledge_scope;
      // set response tone
      document.getElementById('responseTone').innerHTML = 'Response Tone: ' + bot.response_tone;
      // set credit
      document.getElementById('credit').innerHTML = 'Crafted by ' + bot.student_name;
      // set first sample message
      document.getElementById('sampleMsg').innerText = getGreeting(bot.primary_language);
   } catch (err) {
      toggleInvalidOverlay();
   }
}

init();