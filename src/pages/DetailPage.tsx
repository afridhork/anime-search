import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Image,
  Text,
  Badge,
  HStack,
  VStack,
  Button,
  Heading,
  Grid,
  GridItem,
  Skeleton,
  SkeletonText,
  AspectRatio,
} from '@chakra-ui/react';
import { ArrowLeft, Star, Calendar, Tv, Clock, Users } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAnimeDetail } from '../store/animeSlice';

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentAnime, isLoadingDetail, error } = useAppSelector(
    (state) => state.anime
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAnimeDetail(Number(id)));
    }
  }, [id, dispatch]);

  if (error) {
    return (
      <Box minHeight="100vh" bg="gray.50" py={8}>
        <Container maxW="container.xl">
          <Button
            leftIcon={<ArrowLeft size={20} />}
            onClick={() => navigate('/')}
            mb={6}
            variant="ghost"
          >
            Back to Search
          </Button>
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
        </Container>
      </Box>
    );
  }

  if (isLoadingDetail || !currentAnime) {
    return (
      <Box minHeight="100vh" bg="gray.50" py={8}>
        <Container maxW="container.xl">
          <Skeleton height="40px" width="150px" mb={6} />
          <Grid templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={8}>
            <GridItem>
              <Skeleton height="420px" borderRadius="lg" />
            </GridItem>
            <GridItem>
              <VStack align="stretch" spacing={4}>
                <Skeleton height="40px" />
                <SkeletonText noOfLines={3} spacing={4} />
                <SkeletonText noOfLines={6} spacing={4} />
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <Box minHeight="100vh" bg="gray.50">
      <Box
        bgGradient="linear(to-b, blue.600, blue.400)"
        color="white"
        py={8}
        mb={8}
      >
        <Container maxW="container.xl">
          <Button
            leftIcon={<ArrowLeft size={20} />}
            onClick={() => navigate('/')}
            mb={6}
            variant="ghost"
            color="white"
            _hover={{ bg: 'whiteAlpha.200' }}
          >
            Back to Search
          </Button>
          <Heading size="2xl">{currentAnime.title}</Heading>
          {currentAnime.title_english && currentAnime.title_english !== currentAnime.title && (
            <Text fontSize="lg" mt={2} opacity={0.9}>
              {currentAnime.title_english}
            </Text>
          )}
        </Container>
      </Box>

      <Container maxW="container.xl" pb={12}>
        <Grid templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={8}>
          <GridItem>
            <VStack align="stretch" spacing={4}>
              <Image
                src={currentAnime.images.jpg.large_image_url}
                alt={currentAnime.title}
                borderRadius="lg"
                boxShadow="lg"
                fallbackSrc="https://via.placeholder.com/300x420?text=No+Image"
              />
              {currentAnime.trailer?.embed_url && (
                <Box>
                  <Heading size="sm" mb={3}>
                    Trailer
                  </Heading>
                  <AspectRatio ratio={16 / 9} borderRadius="md" overflow="hidden">
                    <iframe
                      src={currentAnime.trailer.embed_url}
                      title="YouTube video player"
                      allowFullScreen
                    />
                  </AspectRatio>
                </Box>
              )}
            </VStack>
          </GridItem>

          <GridItem>
            <VStack align="stretch" spacing={6}>
              <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
                <HStack spacing={3} mb={4} flexWrap="wrap">
                  {currentAnime.score && (
                    <Badge
                      colorScheme="yellow"
                      fontSize="md"
                      px={3}
                      py={1}
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <Star size={14} fill="currentColor" />
                      {currentAnime.score} / 10
                    </Badge>
                  )}
                  {currentAnime.type && (
                    <Badge colorScheme="blue" fontSize="md" px={3} py={1}>
                      {currentAnime.type}
                    </Badge>
                  )}
                  <Badge
                    colorScheme={currentAnime.airing ? 'green' : 'gray'}
                    fontSize="md"
                    px={3}
                    py={1}
                  >
                    {currentAnime.status}
                  </Badge>
                </HStack>

                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  {currentAnime.episodes && (
                    <HStack>
                      <Tv size={18} />
                      <VStack align="start" spacing={0}>
                        <Text fontSize="xs" color="gray.500">
                          Episodes
                        </Text>
                        <Text fontWeight="bold">{currentAnime.episodes}</Text>
                      </VStack>
                    </HStack>
                  )}
                  {currentAnime.duration && (
                    <HStack>
                      <Clock size={18} />
                      <VStack align="start" spacing={0}>
                        <Text fontSize="xs" color="gray.500">
                          Duration
                        </Text>
                        <Text fontWeight="bold">{currentAnime.duration}</Text>
                      </VStack>
                    </HStack>
                  )}
                  {currentAnime.aired?.string && (
                    <HStack>
                      <Calendar size={18} />
                      <VStack align="start" spacing={0}>
                        <Text fontSize="xs" color="gray.500">
                          Aired
                        </Text>
                        <Text fontWeight="bold" fontSize="sm">
                          {currentAnime.aired.string}
                        </Text>
                      </VStack>
                    </HStack>
                  )}
                  {currentAnime.members && (
                    <HStack>
                      <Users size={18} />
                      <VStack align="start" spacing={0}>
                        <Text fontSize="xs" color="gray.500">
                          Members
                        </Text>
                        <Text fontWeight="bold">
                          {currentAnime.members.toLocaleString()}
                        </Text>
                      </VStack>
                    </HStack>
                  )}
                </Grid>
              </Box>

              {currentAnime.synopsis && (
                <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
                  <Heading size="md" mb={3}>
                    Synopsis
                  </Heading>
                  <Text lineHeight="tall" color="gray.700">
                    {currentAnime.synopsis}
                  </Text>
                </Box>
              )}

              {currentAnime.background && (
                <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
                  <Heading size="md" mb={3}>
                    Background
                  </Heading>
                  <Text lineHeight="tall" color="gray.700">
                    {currentAnime.background}
                  </Text>
                </Box>
              )}

              {currentAnime.genres.length > 0 && (
                <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
                  <Heading size="md" mb={3}>
                    Genres
                  </Heading>
                  <HStack spacing={2} flexWrap="wrap">
                    {currentAnime.genres.map((genre) => (
                      <Badge key={genre.mal_id} colorScheme="purple" fontSize="sm">
                        {genre.name}
                      </Badge>
                    ))}
                  </HStack>
                </Box>
              )}

              {currentAnime.studios.length > 0 && (
                <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
                  <Heading size="md" mb={3}>
                    Studios
                  </Heading>
                  <HStack spacing={2} flexWrap="wrap">
                    {currentAnime.studios.map((studio) => (
                      <Badge key={studio.mal_id} colorScheme="cyan" fontSize="sm">
                        {studio.name}
                      </Badge>
                    ))}
                  </HStack>
                </Box>
              )}
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};
