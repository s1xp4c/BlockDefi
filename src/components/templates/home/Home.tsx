import { Box, Heading } from '@chakra-ui/react';
import { AnimateSphere } from 'components/modules/AnimateSphere';
import { FC } from 'react';
import { IBoxCSS } from './types';

const Home: FC<IBoxCSS> = ({ cssTypes }) => {
  const styleTypes = cssTypes;
  console.log(styleTypes);
  return (
    <>
      <Heading size="md" marginBottom={6} textAlign={'center'}>
        Welcome!
      </Heading>
      <Heading size="sm" marginBottom={3} textAlign={'center'}>
        Merging Centralized and DeCentralized Finance..
      </Heading>
      <Heading size="sm" marginBottom={8} textAlign={'center'}>
        Please connect your wallet to see your Blockchain Interactions
      </Heading>

      <Box display={'flex'} justifyContent={'center'}>
        <AnimateSphere zIndex={'10000'} position={'absolute'}></AnimateSphere>
      </Box>
    </>
  );
};

export default Home;
