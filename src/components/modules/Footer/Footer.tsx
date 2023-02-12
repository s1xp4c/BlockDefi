import { Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react';

const links = {
  github: 'https://github.com/s1xp4c/bacd_finance',
  blockstarter: 'https://blockstarter.info',
};

const Footer = () => {
  return (
    <>
      <Grid templateColumns="repeat(7, 1fr)" gap={4} textAlign={'center'} p={5}>
        <GridItem
          colStart={2}
          colEnd={3}
          color={useColorModeValue('gray.800', 'gray.600')}
          borderRadius="xl"
          padding="10px 10px"
          _hover={{
            bg: useColorModeValue('gray.200', 'gray.700'),
            color: useColorModeValue('gray.700', 'gray.500'),
            borderColor: useColorModeValue('gray.700', 'gray.500'),
          }}
        >
          <Text>
            <Link
              href={links.github}
              isExternal
              alignItems={'center'}
              _hover={{
                textDecoration: 'none',
              }}
            >
              {'Contribute to project on github'} <ExternalLinkIcon />
            </Link>
          </Text>
        </GridItem>

        <GridItem
          colStart={6}
          colEnd={7}
          color={useColorModeValue('gray.800', 'gray.600')}
          borderRadius="xl"
          padding="10px 10px"
          _hover={{
            bg: useColorModeValue('gray.200', 'gray.700'),
            color: useColorModeValue('gray.700', 'gray.500'),
            borderColor: useColorModeValue('gray.700', 'gray.500'),
          }}
        >
          <Text>
            <Link
              href={links.blockstarter}
              isExternal
              alignItems={'center'}
              _hover={{
                textDecoration: 'none',
              }}
            >
              {'dApp developed by s1xp4c@Blockstarter'} <ExternalLinkIcon />
            </Link>
          </Text>
        </GridItem>
      </Grid>
    </>
  );
};

export default Footer;
