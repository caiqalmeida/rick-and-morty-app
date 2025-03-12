import './App.css';
import { CharactersList, Pagination, SearchBar, Title } from './components';
import { useCharacters } from './hooks/useCharacters';

function App() {

  const {
    characters,
    isLoadingCharacters,
    pagination,
    isSearching,
    searchName,
    setSearchName,
    handleSearch,
    handleClearSearch,
  } = useCharacters();

  return (
    <>
      <Title />
      <SearchBar isSearching={isSearching} searchName={searchName} setSearchName={setSearchName} handleSearch={handleSearch} handleClearSearch={handleClearSearch} />
      <CharactersList characters={characters} isLoadingCharacters={isLoadingCharacters} currentPage={pagination.current} />
      <Pagination pagination={pagination} isLoadingCharacters={isLoadingCharacters} />
    </>
  )
}

export default App
