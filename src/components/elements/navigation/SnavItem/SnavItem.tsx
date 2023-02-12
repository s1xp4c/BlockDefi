import { Icon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  useColorModeValue,
  Stack,
  Flex,
  Box,
  Text,
  Link,
  PopoverTrigger,
  Popover,
  PopoverContent,
} from '@chakra-ui/react';
import { Illustration } from '@web3uikit/core';
import { Logo } from '@web3uikit/core/dist/lib/Illustrations/types';
import { FC } from 'react';
import { ISideNav } from '../SideNav/SideNav';
import { SideNav } from '../SideNav';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const SnavItem: FC<ISideNav> = ({ label, children, href, subLabel, logo }) => {
  const linkColor = useColorModeValue('white.600', 'white.400');
  const linkActiveColor = useColorModeValue('white.800', 'blue.600');
  const router = useRouter();
  const isCurrentPath = router.asPath === href || (href !== '/' && router.pathname.startsWith(href || ''));

  return (
    <Popover trigger={'click'} placement={'bottom-start'}>
      <PopoverTrigger>
        <Box>
          <Box fontSize={15} fontWeight={500} color={isCurrentPath ? linkActiveColor : linkColor} cursor="pointer">
            {children ? (
              <>
                {label}
                <ChevronRightIcon />
              </>
            ) : (
              <NextLink href={href || '/'}>
                <Link
                  role={'group'}
                  display={'block'}
                  ml={0}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  <Stack
                    bgGradient="linear(to-l, gray.900, transparent, transparent)"
                    direction={'row'}
                    align={'left'}
                    border={'0'}
                    boxShadow={'xl'}
                    p={3}
                    rounded={'0'}
                    minW={'xs'}
                    color={useColorModeValue('gray.700', 'gray.200')}
                    _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                  >
                    <Illustration logo={logo as Logo} width={46} height={46} id={`${label}-snavitem`} />

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
                      _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                      justify={'flex-end'}
                      align={'center'}
                      flex={1}
                    >
                      <Icon color={'blue.600'} w={6} h={6} as={ChevronRightIcon} />
                    </Flex>
                  </Stack>
                </Link>
              </NextLink>
            )}
          </Box>
        </Box>
      </PopoverTrigger>

      {children && (
        <PopoverContent border={'2px'} boxShadow={'xl'} p={2} rounded={'xl'} minW={'xs'}>
          <Stack>
            {children.map((child) => (
              <SideNav key={`schild-${child.label}`} {...child} />
            ))}
          </Stack>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default SnavItem;
