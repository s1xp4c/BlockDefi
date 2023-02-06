import { HStack, Menu, MenuButton, MenuList, MenuItem, IconButton, Box } from '@chakra-ui/react';
import { NavItem } from '../NavItem';
import NAV_LINKS from './paths';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const NavBar = () => {
  return (
    <HStack>
      <Box>
        <Menu>
          {({ isOpen }) => (
            <>
              {isOpen ? (
                <MenuButton
                  isActive={isOpen}
                  as={IconButton}
                  icon={<CloseIcon />}
                  variant=""
                  colorScheme="teal"
                  aria-label="Options"
                  fontSize="20px"
                  transition={'all .3s ease-in'}
                  _hover={{ color: 'blue.600' }}
                />
              ) : (
                <MenuButton
                  isActive={isOpen}
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  variant=""
                  colorScheme="teal"
                  aria-label="Options"
                  fontSize="35px"
                  transition={'all .3s ease'}
                  _hover={{ color: 'blue.600' }}
                />
              )}
              <MenuList>
                <MenuItem display="block">
                  {NAV_LINKS.map((link) => (
                    <NavItem key={`link-${link.label}`} {...link} />
                  ))}
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </Box>
    </HStack>
  );
};

export default NavBar;
