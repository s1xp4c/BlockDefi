import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import { IUserData } from './types';

import { FC, useEffect } from 'react';
import { VotingModal } from 'components/modules/VotingModal';

const Voting: FC<IUserData> = ({ userData }) => {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => console.log('voting: ', userData), [userData]);

  return (
    <>
      <VotingModal />
      {!userData?.profileId ? (
        <Heading size="lg" marginBottom={6}>
          {'Decentralized Voting is ready'}
        </Heading>
      ) : (
        <Heading size="lg" marginBottom={6}>
          {'Decentralized Voting is ready for you '}
          {userData.username}
        </Heading>
      )}
      <Heading size="xs" marginBottom={6}>
        Users must have 1000 BACD Tokens in their connected wallet to make a proposal and 100 BACD tokens to cast a
        vote.
      </Heading>
      <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px" userSelect={'none'}>
        <Box
          borderWidth={'none'}
          margin={'0 auto'}
          display={'block'}
          border-radius={'10px'}
          max-width={'600px'}
          min-width={'300px'}
        >
          <iframe title={'bacdVoting'} src="https://voting.bacd.io/" height={'560px'} width={'100%'} />
        </Box>
      </Box>
    </>
  );
};

export default Voting;
