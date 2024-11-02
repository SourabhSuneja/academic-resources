let chatHistory = [];
// Toggle Chat Visibility
function toggleChat() {
   document.getElementById('chatContainer').classList.toggle('active');
}

// Send User Message and receive Chatbot Response
async function sendMessage(event) {
   let userInput;
   if (event.key === "Enter" || event.type === "click") {
      userInput = document.getElementById("userInput").value.trim();
      if (userInput) {
         logMessage(userInput, "user");
         document.getElementById("userInput").value = "";

         // Show Typing Animation
         showTypingIndicator();

         let originalResponse, response;
         try {
            // Attempt to fetch response
            originalResponse = await window.fetchResponse(userInput);
            response = formatResponse(originalResponse);
         } catch (error) {
            // Handle error by setting default response
            response = "I couldn't create a response for this. It may go against the terms and conditions of use.";
         } finally {
            // Hide Typing Animation
            hideTypingIndicator();
            logMessage(response, 'bot');
            logChatHistory(userInput, "user");
            logChatHistory(originalResponse, "model");
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

// Function to log (append) messages to chatHistory
function logChatHistory(message, role) {
   // Split the message into words
   const words = message.split(" ");

   // Check if the message length exceeds 40 words
   let truncatedMessage = message;
   if (words.length > 40) {
      truncatedMessage = words.slice(0, 20).join(" ") + " ... " + words.slice(-20).join(" ");
   }

   // Construct the message object
   const newMessage = {
      role: role,
      parts: [{
         text: truncatedMessage
      }]
   };

   // Append the new message object to chatHistory
   chatHistory.push(newMessage);
}