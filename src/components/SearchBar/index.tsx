import { useState } from "react";
import { SlClose, SlMagnifier } from "react-icons/sl";
import classes from './index.module.scss';

interface SearchBarProps {
  isSearching: boolean;
  searchName: string;
  onSearch: (search: string) => void;
  onClearSearch: () => void;
}

export function SearchBar ({isSearching, searchName, onSearch, onClearSearch} : SearchBarProps) {

  const [searchTerm, setSearchterm] = useState('')

  return (
    <>
      <div className={classes['search-bar__wrapper']}>
      <input 
      className={classes['search-bar__input']} 
      type="text" 
      placeholder="Search for character name"  
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        value = value.replace(/^\s+/, "");
        setSearchterm(value);
      }}
      value={searchTerm}
      />
      <button 
        onClick={() => {
          onSearch(searchTerm);
          setSearchterm('')
        }} 
        className={classes['search-bar__button']}
      >
        <SlMagnifier />Search
      </button>
    </div>
    {isSearching && (  
    <div className={classes['search-bar__info']}>
      <button onClick={onClearSearch} className={classes['search-bar__button']}>
        <SlClose />Clear search
      </button>
      <p className={classes['search-bar__info__text']}>Searching for <span>{searchName}</span></p>
    </div> 
    )}

    </> 
  )
}