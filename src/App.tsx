import './App.css';
import { CharactersList, Pagination, SearchBar, Title } from './components';
import { useCharacters } from './hooks/useCharacters';

function App() {

  const {
    characters,
    isLoadingCharacters,
    currentPage,
    hasPreviousPage,
    hasNextPage,
    isSearching,
    searchName,
    setSearchName,
    handleSearch,
    handleClearSearch,
    handleChangePage,
  } = useCharacters();

  return (
    <>
      <Title />
      <SearchBar isSearching={isSearching} searchName={searchName} setSearchName={setSearchName} handleSearch={handleSearch} handleClearSearch={handleClearSearch} />
      <CharactersList characters={characters} isLoadingCharacters={isLoadingCharacters} currentPage={currentPage} />
      <Pagination currentPage={currentPage} hasPreviousPage={hasPreviousPage} hasNextPage={hasNextPage} handleChangePage={handleChangePage} isLoadingCharacters={isLoadingCharacters} />
    </>
  )
}

export default App
