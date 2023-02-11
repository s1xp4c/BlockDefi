import {
  Heading,
  useColorModeValue,
  Box,
  Input,
  Button,
  Flex,
  Grid,
  GridItem,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { IUserData } from './types';
import { Eth, Btc, Link, Ada, Bnb } from '@web3uikit/icons';
import { LoadingSpinner } from 'components/modules';
import axios from 'axios';

const OpenAI: FC<IUserData> = ({ userData }) => {
  const hoverLiColor = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => console.log('Userdata ', userData), [userData]);

  const [coinInput, setCoinInput] = useState('');
  const [result, setResult] = useState<string>('');
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsFetching(false);
  }, [result]);

  async function onSubmit(event: { preventDefault: () => void }) {
    setIsFetching(true);
    setErrorMessage(null);
    event.preventDefault();
    try {
      const response = await axios.post(
        'api/auth/generate',
        { coin: coinInput },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      if (
        response.headers['content-type'] !== 'application/json' &&
        response.headers['content-type'] !== 'application/json; charset=utf-8'
      ) {
        console.error(`Unexpected content-type: ${response.headers['content-type']}`);
        setErrorMessage('Unexpected content-type');
        return;
      }

      const dataResponse = response.data.result;

      setResult(dataResponse);
      setCoinInput('');
    } catch (error) {
      setErrorMessage(error as string | null);
      console.error(errorMessage);
    }
  }

  return (
    <>
      <Heading size="md" marginBottom={6}>
        {userData?.username}
        {'! - Try out BACD OPENAI'}
      </Heading>
      <Flex
        border="2px"
        borderColor={hoverLiColor}
        borderRadius="xl"
        padding="24px 18px"
        textAlign={'center'}
        align="center"
        justify="center"
        flexDir="column"
      >
        <Heading size="sm" marginBottom={6}>
          {
            'Enter a Crypto Coin or Token and our AI will find and list 5 similar cryptos with explainations from top 300 by marketcap.'
          }
        </Heading>
        <Heading size="xs" marginBottom={2}>
          {'NB! - Investing in crypto is highly speculative, and no data from the AI should be perceived '}
        </Heading>
        <Heading size="xs" marginBottom={6}>
          {' '}
          {'as investment advice. The AI answers are limited to data from before 2022.'}
        </Heading>
        <Box marginBottom={6}>
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            <GridItem w="100%" h="100px">
              <Btc fontSize={'80px'} />
            </GridItem>
            <GridItem w="100%" h="100px">
              <Eth fontSize={'80px'} />
            </GridItem>
            <GridItem w="100%" h="100px">
              <Link fontSize={'80px'} />
            </GridItem>
            <GridItem w="100%" h="100px">
              <Ada fontSize={'80px'} />
            </GridItem>
            <GridItem w="100%" h="100px">
              <Bnb fontSize={'80px'} />
            </GridItem>
          </Grid>
        </Box>

        <Box id="pWrap" w={'full'}>
          <form onSubmit={onSubmit}>
            <Input
              marginBottom={6}
              type="text"
              name="coin"
              placeholder="Enter a Crypto Coin or Token . . . "
              value={coinInput}
              onChange={(e) => setCoinInput(e.target.value)}
            />
            <Button marginBottom={6} type="submit" value="Generate coins">
              {'GENERATE COIN EXPLANATIONS'}
            </Button>
          </form>
          <>
            <style>
              {`#pWrap {
                            white-space: pre-line;
                          }`}
            </style>
            {isFetching === true ? (
              <>
                <Box>
                  <LoadingSpinner />
                </Box>
                <Box w={'100%'}>
                  <Stack padding={4} spacing={1}>
                    <Skeleton height="40px">
                      <Box>Hello World!</Box>
                    </Skeleton>
                    <Skeleton height="40px" bg="green.500" color="white" fadeDuration={1}>
                      <Box>Hello React!</Box>
                    </Skeleton>
                    <Skeleton height="40px" fadeDuration={4} bg="blue.500" color="white">
                      <Box>Hello ChakraUI!</Box>
                    </Skeleton>
                  </Stack>
                </Box>
              </>
            ) : (
              <Box> {result}</Box>
            )}
          </>
        </Box>
      </Flex>
    </>
  );
};

export default OpenAI;
