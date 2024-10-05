// Function to get URL parameter by name
function getQueryParam(name) {
   const urlParams = new URLSearchParams(window.location.search);
   return urlParams.get(name);
}

// Get the grade from the URL, default to 6 if missing or invalid
const grade = parseInt(getQueryParam('grade')) || 6;
const validGrade = [6, 7, 8].includes(grade) ? grade : 6;

// Variable to hold the tracks to be played
let track_list;

switch (validGrade) {
   case 6:
      track_list = [
  {
    name: "Introduction to Excel",
    artist: "By Sourabh Sir",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Microsoft_Excel_2013-2019_logo.svg/1200px-Microsoft_Excel_2013-2019_logo.svg.png",
    path: "https://sourabhsuneja.github.io/academic-resources/class-6/audio/ch-5-excel-intro.mp3"
  },
  {
    name: "How Excel Works?",
    artist: "By Sourabh Sir",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Microsoft_Excel_2013-2019_logo.svg/1200px-Microsoft_Excel_2013-2019_logo.svg.png",
    path: "https://sourabhsuneja.github.io/academic-resources/class-6/audio/ch-5-excel-working.mp3"
  },
  {
    name: "Uses of Excel",
    artist: "By Sourabh Sir",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Microsoft_Excel_2013-2019_logo.svg/1200px-Microsoft_Excel_2013-2019_logo.svg.png",
    path: "https://sourabhsuneja.github.io/academic-resources/class-6/audio/ch-5-excel-uses.mp3"
  },

];
      break;
   case 7:
      // add track list here
      break;
   case 8:
      track_list = [
  {
    name: "What is Data Visualisation?",
    artist: "By Sourabh Sir",
    image: "https://sourabhsuneja.github.io/academic-resources/images/music-icon.png",
    path: "https://sourabhsuneja.github.io/academic-resources/class-8/audio/ch-3-data-visualisation-intro.mp3"
  },

];
      break;
   default:
      track_list =  [];
      console.log("Invalid grade");
}




