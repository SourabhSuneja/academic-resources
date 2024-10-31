import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://jmalbtekzzmktcvreyio.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptYWxidGVrenpta3RjdnJleWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2NjYzNzEsImV4cCI6MjA0NDI0MjM3MX0.vZtttF81KZh9zpHeB_qAk-upey532m75Tk7Itb0YggE';
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Function to check authentication status
  function checkAuth() {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // User is signed in, fetch the user data
        const userId = session.user.id;
        //alert(fetchUserData(userId, 'students'));
        alert('Verified');
      } else {
        // User is not signed in, redirect to OAuth screen
        //signInWithGoogle();
      }
    });
  }

checkAuth();

// Toggle Chat Visibility
function toggleChat() {
   document.getElementById('chatContainer').classList.toggle('active');
}

// Send User Message and receive Chatbot Response
async function sendMessage(event) {
   if (event.key === "Enter" || event.type === "click") {
      const userInput = document.getElementById("userInput").value.trim();
      if (userInput) {
         logMessage(userInput, "user");
         document.getElementById("userInput").value = "";

         // Show Typing Animation
         showTypingIndicator();

         let response;
         try {
            // Attempt to fetch response
            response = await window.fetchResponse(userInput);
            response = formatResponse(response);
         } catch (error) {
            // Handle error by setting default response
            response = "I couldn't generate a response for this. You may have violated the terms and conditions of use.";
         } finally {
            // Hide Typing Animation
            hideTypingIndicator();
            logMessage(response, 'bot');
         }
      }
   }
}

// Log Message Function
function logMessage(message, sender) {
   const messageContainer = document.createElement("div");
   messageContainer.className = `chat-msg ${sender}-msg fade-in`;
   messageContainer.innerHTML = message;
   document.getElementById("chatMessages").appendChild(messageContainer);

   // Scroll to Bottom
   document.getElementById("chatMessages").scrollTop = document.getElementById("chatMessages").scrollHeight;
}

// Typing Indicator
function showTypingIndicator() {
   document.getElementById("typingIndicator").classList.remove("hidden");
}

function hideTypingIndicator() {
   document.getElementById("typingIndicator").classList.add("hidden");
}

function formatResponse(markdown) {
   // Replace line breaks with <br> tags
   let html = markdown.replace(/(?:\r\n|\r|\n)/g, '<br>');

   // Replace **bold** with <strong>bold</strong>
   html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

   // Handle unordered lists (starting with -)
   html = html.replace(/(?:^|\n)([-])\s+(.+)/g, '<li>$2</li>');

   // Replace ordered list markers (*) with right-pointing arrows (→)
   html = html.replace(/(?:^|\n)(\*)\s+(.+)/g, '<li>→ $2</li>');

   // Wrap <li> elements in <ul> tags if any unordered lists are found
   if (html.includes('<li>')) {
      html = html.replace(/(<li>.*?<\/li>)/g, '<ul>$1</ul>');
   }

   // Handle ordered lists (starting with numbers followed by a period)
   html = html.replace(/(?:^|\n)(\d+)\.\s+(.+)/g, '<li>$2</li>');

   // Wrap <li> elements in <ol> tags if any ordered lists are found
   if (html.includes('<li>')) {
      html = html.replace(/(<li>.*?<\/li>)/g, '<ol>$1</ol>');
   }

   // Remove trailing <br> tags
   html = html.replace(/(<br\s*\/?>)+$/, '');

   // Replace * after any line breaks with >
   html = html.replace(/<br\s*\/?>\s*\*/g, '<br> >');

   return html;
}