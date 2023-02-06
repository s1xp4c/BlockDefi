import React from 'react';
import { Center, Spinner } from '@chakra-ui/react';

const LoadingSpinner = () => {
  return (
    <Center w={'100%'} h={'100%'} bg={'transparent'}>
      <Spinner
        thickness="4px"
        speed="0.95s"
        position={'relative'}
        size="xl"
        label={'Loading...'}
        variant={''}
        justifySelf={'center'}
      />
    </Center>
  );
};

export default LoadingSpinner;
