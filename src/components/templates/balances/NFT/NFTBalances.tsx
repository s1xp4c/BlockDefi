import { Box, Grid, Heading, useColorModeValue } from '@chakra-ui/react';
import { NFTCard } from 'components/modules';
import { FC, useEffect } from 'react';
import { INFTBalances } from './types';

const NFTBalances: FC<INFTBalances> = ({ balances, envName }) => {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => console.log('Balances: ', balances), [balances]);
  useEffect(() => console.log('EnvName: ', envName), [envName]);

  return (
    <>
      <Heading size="lg" marginBottom={6}>
        NFT & ENS Holdings
      </Heading>
      <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px" userSelect={'none'}>
        {balances?.length ? (
          <Grid
            templateColumns="repeat(auto-fit, minmax(280px, 1fr))"
            gap={'0'}
            textAlign="center"
            justifyContent={'space-between'}
          >
            {balances.map((balance, key) => (
              <NFTCard {...balance} {...envName} key={key} />
            ))}
          </Grid>
        ) : (
          <Box>Looks Like you do not have any NFT´s, or you´re not connected</Box>
        )}
      </Box>
    </>
  );
};

export default NFTBalances;
