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
      gradeArray = ['kips-6-ch-5', 'kips-6-ch-6', 'kips-6-ch-7', 'kips-6-ch-8'];
      break;
   case 7:
      gradeArray = ['kips-7-ch-5', 'kips-7-ch-6', 'kips-7-ch-7', 'kips-7-ch-8'];
      break;
   case 8:
      gradeArray = ['kips-8-ch-4', 'between-8-ch-4', 'kips-8-ch-3', 'between-8-ch-3', 'kips-8-ch-1', 'between-8-ch-1'];
      break;
   default:
      gradeArray = [];
      console.log("Invalid grade");
}
