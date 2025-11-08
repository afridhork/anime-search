import { Box, Image, Text, Badge, HStack, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Anime } from '../types/anime';
import { Star } from 'lucide-react';

interface AnimeCardProps {
  anime: Anime;
}

export const AnimeCard = ({ anime }: AnimeCardProps) => {
  const navigate = useNavigate();

  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="sm"
      cursor="pointer"
      onClick={() => navigate(`/anime/${anime.mal_id}`)}
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'lg',
      }}
    >
      <Box position="relative" paddingBottom="140%" bg="gray.100">
        <Image
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover"
          fallbackSrc="https://via.placeholder.com/225x320?text=No+Image"
        />
        {anime.score && (
          <Badge
            position="absolute"
            top="2"
            right="2"
            colorScheme="yellow"
            display="flex"
            alignItems="center"
            gap="1"
            fontSize="sm"
            fontWeight="bold"
          >
            <Star size={12} fill="currentColor" />
            {anime.score}
          </Badge>
        )}
      </Box>
      <VStack align="stretch" p="4" spacing="2">
        <Text fontWeight="bold" fontSize="md" noOfLines={2} minHeight="3em">
          {anime.title}
        </Text>
        <HStack spacing="2" flexWrap="wrap">
          {anime.type && (
            <Badge colorScheme="blue" fontSize="xs">
              {anime.type}
            </Badge>
          )}
          {anime.episodes && (
            <Badge colorScheme="green" fontSize="xs">
              {anime.episodes} eps
            </Badge>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};
