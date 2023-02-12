import { Box, Heading } from '@chakra-ui/react';
import { AnimateSphere } from 'components/modules/AnimateSphere';
import { WelcomeModal } from 'components/modules/WelcomeModal';
import { FC, useEffect } from 'react';
import { IUserData } from './types';

const Home: FC<IUserData> = ({ userData }) => {
  useEffect(() => console.log('Userdata ', userData), [userData]);
  return (
    <>
      {!userData?.profileId ? (
        <>
          <WelcomeModal />
          <Heading size="md" marginBottom={6} textAlign={'center'}>
            {'Welcome! '}
          </Heading>
          <Heading size="sm" marginBottom={3} textAlign={'center'}>
            Merging Centralized and DeCentralized Finance . . .
          </Heading>
          <Heading size="sm" marginBottom={1} textAlign={'center'}>
            Please connect your wallet to see your Blockchain Interactions
          </Heading>

          <Box display={'flex'} justifyContent={'center'}>
            <AnimateSphere zIndex={'10000'}></AnimateSphere>
          </Box>
        </>
      ) : (
        <>
          <Heading size="md" marginBottom={6} textAlign={'center'}>
            {'Welcome! '}
            {userData.username}
          </Heading>
          <Heading size="sm" marginBottom={3} textAlign={'center'}>
            {'I see you´ve already connected, so let´s get started!'}
          </Heading>
          <Heading size="sm" marginBottom={1} textAlign={'center'}>
            {'You know the drill . . . DeFi on the left and your data on the right'}
          </Heading>

          <Box display={'flex'} justifyContent={'center'}>
            <AnimateSphere zIndex={'10000'}></AnimateSphere>
          </Box>
        </>
      )}
    </>
  );
};

export default Home;
