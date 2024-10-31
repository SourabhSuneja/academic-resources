import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://jmalbtekzzmktcvreyio.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptYWxidGVrenpta3RjdnJleWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2NjYzNzEsImV4cCI6MjA0NDI0MjM3MX0.vZtttF81KZh9zpHeB_qAk-upey532m75Tk7Itb0YggE';
  const supabase = createClient(supabaseUrl, supabaseKey);


// Select form components to be frequently manipulated
const signInBtn = document.getElementById('sign-in-btn');
const signUpBtn = document.getElementById('sign-up-btn');
const authError = document.getElementById('auth-error');
const loginSuccessMessage = document.getElementById('login-success-message');
const signUpError = document.getElementById('signup-error');
const signUpSuccessMessage = document.getElementById('signup-success-message');

  // Function to fetch student's name, class and section (as was provided during sign up)
  async function getStudentInfo() {
    const { data: { user }, error } = await supabase.auth.getUser();
    let details;
    if(error) {
        console.error('Error fetching details');
    }
    if(user) {
        details = {
          "name": user.user_metadata['name'],
          "class": user.user_metadata['class'],
          "section": user.user_metadata['section']
        };
    }
    return details;
  }

  // Function to check authentication status
  function checkAuth() {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // User is signed in, fetch the user data
        const userId = session.user.id;
        //alert(fetchUserData(userId, 'students'));
        document.getElementById('authentication-happening').innerHTML = '<i class="fas white fa-check-circle"></i> Verified';
      } else {
        // User is not signed in, redirect to OAuth screen
        signInWithGoogle();
      }
    });
  }

  // Function to fetch user data
  function fetchUserData(userId, tableName) {
    supabase
      .from(tableName)
      .select('name')
      .eq('id', userId)
      .single()
      .then(({ data: user, error }) => {
        if (error) {
          renderErrorMessage(`Error fetching user data: ${error.message}`);
        } else {
          //renderWelcomeMessage(user.name);
        }
      });
  }

  // Function to sign out
  function signOut() {
    supabase.auth.signOut().then(({ error }) => {
      if (error) {
        renderErrorMessage(error.message);
      } else {
        checkAuth(); // Refresh the authentication state
      }
    });
  }

  // Function to sign in
  function signIn(email, password) {
    supabase.auth.signInWithPassword({ email, password }).then(({ data: { user }, error }) => {
      if (error) {
        renderErrorMessage('signin', error.message);
      } else { renderSuccessMessage('signin', 'Signed in successfully!');
      }
    });
  }

  // Function to sign up
  function signUp(name, userClass, section, email, password) {
    supabase.auth.signUp({
         email: email,
         password, password,
         options: {
             data: {
                "name": name,
                "class": userClass,
                "section": section
             }
         }
    }
).then(({ data: user, error }) => {
      if (error) {
        renderErrorMessage('signup', error.message);
        return;
      }

      supabase
        .from('students')
        .insert([{ id: user.user.id, name, "class": userClass, section }])
        .then(({ error: insertError }) => {
          if (insertError) {
            renderErrorMessage('signup', insertError.message);
          } else {
            renderSuccessMessage('signup', 'Account created successfully!');
          }
        });
    });
  }

async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://sourabhsuneja.github.io/academic-resources/auth/'
    }
  });

  if (error) {
    renderErrorMessage('signin', error.message);
    return;
  }

}

// function to show sign in form
function showSignInForm() {
    document.getElementById('authentication-happening').style.display = 'none';
    document.getElementById('sign-in-form').classList.add('active');
}

// function to show sign up form
function showSignUpForm() {
    document.getElementById('authentication-happening').style.display = 'none';
    document.getElementById('sign-up-form').classList.add('active');
}

// attach event listener to sign up link
document.getElementById('show-sign-up').addEventListener('click', function () {
    document.getElementById('sign-in-form').classList.remove('active');
    document.getElementById('sign-up-form').classList.add('active');
});

document.getElementById('show-sign-in').addEventListener('click', function () {
    document.getElementById('sign-up-form').classList.remove('active');
    document.getElementById('sign-in-form').classList.add('active');
});

// Form Validation
document.getElementById('sign-up-form').addEventListener('submit', function (event) {
    event.preventDefault();
    let isValid = true;

    // Clear previous error
    signUpError.textContent = '';
    signUpError.style.display = 'none';

    const name = document.getElementById('name');
    const email = document.getElementById('sign-up-email');
    const password = document.getElementById('sign-up-password');
    const confirmPassword = document.getElementById('confirm-password');
    const userClass = document.getElementById('class');
    const section = document.getElementById('section');

    // Name Validation
    if (name.value.trim().length < 3) {
        showError(name, 'Name must be at least 3 characters long.');
        isValid = false;
    } else {
        clearError(name);
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

    // Email Validation
    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email.');
        isValid = false;
    } else {
        clearError(email);
    }

    // Password Validation
    if (password.value.length < 6 || !/\d/.test(password.value)) {
        showError(password, 'Password must be at least 6 characters long and contain at least one digit.');
        isValid = false;
    } else {
        clearError(password);
    }

    // Confirm Password Validation
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match.');
        isValid = false;
    } else {
        clearError(confirmPassword);
    }

    if (isValid) {
        signUpBtn.innerHTML = '<i class="fas white fa-spinner fa-spin"></i> Wait...';
        signUpBtn.disabled = true;
        signUp(name.value.trim(), userClass.value, section.value, email.value.trim(), password.value)
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

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function renderErrorMessage(action, message) {
    let box, button;

    if (action === 'signin') {
        box = authError;
        button = signInBtn;
    } else if (action === 'signup') {
        box = signUpError;
        button = signUpBtn;
    }

    box.innerText = message;
    box.style.display = 'block';
    button.innerHTML = action === 'signin'? 'Sign In' : 'Sign Up';
    button.disabled = false;
}

function renderSuccessMessage(action, message) {
    let box, button;

    if (action === 'signin') {
        box = loginSuccessMessage;
        button = signInBtn;
    } else if (action === 'signup') {
        box = signUpSuccessMessage;
        button = signUpBtn;
    }

    box.innerText = message;
    box.style.display = 'block';
    button.innerHTML = '<i class="fas white fa-check-circle"></i>';
    button.disabled = true;
}

// Sign-In form validation for authorization failure
document.getElementById('sign-in-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    // Basic checks for empty email or password
    if (email.value.trim() === '' || password.value === '') {
        authError.textContent = 'Email and password are required.';
        authError.style.display = 'block';
        signInBtn.innerHTML = 'Sign In';
        signInBtn.disabled = false;
    } else {
        // Clear previous error
        authError.textContent = '';
        authError.style.display = 'none';
        // show waiting animation on sign in button
        signInBtn.innerHTML = '<i class="fas white fa-spinner fa-spin"></i> Wait...';
        signInBtn.disabled = true;

        // call signIn function
        signIn(email.value.trim(), password.value);
        
    }
});

// check if already signed in
checkAuth();

