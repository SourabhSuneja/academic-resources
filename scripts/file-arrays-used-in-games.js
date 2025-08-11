// script for listing classwise file arrays to be used across all games

// Function to get URL parameter by name
function getQueryParam(name) {
   const urlParams = new URLSearchParams(window.location.search);
   return urlParams.get(name);
}

// Get the grade from the URL, default to 6 if missing or invalid
const grade = parseInt(getQueryParam('grade')) || 6;
const validGrade = [6, 7, 8].includes(grade) ? grade : 6;

// fetch different files depending on grade
let gradeArray;
switch (validGrade) {
   case 6:
      gradeArray = ['avartan-6-ch-1', 'avartan-6-ch-2', 'avartan-6-ch-3', 'avartan-6-ch-5'];
      break;
   case 7:
      gradeArray = ['avartan-7-ch-2', 'avartan-7-ch-4'];
      break;
   case 8:
      gradeArray = ['kips-8-ch-4', 'between-8-ch-4', 'kips-8-ch-3', 'between-8-ch-3', 'kips-8-ch-1', 'between-8-ch-1'];
      break;
   default:
      gradeArray = [];
      console.log("Invalid grade");
}
