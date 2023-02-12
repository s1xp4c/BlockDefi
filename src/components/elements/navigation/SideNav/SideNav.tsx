import { Icon, ChevronRightIcon } from '@chakra-ui/icons';
import { useColorModeValue, Stack, Flex, Box, Text, Link } from '@chakra-ui/react';
import { Illustration } from '@web3uikit/core';
import { Logo } from '@web3uikit/core/dist/lib/Illustrations/types';
import NextLink from 'next/link';

export interface ISideNav {
  label: string;
  subLabel?: string;
  logo?: Logo;
  href?: string;
  children?: Array<ISideNav>;
}

const SideNav = ({ label, href, subLabel, logo }: ISideNav) => {
  return (
    <NextLink href={href || '#'}>
      <Link
        role={'group'}
        display={'block'}
        p={1}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('gray.600', 'gray.900') }}
      >
        <Stack direction={'row'} align={'left'}>
          <Illustration logo={logo as Logo} width={46} height={46} id={`${label}-navitem`} />
          <Box>
            <Text transition={'all .3s ease'} _groupHover={{ color: 'blue.600' }} fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-20px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(+50px)' }}
            justify={'flex-start'}
            align={'left'}
            flex={1}
          >
            <Icon color={'blue.600'} w={6} h={6} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    </NextLink>
  );
};

export default SideNav;
