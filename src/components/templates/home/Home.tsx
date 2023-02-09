import { Box, Heading } from '@chakra-ui/react';
import { AnimateSphere } from 'components/modules/AnimateSphere';
import { WelcomeModal } from 'components/modules/WelcomeModal';

const Home = () => {
  return (
    <>
      <WelcomeModal />
      <Heading size="md" marginBottom={6} textAlign={'center'}>
        Welcome!
      </Heading>
      <Heading size="sm" marginBottom={3} textAlign={'center'}>
        Merging Centralized and DeCentralized Finance..
      </Heading>
      <Heading size="sm" marginBottom={1} textAlign={'center'}>
        Please connect your wallet to see your Blockchain Interactions
      </Heading>

      <Box display={'flex'} justifyContent={'center'}>
        <AnimateSphere zIndex={'10000'}></AnimateSphere>
      </Box>
    </>
  );
};

export default Home;
