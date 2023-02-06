import { Box, Container, Flex, HStack } from '@chakra-ui/react';
import { ColorModeButton, BacdLogo, NavBar, SideDrawer } from 'components/elements';

import { ConnectButton } from '../ConnectButton';

const Header = () => {
  return (
    <Box borderBottom="1px" borderBottomColor="chakra-border-color">
      <Container maxW="container.lg" p={'10px'}>
        <Flex align="center" justify="space-between">
          <HStack gap={'20px'}>
            <SideDrawer />
            <BacdLogo />
          </HStack>
          <HStack gap={'20px'}>
            <ConnectButton />
            <ColorModeButton />
            <NavBar />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
