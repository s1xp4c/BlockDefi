import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  IconButton,
  VStack,
  Menu,
  MenuButton,
  useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { SnavItem } from '../SnavItem';
import SNAV_LINKS from './paths';
import React from 'react';

const SideDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // eslint-disable-next-line no-undef
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <Menu>
        <MenuButton
          ref={btnRef}
          as={IconButton}
          icon={<HamburgerIcon />}
          variant=""
          colorScheme={useColorMode}
          aria-label="Options"
          fontSize="35px"
          transition={'all .3s ease'}
          _hover={{ color: 'blue.700' }}
          onClick={onOpen}
          backgroundColor="transparent"
        />
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bgGradient="linear(to-l, transparent, transparent, gray.900)">
            <DrawerCloseButton />
            <DrawerHeader>DEFI OPTIONS</DrawerHeader>

            <DrawerBody>
              <VStack gap={0} display={'flex'} align={'center'}>
                {SNAV_LINKS.map((link) => (
                  <SnavItem key={`-link-${link.label}`} {...link} />
                ))}
              </VStack>
            </DrawerBody>
            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Menu>
    </>
  );
};

export default SideDrawer;
