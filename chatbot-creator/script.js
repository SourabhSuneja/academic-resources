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

// Function to fetch and update list of created bots
function fetchBotList() {
   return new Promise(async (resolve, reject) => {
      const {
         data: bots,
         error
      } = await supabase
         .from('custom_bots')
         .select('*')
         .eq('student_id', userId);

      if (error || !bots || (Array.isArray(bots) && bots.length === 0 )) {
         displayNoBotsMessage();
         reject(`Error fetching bots: ${error ? error.message : 'Bots not found'}`);
      } else {
         // clear previous bot list from the table before adding a new one
        document.getElementById('botTableBody').innerHTML = '';
         // Loop through the bots array and pass id and bot_name to addBotRow
bots.forEach(bot => {
  addBotRow(bot.id, bot.bot_name);
});
         resolve(bots);
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

    // Attach click event listener to the bot name so that the chatbot window is opened when clicked
    nameCell.addEventListener('click', function(event) {
        window.open(`https://sourabhsuneja.github.io/academic-resources/custom-bots/?botID=${botId}`, '_blank');
    });

    
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
        window.open(`https://sourabhsuneja.github.io/academic-resources/custom-bots/?botID=${botId}`, '_blank');
    });
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    // Attach the deleteBot event listener to the button
    deleteButton.addEventListener('click', async function() {
        const success = await deleteBot(botId);
        window.hideProcessingDialog();
        if(success === true) {
             // success dialog
            const alertResult = await window.showDialog({
                title: 'Success',
                message: 'Chatbot deleted successfully!',
                type: 'alert'
            });
            // update bot list
               try {
                 await fetchBotList();
               } catch (err) {
                 
               }
        }
        else if(success === false) {
             // failure dialog
            const alertResult = await window.showDialog({
                title: 'Operation Failed',
                message: 'Could not delete chatbot!',
                type: 'alert'
            });
        }
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

 // Function to delete a bot
async function deleteBot(id) {
        // Confirmation dialog
        const confirmResult = await window.showDialog({
            title: 'Confirmation',
            message: 'Are you sure you want to delete this bot?',
            type: 'confirm'
        });
    if(!confirmResult) {
        return 'aborted';
    }
    window.showProcessingDialog();
    try {
        // Perform delete operation
        const { error } = await supabase
            .from('custom_bots')
            .delete()
            .eq('id', id);
        
        if (error) {
            return false;
        } else {
            return true;
        }
    } catch (err) {
        return false;
    }
}

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
async function insertBotData(botName, botGender, personality, language, knowledgeScope, responseTone, instructions) {
   if (!userId) {
      renderMessage('error', 'Error fetching user ID');
      return;
   }

   createBotBtn.innerHTML = '<i class="fas white fa-spinner fa-spin"></i> Wait...';
   createBotBtn.disabled = true;

   try {
      const { error: insertError } = await supabase
         .from('custom_bots')
         .insert([{
            student_id: userId,
            bot_name: botName,
            bot_gender: botGender,
            bot_personality: personality,
            primary_language: language,
            knowledge_scope: knowledgeScope,
            response_tone: responseTone,
            additional_instructions: (instructions.trim() === '') ? null : instructions.trim()
         }]);

      if (insertError) {
         renderMessage('error', 'Oops! Something went wrong');
      } else {
         renderMessage('success', 'Bot created successfully!');
         await fetchBotList(); // await here as well
      }
   } catch (err) {
      
   } finally {
      createBotBtn.innerHTML = 'Create My Chatbot';
      createBotBtn.disabled = false;
   }
}

function renderMessage(action, message) {
   const msgElement = (action === 'error') ?  creationError : creationSuccess;
   msgElement.innerText = message;
   msgElement.style.display = 'block';
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
   const botGender = document.getElementById('botGender');
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
      insertBotData(capitalizeWords(botName.value.trim()), botGender.value, botPersonality.value, primaryLanguage.value, knowledgeScope.value, responseTone.value, additionalInstructions.value);
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

function capitalizeWords(str) {
    return str.split(' ').map(word => {
        // Check if the word is in all caps
        if (word === word.toUpperCase()) {
            return word; // Keep the word as is
        } else {
            // Capitalize the first letter and lowercase the rest
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
    }).join(' ');
}


async function init() {
  try {
    await checkAuth();
    await fetchBotList();
  } catch (err) {
    
  }
}

init();




