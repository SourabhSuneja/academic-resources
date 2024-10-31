import {
   createClient
} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://jmalbtekzzmktcvreyio.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptYWxidGVrenpta3RjdnJleWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2NjYzNzEsImV4cCI6MjA0NDI0MjM3MX0.vZtttF81KZh9zpHeB_qAk-upey532m75Tk7Itb0YggE';
const supabase = createClient(supabaseUrl, supabaseKey);

let userId = null;


// initialize session if tokens are present in the URL
async function initializeSupabaseSession() {
   // Parse the URL to check for access and refresh tokens
   const url = new URL(window.location.href);
   const accessToken = url.searchParams.get('access_token');
   const refreshToken = url.searchParams.get('refresh_token');

   // If tokens are present in the URL, set the session
   if (accessToken && refreshToken) {
      try {
         // Set the session with the provided tokens
         await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
         });

         // Remove tokens from the URL for a cleaner look
         window.history.replaceState({}, document.title, window.location.pathname);
         return;
      } catch (error) {
         console.error("Error initializing the session:", error);
      }
   } else {
      //console.log("No tokens found in URL parameters.");
      return;
   }
}


// Select form components to be frequently manipulated
const signUpBtn = document.getElementById('sign-up-btn');
const signUpError = document.getElementById('signup-error');
const signUpSuccessMessage = document.getElementById('signup-success-message');


// Function to check authentication status
async function checkAuth() {
   const OAuthSession = await initializeSupabaseSession();
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
         const userName = await fetchUserData(userId, 'students');

         document.getElementById('authentication-happening').innerHTML = '<i class="fas white fa-check-circle"></i> Verified';
         window.location.href = "https://sourabhsuneja.github.io/academic-resources/";
      } else {
         // User is not signed in, redirect to OAuth screen
         signInWithGoogle();
      }
   } catch (error) {
      // OAuth done but user details pending
      showSignUpForm();
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

// Function to sign up
function signUp(name, userClass, section) {
   if (!userId) {
      renderErrorMessage('signup', 'Error fetching user ID');
      return;
   }
   supabase
      .from('students')
      .insert([{
         id: userId,
         name,
         "class": parseInt(userClass, 10),
         section
      }])
      .then(({
         error: insertError
      }) => {
         if (insertError) {
            let msg = insertError.message;
            if (msg.startsWith('duplicate')) {
               msg = 'An account with this name already exists.';
            }
            renderErrorMessage('signup', insertError.message);
         } else {
            renderSuccessMessage('signup', 'Account created successfully!');
            window.location.href = "https://sourabhsuneja.github.io/academic-resources/";
         }
      });
}

async function signInWithGoogle() {
   const {
      data,
      error
   } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
         redirectTo: 'https://sourabhsuneja.github.io/academic-resources/auth/'
      }
   });

   if (error) {
      renderErrorMessage('signup', error.message);
      return;
   }

}

// function to show sign up form
function showSignUpForm() {
   document.getElementById('authentication-happening').style.display = 'none';
   document.getElementById('sign-up-form').classList.add('active');
}

// Form Validation
document.getElementById('sign-up-form').addEventListener('submit', function (event) {
   event.preventDefault();
   let isValid = true;

   // Clear previous error
   signUpError.textContent = '';
   signUpError.style.display = 'none';
   const userName = document.getElementById('name');
   const userClass = document.getElementById('class');
   const section = document.getElementById('section');

   // name validation
   if (userName.value.trim() === '') {
      showError(userName, 'Please select your name.');
      isValid = false;
   } else {
      clearError(userName);
   }

   // class validation
   if (userClass.value.trim() === '') {
      showError(userClass, 'Please select your class.');
      isValid = false;
   } else {
      clearError(userClass);
   }

   // section validation
   if (section.value.trim() === '') {
      showError(section, 'Please select your section.');
      isValid = false;
   } else {
      clearError(section);
   }

   if (isValid) {
      signUpBtn.innerHTML = '<i class="fas white fa-spinner fa-spin"></i> Wait...';
      signUpBtn.disabled = true;
      signUp(userName.value, userClass.value, section.value);
   } else {
      signUpBtn.innerHTML = 'Sign Up';
      signUpBtn.disabled = false;
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

function renderErrorMessage(action, message) {
   let box, button;

   if (action === 'signup') {
      box = signUpError;
      button = signUpBtn;
   } else {
      return;
   }

   box.innerText = message;
   box.style.display = 'block';
   button.innerHTML = action === 'signin' ? 'Sign In' : 'Sign Up';
   button.disabled = false;
}

function renderSuccessMessage(action, message) {
   let box, button;

   if (action === 'signup') {
      box = signUpSuccessMessage;
      button = signUpBtn;
   } else {
      return;
   }

   box.innerText = message;
   box.style.display = 'block';
   button.innerHTML = '<i class="fas white fa-check-circle"></i>';
   button.disabled = true;
}


// check if already signed in
checkAuth();