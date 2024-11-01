import {
   createClient
} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const redirectURL = 'https://sourabhsuneja.github.io/academic-resources/auth/sign-in-request.html';

const supabaseUrl = 'https://jmalbtekzzmktcvreyio.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptYWxidGVrenpta3RjdnJleWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2NjYzNzEsImV4cCI6MjA0NDI0MjM3MX0.vZtttF81KZh9zpHeB_qAk-upey532m75Tk7Itb0YggE';
const supabase = createClient(supabaseUrl, supabaseKey);

let userId = null;
let userDetails = null;


// Function to check authentication status
async function checkAuth() {
   try {
      const {
         data: {
            session
         }
      } = await supabase.auth.getSession();

      if (session && session.user) {
         // User is signed in, fetch the user data
         userId = session.user.id;

         // Wait for fetchUserData to resolve or reject
         userDetails = await fetchUserData(userId, 'students'); 

// Enable the input field
document.getElementById('creatorName').disabled = false;

// Set the placeholder to the value of the userName variable
document.getElementById('creatorName').placeholder = userDetails.name + ' (' + userDetails.class + '-' + userDetails.section + ')';

// Disable the input field
document.getElementById('creatorName').disabled = true;

          // stay on page, authentication successful
         // do nothing
         
      } else {
         // User is not signed in, redirect to page with sign in request
         window.location.href = redirectURL;
      }
   } catch (error) {
      // OAuth done but user details pending
      window.location.href = redirectURL;
   }
}

// Function to fetch user data
function fetchUserData(userId, tableName) {
   return new Promise(async (resolve, reject) => {
      const {
         data: user,
         error
      } = await supabase
         .from(tableName)
         .select('*')
         .eq('id', userId)
         .single();

      if (error || !user) {
         reject(`Error fetching user data: ${error ? error.message : 'User not found'}`);
      } else {
         resolve(user);
      }
   });
}


function addBotRow(botId, botName) {
    // Get the tbody element
    const botTableBody = document.getElementById('botTableBody');

    // Create a new row and cells
    const newRow = document.createElement('tr');
    
    const idCell = document.createElement('td');
    idCell.textContent = botId;
    newRow.appendChild(idCell);
    
    const nameCell = document.createElement('td');
    nameCell.textContent = botName;
    newRow.appendChild(nameCell);
    
    const actionCell = document.createElement('td');
    
    const actionIcon = document.createElement('i');
    actionIcon.className = 'fas fa-cog action-icon';
    
    // Attach the togglePopup event listener to the icon
    actionIcon.addEventListener('click', function(event) {
        togglePopup(event, botId);
    });

    const popupMenu = document.createElement('div');
    popupMenu.className = 'popup-menu';
    popupMenu.id = `popup-${botId}`;

    const openButton = document.createElement('button');
    openButton.textContent = 'Open';
    
    // Attach the openBot event listener to the button
    openButton.addEventListener('click', function() {
        openBot(botId);
    });
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    // Attach the deleteBot event listener to the button
    deleteButton.addEventListener('click', function() {
        deleteBot(botId);
    });
    
    // Append buttons to the popup menu
    popupMenu.appendChild(openButton);
    popupMenu.appendChild(deleteButton);
    
    // Append icon and popup menu to the action cell
    actionCell.appendChild(actionIcon);
    actionCell.appendChild(popupMenu);
    
    // Append the action cell to the new row
    newRow.appendChild(actionCell);
    
    // Append the new row to the tbody
    botTableBody.appendChild(newRow);
}

    // Toggle the popup menu
      function togglePopup(event, id) {
         event.stopPropagation();
         const popup = document.getElementById(`popup-${id}`);
         closeAllPopups();
         popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
      }

      // Close all popups when clicking outside
      function closeAllPopups() {
         document.querySelectorAll('.popup-menu').forEach(menu => menu.style.display = 'none');
      }

      // Open and Delete bot functions
      function openBot(id) { alert(`Open Bot with ID: ${id}`); }
      function deleteBot(id) { alert(`Delete Bot with ID: ${id}`); }

      // Close popup on clicking anywhere outside
      document.addEventListener('click', closeAllPopups);

function displayNoBotsMessage() {
            const tableBody = document.getElementById('botTableBody');
            tableBody.innerHTML = '<tr class="no-data"><td colspan="3">No bots created yet</td></tr>';
         }


// Select form components to be frequently manipulated
const createBotBtn = document.getElementById('createBotBtn');
const creationError = document.getElementById('creation-error');
const creationSuccess = document.getElementById('creation-success');


// Function to insert new bot data
function insertBotData(botName, personality, language, knowledgeScope, responseTone, instructions) {
   if (!userId) {
      renderMessage('error', 'Error fetching user ID');
      return;
   }
   supabase
      .from('custom_bots')
      .insert([{
         student_id: userId,
         bot_name: botName,
         bot_personality: personality,
         primary_language: language,
         knowledge_scope: knowledgeScope,
         response_tone: responseTone,
         additional_instructions: (instructions.trim() === '')? null : instructions.trim()
      }])
      .then(({
         error: insertError
      }) => {
         if (insertError) {        
         console.log(insertError.message);
         renderMessage('error', 'Oops! Something went wrong');
         createBotBtn.innerHTML = 'Create My Chatbot';
         createBotBtn.disabled = false;
         } else {
            renderMessage('success', 'Bot created successfully!');
         }
      });
}

function renderMessage(action, message) {
   const msgElement = (action === 'error') ?  creationError : creationSuccess;
   msgElement.innerText = message;
   msgElement.style.display = 'block';
   createBotBtn.disabled = false;
}


// Form Validation
document.getElementById('chatbotForm').addEventListener('submit', function (event) {
   event.preventDefault();
   let isValid = true;

   // Clear previous error
   creationError.textContent = '';
   creationError.style.display = 'none';
   const botName = document.getElementById('botName');
   const botPersonality = document.getElementById('botPersonality');
   const primaryLanguage = document.getElementById('primaryLanguage');
   const knowledgeScope = document.getElementById('knowledgeScope');
   const responseTone = document.getElementById('responseTone');
   const additionalInstructions = document.getElementById('additionalInstructions');

   // bot name validation
   if (botName.value.trim() === '') {
      showError(botName, 'Please provide a name to your bot.');
      isValid = false;
   } else {
      clearError(botName);
   }

   if (isValid) {
      createBotBtn.innerHTML = '<i class="fas white fa-spinner fa-spin"></i> Wait...';
      createBotBtn.disabled = true;
      insertBotData(botName.value.trim(), botPersonality.value, primaryLanguage.value, knowledgeScope.value, responseTone.value, additionalInstructions.value);
   } else {
      createBotBtn.innerHTML = 'Create My Chatbot';
      createBotBtn.disabled = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
   }
});

// Helper functions
function showError(input, message) {
   const errorField = input.nextElementSibling;
   errorField.textContent = message;
   errorField.style.display = 'block';
   input.classList.add('error');
}

function clearError(input) {
   const errorField = input.nextElementSibling;
   errorField.textContent = '';
   errorField.style.display = 'none';
   input.classList.remove('error');
}


displayNoBotsMessage();


checkAuth();



