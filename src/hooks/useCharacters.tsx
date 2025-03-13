import { useEffect, useState } from "react";
import { getCharacters } from "../services/ram-api";
import { Character } from "../types/ram-api";

export interface IPagination {
  pages: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
  onClickNext: () => void;
  onClickPrev: () => void;
  resetPage: () => void;
}

export const useCharacters = (searchName: string) => {

     const onClickNext = () => {
      setCurrentPage(current => current + 1);
    }

    const onClickPrev = () => {
      setCurrentPage(current => current - 1);
    }

    const resetPage = () => {
      setCurrentPage(1)
    }

  const [characters, setCharacters] = useState<[Character[]] | []>([]);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(false);
  const [currentPage, setCurrentPage]= useState(1);
  const [pagination, setPagination] = useState<IPagination>({
    hasPrevious: false,
    hasNext: false,
    pages: 0,
    onClickNext,
    onClickPrev,
    resetPage
  })
  const [isSearching, setIsSearching] = useState(false);

  const fetchCharacters = async ({ page = 1 }: { page?: number;  }) => {
    try {
      setIsLoadingCharacters(true);

      const params: { page: number; search?: string } = { page };
      if (isSearching && searchName) params.search = searchName;

      const { results: fetchedCharacters, info: { next, prev, pages } } = await getCharacters(params);
      const newCharacters: [Character[]] | [] = [...characters];
      
      newCharacters[page] = fetchedCharacters;

      setPagination({
        ...pagination,
        hasPrevious: !!prev,
        hasNext: !!next,
        pages,
      })
      setCharacters(newCharacters);
      setIsLoadingCharacters(false);
    } catch (error) {
      console.error("Error fetching people:", error);
      setIsLoadingCharacters(false);
    }
  };


  useEffect(() => {
    fetchCharacters({ page: currentPage });
  }, [currentPage, searchName, isSearching]);

  return {
    characters,
    isLoadingCharacters,
    pagination,
    currentPage,
    isSearching,
    setIsSearching,
  };
};
