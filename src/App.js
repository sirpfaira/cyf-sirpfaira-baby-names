import './App.css';
import React, { useState } from 'react';
import babyNames from './data/babyNamesData.json';

function App() {
  const [allNames, setAllNames] = useState(babyNames);
  const [favNames, setFavNames] = useState([]);

  const updateAllNames = (event) => {
    let word = event.target.value;

    if (word) {
      setAllNames(
        babyNames.filter((baby) =>
          baby.name.toUpperCase().includes(word.toUpperCase())
        )
      );
    } else {
      setAllNames(babyNames);
    }
  };

  const moveToFavs = (event) => {
    const id = event.target.id;
    if (id > -1 && id < allNames.length) {
      let tempArr = [...allNames];
      const removedEl = tempArr.splice(id, 1);
      setFavNames((preState) => preState.concat(removedEl));
      setAllNames(tempArr);
    }
  };

  const moveToAll = (event) => {
    const id = event.target.id;
    if (id > -1 && id < favNames.length) {
      let tempArr = [...favNames];
      const removedEl = tempArr.splice(id, 1);
      setAllNames((preState) => preState.concat(removedEl));
      setFavNames(tempArr);
    }
  };

  const FavouriteList = () => {
    return (
      <div className='favs-div'>
        <ul className='names-ul'>
          <p className='fav-label'>Favorites: </p>
          {favNames
            .sort((baby1, baby2) => (baby1.name > baby2.name ? 1 : -1))
            .map((baby, index) => (
              <li
                key={index}
                id={index}
                className={baby.sex === 'm' ? 'boy-name' : 'girl-name'}
                baby={baby}
                onClick={moveToAll}
              >
                {baby.name}
              </li>
            ))}
        </ul>
      </div>
    );
  };

  const AllNames = () => {
    return (
      <div className='all-div'>
        <ul className='names-ul'>
          {allNames
            .sort((baby1, baby2) => (baby1.name > baby2.name ? 1 : -1))
            .map((baby, index) => (
              <li
                key={index}
                onClick={moveToFavs}
                id={index}
                className={baby.sex === 'm' ? 'boy-name' : 'girl-name'}
              >
                {baby.name}
              </li>
            ))}
        </ul>
      </div>
    );
  };
  return (
    <div className='container'>
      <div className='search-div'>
        <input
          className='search-box form-control'
          type='text'
          placeholder='Search baby name'
          onChange={updateAllNames}
        />
      </div>
      <FavouriteList />
      <hr />
      <AllNames />
    </div>
  );
}

export default App;
