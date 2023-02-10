import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import { IPresale } from './types';
import { useEffect } from 'react';

function Presale(presale: IPresale) {
  useEffect(() => console.log('presale: ', presale), [presale]);

  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <>
      <Heading size="lg" marginBottom={6}>
        Presale ICO/STO
      </Heading>
      <Heading size="xs" marginBottom={6}>
        Please choose your platform and sign up or login,
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
          <iframe title={'tzenPresale'} src="https://tzen.bacd.io/" height={'1000px'} width={'100%'} />
        </Box>
      </Box>
    </>
  );
}

export default Presale;
