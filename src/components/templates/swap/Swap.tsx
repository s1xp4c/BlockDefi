import { Box, Heading, useColorModeValue, Flex } from '@chakra-ui/react';
import { ISwapper } from './types';
import { SwapWidget } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import { extendTheme } from '@chakra-ui/react';
import { useEffect } from 'react';

function Swap(swapper: ISwapper) {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');
  const theme = extendTheme({
    primary: '#EDF2F7',
    secondary: '#CBD5E0',
    interactive: '#2B6CB0',
    container: '#2D3748',
    module: '#1A202C',
    accent: '#4A5568',
    outline: '#171923',
    dialog: '#171923',
    fontFamily: 'Menlo, monospace',
    borderRadius: 0.8,
  });

  useEffect(() => console.log('swapper: ', swapper), [swapper]);

  const UNISWAP_TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org';
  const NATIVE = 'NATIVE';
  const BACD2 = '0x66eb10c9B80fC52401384285f5Ecc18C0b924bBd';
  const cFeeAddress = '0x6004539434CbCFF73506ebEa9FB6Cd841c307a8f';

  return (
    <>
      <Heading size="lg" marginBottom={6}>
        Swap your tokens
      </Heading>
      <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px" userSelect={'none'}>
        <Flex align="center" justify="center">
          <Box
            borderWidth={'none'}
            margin={'0 auto'}
            display="flex"
            alignItems="center"
            border-radius={'10px'}
            max-width={'600px'}
            min-width={'300px'}
          >
            <SwapWidget
              width={'360px'}
              theme={theme}
              tokenList={UNISWAP_TOKEN_LIST}
              defaultInputTokenAddress={NATIVE}
              defaultOutputTokenAddress={BACD2}
              convenienceFee={5}
              convenienceFeeRecipient={cFeeAddress}
            />
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default Swap;
