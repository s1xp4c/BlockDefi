import React from 'react';
import { Box, Center } from '@chakra-ui/react';
import { AnimateSphere } from '../AnimateSphere';

const LoadingSpinner = () => {
  return (
    <Center w={'100%'} h={'100%'} bg={'transparent'}>
      <Box>
        <AnimateSphere width={'30vw'} />
      </Box>
    </Center>
  );
};

export default LoadingSpinner;
