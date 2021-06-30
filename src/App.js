import './App.css';
import React, { useState } from 'react';
import babyNames from './data/babyNamesData.json';
import boyIcon from './data/boy.png';
import girlIcon from './data/girl.png';
import allIcon from './data/all.png';

function App() {
  const sortedRawNames = [...babyNames];
  const [allNames, setAllNames] = useState(
    sortedRawNames.sort((baby1, baby2) => (baby1.name > baby2.name ? 1 : -1))
  );
  const [favouriteNames, setFavouriteNames] = useState([]);
  const [category, setCategory] = useState('all');
  const [searchWord, setSearchWord] = useState('');

  const showGirlNames = () => {
    setCategory('girl');
  };

  const showBoyNames = () => {
    setCategory('boy');
  };

  const showAllNames = () => {
    setCategory('all');
  };

  const moveToFavourites = (event) => {
    const id = event.target.id;

    if (id > -1 && id < allNames.length) {
      if (category === 'girl') {
        //TODO
      } else if (category === 'boy') {
        //TODO
      } else {
        const tempArr = [...allNames];
        const removedEl = tempArr[id];
        tempArr.splice(id, 1);
        setFavouriteNames((preState) =>
          preState
            .concat(removedEl)
            .sort((baby1, baby2) => (baby1.name > baby2.name ? 1 : -1))
        );
        setAllNames(
          tempArr.sort((baby1, baby2) => (baby1.name > baby2.name ? 1 : -1))
        );
      }
    }
  };

  const moveToAllNames = (event) => {
    const id = event.target.id;
    if (id > -1 && id < favouriteNames.length) {
      if (category === 'girl') {
        //TODO
      } else if (category === 'boy') {
        //TODO
      } else {
        const tempArr = [...favouriteNames];
        const removedEl = tempArr[id];
        tempArr.splice(id, 1);
        setAllNames((preState) =>
          preState
            .concat(removedEl)
            .sort((baby1, baby2) => (baby1.name > baby2.name ? 1 : -1))
        );
        setFavouriteNames(
          tempArr.sort((baby1, baby2) => (baby1.name > baby2.name ? 1 : -1))
        );
      }
    }
  };

  const changeSearchWord = (event) => {
    setSearchWord(event.target.value);
  };

  return (
    <div className='container'>
      <Search
        showGirlNames={showGirlNames}
        showBoyNames={showBoyNames}
        showAllNames={showAllNames}
        changeSearchWord={changeSearchWord}
        category={category}
      />
      <FavouriteList
        favouriteNames={favouriteNames}
        category={category}
        moveToAllNames={moveToAllNames}
        searchWord={searchWord}
      />
      <AllNamesList
        allNames={allNames}
        category={category}
        moveToFavourites={moveToFavourites}
        searchWord={searchWord}
      />
    </div>
  );
}

const AllNamesList = ({ allNames, category, moveToFavourites, searchWord }) => {
  let list = [];

  if (category === 'boy') {
    list = allNames.filter((baby) => baby.sex === 'm');
  } else if (category === 'girl') {
    list = allNames.filter((baby) => baby.sex === 'f');
  } else {
    list = [...allNames];
  }

  if (searchWord) {
    const tempArr = [...list];
    list = tempArr.filter((baby) =>
      baby.name.toUpperCase().includes(searchWord.toUpperCase())
    );
  }

  return (
    <div className='all-div'>
      <ul className='names-ul'>
        {list
          .sort((baby1, baby2) => (baby1.name > baby2.name ? 1 : -1))
          .map((baby, index) => (
            <li
              key={index}
              id={index}
              className={baby.sex === 'm' ? 'boy-name' : 'girl-name'}
              onClick={moveToFavourites}
            >
              {baby.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

const Search = ({
  showGirlNames,
  showBoyNames,
  showAllNames,
  changeSearchWord,
  category,
}) => {
  return (
    <div className='search-div'>
      <input
        className='search-box form-control'
        type='text'
        placeholder='Search baby name'
        onChange={changeSearchWord}
      />

      <div
        className={
          category === 'all' ? 'icon-holder active' : 'icon-holder inactive'
        }
        onClick={showAllNames}
      >
        <img src={allIcon} alt='All People Icon' className='gender-icon' />
      </div>
      <div
        className={
          category === 'girl' ? 'icon-holder active' : 'icon-holder inactive'
        }
        onClick={showGirlNames}
      >
        <img src={girlIcon} alt='Girl Icon' className='gender-icon' />
      </div>
      <div
        className={
          category === 'boy' ? 'icon-holder active' : 'icon-holder inactive'
        }
        onClick={showBoyNames}
      >
        <img src={boyIcon} alt='Boy Icon' className='gender-icon' />
      </div>
    </div>
  );
};

const FavouriteList = ({
  favouriteNames,
  category,
  moveToAllNames,
  searchWord,
}) => {
  let list = [];
  if (category === 'boy') {
    list = favouriteNames.filter((baby) => baby.sex === 'm');
  } else if (category === 'girl') {
    list = favouriteNames.filter((baby) => baby.sex === 'f');
  } else {
    list = [...favouriteNames];
  }

  if (searchWord) {
    //console.log(`searchWord in all names true =>${searchWord}`);
    const tempArr = [...list];
    list = tempArr.filter((baby) =>
      baby.name.toUpperCase().includes(searchWord.toUpperCase())
    );
  }

  return (
    <div className='favs-div'>
      <ul className='names-ul'>
        <p className='fav-label'>Favorites: </p>
        {list
          .sort((baby1, baby2) => (baby1.name > baby2.name ? 1 : -1))
          .map((baby, index) => (
            <li
              key={index}
              id={index}
              className={baby.sex === 'm' ? 'boy-name' : 'girl-name'}
              baby={baby}
              onClick={moveToAllNames}
            >
              {baby.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
