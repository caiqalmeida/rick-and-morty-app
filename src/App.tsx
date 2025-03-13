import { useState } from 'react';
import './App.css';
import { CharactersList, Pagination, SearchBar, Title } from './components';
import { useCharacters } from './hooks/useCharacters';

function App() {
  const [searchName, setSearchName] = useState("");

  const {
    characters,
    isLoadingCharacters,
    pagination,
    currentPage,
    isSearching,
    setIsSearching,
  } = useCharacters(searchName);

  const { resetPage } = pagination;

  const onSearch = (search: string) => {
    setSearchName(search);
    setIsSearching(true)
    resetPage()
  }

  const onClearSearch = () => {
    setSearchName('');
    setIsSearching(false)
    resetPage()
  }

  return (
    <>
      <Title />
      <SearchBar isSearching={isSearching} searchName={searchName} onSearch={onSearch} onClearSearch={onClearSearch} />
      <CharactersList characters={characters} isLoadingCharacters={isLoadingCharacters} currentPage={currentPage} />
      <Pagination currentPage={currentPage} pagination={pagination} isLoadingCharacters={isLoadingCharacters} />
    </>
  )
}

export default App
