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
        setSearchName(event.target.value);
      }}
      value={searchName}
      />
      <button onClick={handleSearch} className={classes['search-bar__button']}>Search</button>
    </div>
    {isSearching && (  
    <div className={classes['search-bar__info']}>
      <span>Searching for: {searchName} </span>
      <button onClick={handleClearSearch} className={classes['search-bar__button']}>X Clear search</button>
    </div> 
    )}

    </> 
  )
}