 // Function to fetch data from all 7 JSON files
async function fetchWords() {
    const jsonFiles = [
        'data1.json', 'data2.json', 'data3.json', 'data4.json',
        'data5.json', 'data6.json', 'data7.json'
    ];
    const allWordData = [];
    const baseURL = 'https://sourabhsuneja.github.io/word-of-the-day/';

    // Map the array of files to an array of fetch promises
    const fetchPromises = jsonFiles.map(async (file) => {
        try {
            const response = await fetch(`${baseURL}${file}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // Push all words into the allWordData array
            allWordData.push(...data.words);
        } catch (error) {
            console.error('Error fetching words:', error);
        }
    });

    // Wait for all fetches to complete
    await Promise.all(fetchPromises);

    // Return all the data after everything has been fetched and processed
    return allWordData;
}


// Function to generate word/hint list
async function generateWordList(allWordData) {
    return new Promise((resolve, reject) => {
        try {
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

            // Resolve the promise with wordList after processing
            resolve(wordList);
        } catch (error) {
            // If any error occurs, reject the promise
            reject(`Error generating word list: ${error.message}`);
        }
    });
}

const allWordData = await fetchWords();
const wordList = await generateWordList(allWordData);
