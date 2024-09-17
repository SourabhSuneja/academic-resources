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

// function to generate word/hint list
function generateWordList(allWordData) {
    const wordList = [];

    allWordData.forEach((wordData) => {
        // Get the word and convert to lowercase
        const word = wordData.word.toLowerCase();
        
        // Filter out words with spaces and words with more than 5 unique letters
        if (word.includes(' ')) return;

        const uniqueLetters = new Set(word.replace(/[^a-z]/gi, '').split(''));
        if (uniqueLetters.size <= 5) {
            let hint = '';
            
            // 70% chance to use meaning as the hint, 30% for synonym/antonym
            const randomHintType = Math.random();
            
            if (randomHintType < 0.7) {
                // Use the first part of the meaning if there are multiple parts
                const firstMeaning = wordData.meaning.split(';')[0];
                hint = firstMeaning.trim();
            } else if (randomHintType < 0.85 && wordData.synonym) {
                // Use synonym as the hint
                hint = `The synonym for this word is ${wordData.synonym}.`;
            } else if (wordData.antonym) {
                // Use antonym as the hint
                hint = `The antonym for this word is ${wordData.antonym}.`;
            }

            // Add the word and hint to the wordList array
            wordList.push({ word, hint });
        }
    });

    return wordList;
}