import {
  Box,
  Image,
  SimpleGrid,
  useColorModeValue,
  useBoolean,
  useToast,
  Button,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { Eth } from '@web3uikit/icons';
import { FC, MouseEvent, useEffect } from 'react';
import { resolveIPFS } from 'utils/resolveIPFS';
import { CopyIcon } from '@chakra-ui/icons';
import { getEllipsisTxt } from 'utils/format';
import ultralightCopy from 'copy-to-clipboard-ultralight';
import { INFTCard } from './types';
import { EnsLogo } from 'components/elements';

const NFTCard: FC<INFTCard> = ({ amount, contractType, name, symbol, metadata, tokenAddress }) => {
  const [isENS, setIsENS] = useBoolean();
  const [addressHovered, setAddressHovered] = useBoolean();

  const bgColor = useColorModeValue('none', 'blue.700');
  const borderColor = useColorModeValue('blue.200', 'blue.700');
  const descBgColor = useColorModeValue('blue.100', 'blue.650');
  const bgGradient = 'linear(to-r, blue.900, blue.600, blue.900)';
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');

  const toast = useToast();

  const copyToClipboard = (e: string | undefined) => {
    if (e) {
      ultralightCopy(e);
    }
  };

  useEffect(() => {
    if (symbol === 'ENS') {
      console.log('ENVName from card: ', name);
      return setIsENS.on;
    }
    return setIsENS.off;
  }, [symbol]);

  // eslint-disable-next-line no-undef
  const preventRightClick = (e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    toast({
      position: 'top',
      title: 'Sorry!',
      description: 'You are NOT allowed to copy NFT´s',
      status: 'error',
      duration: 3000,
      isClosable: false,
      variant: 'solid',
    });
  };

  return (
    <Box
      maxWidth="300px"
      bgColor={bgColor}
      bgGradient={bgGradient}
      padding={3}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <Box
        border="2px"
        borderColor={hoverTrColor}
        bgColor={descBgColor}
        borderRadius="xl"
        padding="8px 8px"
        margin={'8px 0 8px 0'}
      >
        <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
          NAME
        </Box>
        <Box as="h4" noOfLines={1} fontSize="sm">
          {!isENS ? metadata?.name : name}
        </Box>
      </Box>

      {!isENS ? (
        <Box maxHeight="260px" overflow={'hidden'} borderRadius="xl">
          <Image
            src={resolveIPFS(metadata?.image_url as unknown as string)}
            alt={'nft'}
            minH="260px"
            minW="260px"
            boxSize="100%"
            objectFit="fill"
            onContextMenu={(e) => preventRightClick(e)}
          />
        </Box>
      ) : (
        <EnsLogo />
      )}
      <SimpleGrid
        columns={2}
        spacing={4}
        bgColor={descBgColor}
        padding={2.5}
        borderRadius="xl"
        marginTop={2}
        border="2px"
        borderColor={hoverTrColor}
      >
        <Box textAlign={'left'}>
          <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
            SYMBOL
          </Box>
          <Box as="h4" noOfLines={1} fontSize="sm">
            {symbol}
          </Box>
        </Box>
        <Box textAlign={'right'}>
          <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
            AMOUNT
          </Box>
          <Box as="h4" noOfLines={1} fontSize="sm">
            {amount}
          </Box>
        </Box>
      </SimpleGrid>
      <Box
        border="2px"
        borderColor={hoverTrColor}
        bgColor={descBgColor}
        borderRadius="xl"
        padding="8px 8px"
        marginTop={'8px'}
        textAlign={'left'}
      >
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem colSpan={4}>
            <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
              NFT ADDRESS
            </Box>
            <Box
              as="h4"
              noOfLines={1}
              fontSize="sm"
              onMouseEnter={setAddressHovered.on}
              onMouseLeave={setAddressHovered.off}
              cursor="pointer"
            >
              {!addressHovered ? <Box>{getEllipsisTxt(tokenAddress)}</Box> : <Box>{tokenAddress}</Box>}
            </Box>
          </GridItem>
          <GridItem colSpan={1}>
            <Box
              onClick={() =>
                toast({
                  position: 'top',
                  title: 'Success!',
                  description: 'NFT Address copied to clipboard.',
                  status: 'success',
                  duration: 3000,
                  isClosable: false,
                  variant: 'solid',
                })
              }
            >
              <Button width="20px" onClick={() => copyToClipboard(tokenAddress)}>
                <CopyIcon></CopyIcon>
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </Box>
      <Grid
        templateColumns="repeat(5, 1fr)"
        bgColor={descBgColor}
        padding={2.5}
        borderRadius="xl"
        marginTop={2}
        border="2px"
        borderColor={hoverTrColor}
      >
        <GridItem textAlign={'left'} colSpan={4}>
          <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
            CONTRACT TYPE
          </Box>
          <Box as="h4" noOfLines={1} fontSize="sm">
            {contractType}
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm" paddingLeft="90">
            <Eth fontSize="40px" />
          </Box>
        </GridItem>
      </Grid>
      {!isENS ? (
        <Box
          id="pWrap"
          border="2px"
          borderColor={hoverTrColor}
          bgColor={descBgColor}
          borderRadius="xl"
          padding="8px 8px"
          marginTop={'8px'}
          objectFit="fill"
        >
          <Box mt="1" as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
            DESCRIPTION:
          </Box>
          <>
            <style>
              {`#pWrap {
                            white-space: pre-line;
                          }`}
            </style>
            <Box as="h4" fontSize="sm">
              {metadata?.description}
            </Box>
          </>
        </Box>
      ) : (
        <Box
          id="pWrap"
          border="2px"
          borderColor={hoverTrColor}
          bgColor={descBgColor}
          borderRadius="xl"
          padding="8px 8px"
          marginTop={'8px'}
          objectFit="fill"
        >
          <Box mt="1" as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
            DESCRIPTION:
          </Box>

          <Box as="h4" fontSize="sm">
            <p>
              {' '}
              Your ENS Domain: <b>{name}</b> is your Identifier on the Ethereum Network and can be used as your Wallet
              Address for receiving Tokens and Assets.
            </p>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NFTCard;
