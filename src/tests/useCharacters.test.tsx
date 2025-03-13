import { act, renderHook, waitFor } from "@testing-library/react";
import { Mock, vi } from "vitest";
import { useCharacters } from "../hooks/useCharacters";
import { getCharacters } from "../services/ram-api";

vi.mock("../services/ram-api", () => ({
  getCharacters: vi.fn(),
}));

const mockResponse = {
  results: [
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      gender: "Male",
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    },
  ],
  info: { next: "url", prev: null, pages: 42 },
};

describe("useCharacters Hook", () => {
  it("fetches and updates characters correctly", async () => {
    (getCharacters as Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCharacters("Rick"));

    await waitFor(() => expect(result.current.isLoadingCharacters).toBe(true));

    await waitFor(() => {
      expect(result.current.characters[1]).toEqual(mockResponse.results);
    });
  });

  it("can navigate to the next page", async () => {
    (getCharacters as Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCharacters("Rick"));

    await waitFor(() => {
      expect(result.current.isLoadingCharacters).toBe(false);
    });

    act(() => {
      result.current.pagination.onClickNext();
    });

    expect(result.current.currentPage).toBe(2);

    await waitFor(() => {
      expect(result.current.isLoadingCharacters).toBe(false);
    });
  });

  it("can go to page 2 and go back to page 1", async () => {
    (getCharacters as Mock).mockResolvedValue(mockResponse);
  
    const { result } = renderHook(() => useCharacters("Rick"));
  
    await waitFor(() => {
      expect(result.current.isLoadingCharacters).toBe(false);
    });
  
    act(() => {
      result.current.pagination.onClickNext();
    });
  
    await waitFor(() => {
      expect(result.current.currentPage).toBe(2);
    });
  
    act(() => {
      result.current.pagination.onClickPrev();
    });
  
    expect(result.current.currentPage).toBe(1);
  });
  
});
