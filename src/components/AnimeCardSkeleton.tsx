import { Box, Skeleton, SkeletonText, VStack } from '@chakra-ui/react';

export const AnimeCardSkeleton = () => {
  return (
    <Box borderRadius="lg" overflow="hidden" bg="white" boxShadow="sm">
      <Skeleton height="320px" />
      <VStack align="stretch" p="4" spacing="2">
        <SkeletonText noOfLines={2} spacing="2" />
        <Skeleton height="20px" width="60%" />
      </VStack>
    </Box>
  );
};
