         const allWordData = [];
         // Function to fetch data from all 7 JSON files
         function fetchWords() {
         const jsonFiles = [
         'data1.json', 'data2.json', 'data3.json', 'data4.json',
         'data5.json', 'data6.json', 'data7.json'
         ];

         const baseURL = 'https://sourabhsuneja.github.io/word-of-the-day/';

         // Fetch all JSON files
         jsonFiles.forEach(file => {
         fetch(`${baseURL}${file}`)
             .then(response => {
                 if (!response.ok) {
                     throw new Error('Network response was not ok');
                 }
                 return response.json();
             })
             .then(data => {
                 // Push all words into the global allWordData array
                 allWordData.push(...data.words);
             })
             .catch(error => {
                 console.error('Error fetching words:', error);
             });
         });
         }