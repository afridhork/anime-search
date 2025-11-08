import { useEffect } from 'react';
import {
  Box,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
  Button,
  HStack,
  VStack,
  Heading,
} from '@chakra-ui/react';
import { Search, Film } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchAnimeSearch,
  setSearchQuery,
  clearSearchResults,
} from '../store/animeSlice';
import { useDebounce } from '../hooks/useDebounce';
import { AnimeCard } from '../components/AnimeCard';
import { AnimeCardSkeleton } from '../components/AnimeCardSkeleton';

export const SearchPage = () => {
  const dispatch = useAppDispatch();
  const { searchResults, isLoading, error, searchQuery, currentPage, hasNextPage } =
    useAppSelector((state) => state.anime);

  const debouncedSearchQuery = useDebounce(searchQuery, 250);

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      dispatch(fetchAnimeSearch({ query: debouncedSearchQuery, page: currentPage }));
    } else {
      dispatch(clearSearchResults());
    }
  }, [debouncedSearchQuery, currentPage, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
    if (currentPage !== 1) {
      dispatch(clearSearchResults());
    }
  };

  const handlePageChange = (page: number) => {
    if (debouncedSearchQuery.trim()) {
      dispatch(fetchAnimeSearch({ query: debouncedSearchQuery, page }));
    }
  };

  const renderContent = () => {
    if (error && !isLoading) {
      return (
        <Box
          bg="red.50"
          border="1px"
          borderColor="red.200"
          borderRadius="lg"
          p={8}
          textAlign="center"
        >
          <Heading size="md" color="red.600" mb={2}>
            Error!
          </Heading>
          <Text color="red.700">{error}</Text>
        </Box>
      );
    }

    if (!debouncedSearchQuery.trim() && !isLoading) {
      return (
        <VStack spacing={4} py={20} color="gray.500">
          <Film size={64} strokeWidth={1.5} />
          <Heading size="md" color="gray.700">
            Cari Anime Favoritmu
          </Heading>
          <Text textAlign="center" maxW="md">
            Ketik nama anime di kolom pencarian untuk menemukan anime yang kamu cari
          </Text>
        </VStack>
      );
    }

    if (isLoading) {
      return (
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={6}>
          {Array.from({ length: 20 }).map((_, index) => (
            <AnimeCardSkeleton key={index} />
          ))}
        </SimpleGrid>
      );
    }

    if (searchResults.length === 0 && debouncedSearchQuery.trim()) {
      return (
        <VStack spacing={4} py={20} color="gray.500">
          <Search size={64} strokeWidth={1.5} />
          <Heading size="md" color="gray.700">
            Tidak Ada Hasil
          </Heading>
          <Text textAlign="center" maxW="md">
            Tidak ditemukan anime dengan kata kunci "{debouncedSearchQuery}"
          </Text>
        </VStack>
      );
    }

    return (
      <>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={6}>
          {searchResults.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </SimpleGrid>

        {searchResults.length > 0 && (
          <HStack justify="center" mt={8} spacing={4}>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1 || isLoading}
              colorScheme="blue"
              variant="outline"
            >
              Previous
            </Button>
            <Text fontWeight="medium">Page {currentPage}</Text>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={!hasNextPage || isLoading}
              colorScheme="blue"
            >
              Next
            </Button>
          </HStack>
        )}
      </>
    );
  };

  return (
    <Box minHeight="100vh" bg="gray.50">
      <Box bg="white" boxShadow="sm" position="sticky" top="0" zIndex="sticky">
        <Container maxW="container.xl" py={6}>
          <VStack spacing={4} align="stretch">
            <Heading size="xl" color="blue.600">
              Anime Search
            </Heading>
            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none">
                <Search color="gray" />
              </InputLeftElement>
              <Input
                placeholder="Cari anime (contoh: Naruto, One Piece, Attack on Titan)"
                value={searchQuery}
                onChange={handleSearchChange}
                bg="white"
                borderColor="gray.300"
                _hover={{ borderColor: 'blue.400' }}
                _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
              />
            </InputGroup>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        {renderContent()}
      </Container>
    </Box>
  );
};
