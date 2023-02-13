import { Box, Heading, useColorModeValue, Flex } from '@chakra-ui/react';
import { SwapWidget } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import { extendTheme } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { ISwapData } from '../swap';

const Swap: FC<ISwapData> = (props) => {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');
  const darkTheme = extendTheme({
    primary: '#EDF2F7',
    secondary: '#CBD5E0',
    interactive: '#2B6CB0',
    container: '#2D3748',
    module: '#1A202C',
    accent: '#4A5568',
    outline: '#171923',
    dialog: '#171923',
    fontFamily: 'system-ui,sans-serif',
    borderRadius: 0.8,
  });
  const lightTheme = extendTheme({
    primary: '#202020',
    secondary: '#202020',
    interactive: '#B0B0B0',
    container: '#D0D0D0',
    module: '#F5F5F5',
    accent: '#B0B0B0',
    outline: '#787878',
    dialog: '#202020',
    fontFamily: 'system-ui,sans-serif',
    borderRadius: 0.8,
    backgroundColor: '#B0B0B0',
  });

  useEffect(() => console.log('UserData: ', props.userData), [props.userData]);
  useEffect(() => console.log('uniData: ', props.uniData), [props.uniData]);

  //https://github.com/Uniswap/interface/blob/main/src/constants/lists.ts
  const UNI_TOKEN_LIST = props.uniData?.UNI_TOKEN_LIST;
  const UNI_NATIVE = props.uniData?.UNI_NATIVE;
  const UNI_SEC_TOKEN = props.uniData?.UNI_SEC_TOKEN;
  const UNI_FEE_ADDRESS = props.uniData?.UNI_FEE_ADDRESS;
  const UNI_FEE = props.uniData?.UNI_FEE;

  console.log(UNI_NATIVE);
  console.log(UNI_SEC_TOKEN);
  console.log(UNI_FEE);
  console.log(UNI_FEE_ADDRESS);

  return (
    <>
      {!props.userData?.profileId ? (
        <Heading size="lg" marginBottom={6}>
          {'Swap your tokens here'}
        </Heading>
      ) : (
        <Heading size="lg" marginBottom={6}>
          {'Swap your tokens here '}
          {props.userData.username}
          {'!'}
        </Heading>
      )}
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
              theme={useColorModeValue(lightTheme, darkTheme)}
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
};

export default Swap;
