import { Box, Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react';

const links = {
  github: 'https://github.com/s1xp4c/bacd_finance',
};

const Footer = () => {
  const hoverGrColor = useColorModeValue('gray.100', 'gray.700');
  return (
    <Box textAlign={'center'} w="50%" p={6}>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem border="2px" borderColor={hoverGrColor} borderRadius="xl" padding="24px 18px">
          <Text>
            <Link href={links.github} isExternal alignItems={'center'}>
              github <ExternalLinkIcon />
            </Link>
          </Text>
        </GridItem>
        <GridItem></GridItem>
        <GridItem></GridItem>
        <GridItem></GridItem>
        <GridItem></GridItem>
      </Grid>
    </Box>
  );
};

export default Footer;
