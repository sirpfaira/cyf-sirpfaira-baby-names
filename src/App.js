import './App.css';
import React, { useState } from 'react';
import babyNames from './data/babyNamesData.json';

function App() {
  const [displayArray, setDisplayArray] = useState(babyNames);

  const updateDisplay = (event) => {
    let word = event.target.value;

    if (word) {
      setDisplayArray(
        babyNames.filter((baby) =>
          baby.name.toUpperCase().includes(word.toUpperCase())
        )
      );
    } else {
      setDisplayArray(babyNames);
    }
  };

  return (
    <div className='container'>
      <div className='search-div'>
        <input
          className='search-box form-control'
          type='text'
          placeholder='Search baby name'
          onChange={updateDisplay}
        />
      </div>

      <div className='all-div'>
        <ul className='names-ul'>
          {displayArray
            .sort((baby1, baby2) => (baby1.name > baby2.name ? 1 : -1))
            .map((baby, index) => (
              <li
                key={index}
                className={baby.sex === 'm' ? 'boy-name' : 'girl-name'}
              >
                {baby.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
