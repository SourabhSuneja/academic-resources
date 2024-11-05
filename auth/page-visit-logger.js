import {
   createClient
} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

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

          // user is authenticated and students table has relevant details
          // now log the page visit
          logVisit(document.title);
      } 
   } catch (error) {
      
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

// Function to log page visits
function logVisit(page) {
   if (!userId) {
      return;
   }
   supabase
      .from('visit_logs')
      .insert([{
         visitor_id: userId,
         page
      }])
      .then(({
         error: insertError
      }) => {
         if (insertError) {
           return;
         } else {
            return;
         }
      });
}

async function init() {
  try {
    await checkAuth();
  } catch (err) {
    
  }
}

init();
