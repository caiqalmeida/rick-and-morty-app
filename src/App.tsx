import { useEffect, useState } from 'react';
import './App.css';
import { CharactersList, Pagination, SearchBar, Title } from './components';
import { getCharacters } from './services/ram-api';
import { Character } from './types/ram-api';

function App() {

  const [characters, setCharacters] = useState<[Character[]] | []>([]);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const [hasPreviousPage, setHasPreviousPage] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(false)

  const [isSearching, setIsSearching] = useState(false);
  const [searchName, setSearchName] = useState('')


  const fetchCharacters = async ({ page = 1, isSearching }: { page?: number; isSearching?: boolean }) => {

    try {

      // TO DO: If already fetched that page just change the page, if dont, fetch it
      // if(characters[page]) {
      //   setCurrentPage(page)
      //   return
      // }

      const params: { page: number; search?: string } = { page };
      if (isSearching) params.search = searchName;

      setIsLoadingCharacters(true)

      const { results: fetchedCharacters, info: {next, prev}  } = await getCharacters(params);
      const newCharacters: [Character[]] | [] = [...characters];
      newCharacters[page] = fetchedCharacters;

      setHasPreviousPage(!!prev)
      setHasNextPage(!!next)
      setCurrentPage(page)
      setCharacters(newCharacters);
      setIsLoadingCharacters(false)
    } catch (error) {
      console.error('Error fetching people:', error);
      setIsLoadingCharacters(false)
    }
  };

  const handleChangePage = (pageSum: number) => {
    fetchCharacters({page: currentPage+pageSum, isSearching})
  }

  const handleSearch = () => {
    setIsSearching(true)
    return fetchCharacters({page: 1, isSearching: true})
  }

  const handleClearSearch = () => {
    setIsSearching(false)
    setSearchName("")
    return fetchCharacters({page: 1})
  }

  useEffect(() => {
    fetchCharacters({page: 1})
  }, [])

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
