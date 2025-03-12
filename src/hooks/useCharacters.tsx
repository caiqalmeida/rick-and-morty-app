import { useEffect, useState } from "react";
import { getCharacters } from "../services/ram-api";
import { Character } from "../types/ram-api";

export const useCharacters = () => {
  const [characters, setCharacters] = useState<[Character[]] | []>([]);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchName, setSearchName] = useState("");

  const fetchCharacters = async ({ page = 1, isSearching }: { page?: number; isSearching?: boolean }) => {
    try {
      const params: { page: number; search?: string } = { page };
      if (isSearching) params.search = searchName;

      setIsLoadingCharacters(true);

      const { results: fetchedCharacters, info: { next, prev } } = await getCharacters(params);
      const newCharacters: [Character[]] | [] = [...characters];
      
      newCharacters[page] = fetchedCharacters;

      setHasPreviousPage(!!prev);
      setHasNextPage(!!next);
      setCurrentPage(page);
      setCharacters(newCharacters);
      setIsLoadingCharacters(false);
    } catch (error) {
      console.error("Error fetching people:", error);
      setIsLoadingCharacters(false);
    }
  };

  const handleChangePage = (pageSum: number) => {
    fetchCharacters({ page: currentPage + pageSum, isSearching });
  };

  const handleSearch = () => {
    setIsSearching(true);
    return fetchCharacters({ page: 1, isSearching: true });
  };

  const handleClearSearch = () => {
    setIsSearching(false);
    setSearchName("");
    return fetchCharacters({ page: 1 });
  };

  useEffect(() => {
    fetchCharacters({ page: 1 });
  }, []);

  return {
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
  };
};
