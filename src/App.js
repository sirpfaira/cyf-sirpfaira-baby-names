import './App.css';
import React from 'react';
import babyNames from './data/babyNamesData.json';

function App() {
  return (
    <div className='container'>
      <ul className='names-ul'>
        {babyNames
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
  );
}

export default App;
