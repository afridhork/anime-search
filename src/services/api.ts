import { SearchResponse, AnimeDetailResponse, Anime } from '../types/anime';

const BASE_URL = 'https://api.jikan.moe/v4';

let searchController: AbortController | null = null;
let detailController: AbortController | null = null;

export const searchAnime = async (query: string, page: number = 1): Promise<SearchResponse> => {
  if (searchController) {
    searchController.abort();
  }

  searchController = new AbortController();

  try {
    const response = await fetch(
      `${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=20`,
      { signal: searchController.signal }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch anime: ${response.statusText}`);
    }

    const data: SearchResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request cancelled');
    }
    throw error;
  }
};

export const getAnimeById = async (id: number): Promise<Anime> => {
  if (detailController) {
    detailController.abort();
  }

  detailController = new AbortController();

  try {
    const response = await fetch(`${BASE_URL}/anime/${id}`, {
      signal: detailController.signal,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch anime details: ${response.statusText}`);
    }

    const data: AnimeDetailResponse = await response.json();
    return data.data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request cancelled');
    }
    throw error;
  }
};
