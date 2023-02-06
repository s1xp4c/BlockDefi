import { Box, Heading } from '@chakra-ui/react';
import { Eye } from 'components/elements/Eye';

const Home = () => {
  return (
    <>
      <Heading size="md" marginBottom={6} textAlign={'center'}>
        Welcome to BACD FINANCE
      </Heading>
      <Heading size="sm" marginBottom={3} textAlign={'center'}>
        Merging ceFi (Centralized Finance) and deFi (DeCentralized Finance) for the masses.
      </Heading>
      <Heading size="sm" marginBottom={8} textAlign={'center'}>
        Please connect your wallet to see your Blockchain Interactions and holdings in the top right menu or check out
        real time charts, our OpenAI, Swap your coins, cast your votes and see Presales in the menu on the left.
      </Heading>

      <Box display={'flex'} justifyContent={'center'}>
        <Eye />
      </Box>
    </>
  );
};

export default Home;
