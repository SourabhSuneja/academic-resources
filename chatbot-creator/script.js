import {
   createClient
} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const redirectURL = 'https://sourabhsuneja.github.io/academic-resources/auth/sign-in-request.html';

const supabaseUrl = 'https://jmalbtekzzmktcvreyio.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptYWxidGVrenpta3RjdnJleWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2NjYzNzEsImV4cCI6MjA0NDI0MjM3MX0.vZtttF81KZh9zpHeB_qAk-upey532m75Tk7Itb0YggE';
const supabase = createClient(supabaseUrl, supabaseKey);

let userId = null;


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
alert(userId);
         // Wait for fetchUserData to resolve or reject
         const userName = await fetchUserData(userId, 'students'); 
          // stay on page, authentication successful
         // do nothing
         
      } else {
         // User is not signed in, redirect to page with sign in request
         //window.location.href = redirectURL;
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
         .select('name')
         .eq('id', userId)
         .single();

      if (error || !user) {
         reject(`Error fetching user data: ${error ? error.message : 'User not found'}`);
      } else {
         resolve(user.name);
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

displayNoBotsMessage();


checkAuth();
