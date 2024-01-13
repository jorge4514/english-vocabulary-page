import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function shuffleArray(array) {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    // Check if the data is already in the localStorage for each JSON file
    const jsonFiles = ['output']; // Add your actual file names here
    let cachedData = [];

    jsonFiles.forEach((fileName) => {
      const cachedDataForFile = localStorage.getItem(`${fileName}_cachedData`);
      if (cachedDataForFile) {
        cachedData = cachedData.concat(JSON.parse(cachedDataForFile));
      } else {
        fetchData(fileName);
      }
    });

    // Filter out words where "learned" is false
    const unlearnedWords = cachedData.filter((word) => word.learned === 'false');

    // Shuffle the array and get the first 5 words
    const shuffledWords = shuffleArray(unlearnedWords);
    setWords(shuffledWords.slice(0, 5));
  }, []);

  const fetchData = async (fileName) => {
    try {
      const response = await fetch(`./${fileName}.json`);
      const data = await response.json();

      // Save the data to the localStorage with a unique key based on the file name
      localStorage.setItem(`${fileName}_cachedData`, JSON.stringify(data));
    } catch (error) {
      console.error(`Error fetching data for ${fileName}:`, error);
    }
  };

  const handleLearnedClick = (index) => {
    words[index].learned = true;
    console.log(words[index]);
  };

  const handleTranslateClick = async (index) => {
    const wordToTranslate = words[index].word;
  
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${wordToTranslate}&langpair=en|es`);
      
      if (!response.ok) {
        throw new Error(`Translation request failed with status: ${response.status}`);
      }
  
      const data = await response.json();
      const id = document.getElementById(wordToTranslate);
      id.innerHTML = data.responseData.translatedText;
    } catch (error) {
      console.error('Error during translation request:', error);
    }
  };
  

  return (
    <div className="h-100 container mt-4">
      <div className="h-100 d-flex align-items-center justify-content-center">
        {words.map((item, index) => (
          <div
            key={index}
            className="word-item text-center col-md-2"
          >
            <div className="word-text">{item.word}</div>
            <div id={item.word}></div>
            <div className='options-container'>
              <button
                className="btn btn-outline-primary btn-sm btn-learn mt-auto"
                onClick={() => handleTranslateClick(index)}
              >
                Translate
              </button>
              <button
                className="btn btn-outline-success btn-sm btn-learn mt-auto"
                onClick={() => handleLearnedClick(index)}
              >Learned
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
