import React from 'react';
import { Box, Center } from '@chakra-ui/react';
import { AnimateSphereSpinner } from '../AnimateSphereSpinner';

const LoadingSpinner = () => {
  return (
    <Center w={'100%'} h={'100%'} bg={'transparent'}>
      <Box>
        <AnimateSphereSpinner width={'30vw'} />
      </Box>
    </Center>
  );
};

export default LoadingSpinner;
