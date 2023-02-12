import { Box, Heading, useColorModeValue, Flex } from '@chakra-ui/react';
import { IUserData, IUniData } from './types';
import { SwapWidget } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import { extendTheme } from '@chakra-ui/react';
import { useEffect } from 'react';

function Swap({ userData }: IUserData, { uniData }: IUniData) {
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

  useEffect(() => console.log('UserData: ', userData), [userData]);
  useEffect(() => console.log('uniData: ', uniData), [uniData]);

  //https://github.com/Uniswap/interface/blob/main/src/constants/lists.ts
  const UNI_TOKEN_LIST = 'https://extendedtokens.uniswap.org/';
  const UNI_NATIVE = uniData?.UNI_NATIVE;
  const UNI_SEC_TOKEN = uniData?.UNI_SEC_TOKEN;
  const UNI_FEE_ADDRESS = uniData?.UNI_FEE_ADDRESS;
  const UNI_FEE = uniData?.UNI_FEE;

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
              tokenList={UNI_TOKEN_LIST}
              defaultInputTokenAddress={UNI_NATIVE}
              defaultOutputTokenAddress={UNI_SEC_TOKEN}
              convenienceFee={UNI_FEE}
              convenienceFeeRecipient={UNI_FEE_ADDRESS}
            />
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default Swap;
