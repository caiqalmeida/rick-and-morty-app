import { SlClose, SlMagnifier } from "react-icons/sl";
import classes from './index.module.scss';

interface SearchBarProps {
  isSearching: boolean;
  searchName: string;
  setSearchName: (search: string) => void;
  handleSearch: () => void;
  handleClearSearch: () => void;
}

export function SearchBar ({isSearching, searchName, setSearchName, handleSearch, handleClearSearch} : SearchBarProps) {

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
        setSearchName(value);
      }}
      value={searchName}
      />
      <button onClick={handleSearch} className={classes['search-bar__button']}>
        <SlMagnifier />Search
      </button>
    </div>
    {isSearching && (  
    <div className={classes['search-bar__info']}>
      <button onClick={handleClearSearch} className={classes['search-bar__button']}>
        <SlClose />Clear search
      </button>
      <p className={classes['search-bar__info__text']}>Searching for <span>{searchName}</span></p>
    </div> 
    )}

    </> 
  )
}