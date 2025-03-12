import { useEffect, useState } from "react";
import { getCharacters } from "../services/ram-api";
import { Character } from "../types/ram-api";

export const useCharacters = () => {
  const [characters, setCharacters] = useState<[Character[]] | []>([]);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(false);
  const [pagination, setPagination] = useState({
    hasPrevious: false,
    hasNext: false,
    current: 1,
    pages: 0
  })
  const [isSearching, setIsSearching] = useState(false);
  const [searchName, setSearchName] = useState("");

  const fetchCharacters = async ({ page = 1, isSearching }: { page?: number; isSearching?: boolean }) => {
    try {
      setIsLoadingCharacters(true);

      const params: { page: number; search?: string } = { page };
      if (isSearching) params.search = searchName;

      const { results: fetchedCharacters, info: { next, prev, pages } } = await getCharacters(params);
      const newCharacters: [Character[]] | [] = [...characters];
      
      newCharacters[page] = fetchedCharacters;

      setPagination({
        hasPrevious: !!prev,
        hasNext: !!next,
        current: page,
        pages
      })
      setCharacters(newCharacters);
      setIsLoadingCharacters(false);
    } catch (error) {
      console.error("Error fetching people:", error);
      setIsLoadingCharacters(false);
    }
  };

  const handleChangePage = (pageSum: number) => {
    fetchCharacters({ page: pagination.current + pageSum, isSearching });
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
    pagination: {...pagination, handleChangePage},
    isSearching,
    searchName,
    setSearchName,
    handleSearch,
    handleClearSearch,
    handleChangePage,
  };
};
