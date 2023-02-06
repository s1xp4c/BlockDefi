import { Box, Image, useColorMode } from '@chakra-ui/react';

const EnsLogo = () => {
  const { colorMode } = useColorMode();

  return (
    <Box maxHeight="260px" overflow={'hidden'} borderRadius="xl">
      <Image
        src={colorMode === 'dark' ? ('/ens1.svg' as unknown as string) : ('/ens1.svg' as unknown as string)}
        alt={'ENS'}
        minH="260px"
        minW="260px"
        boxSize="100%"
        objectFit="fill"
        onContextMenu={(e) => e.preventDefault()}
      />
    </Box>
  );
};

export default EnsLogo;
