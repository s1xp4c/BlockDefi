import { Box, Link, Popover, PopoverContent, PopoverTrigger, Stack, useColorModeValue } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { FC } from 'react';
import { ISideNav } from '../SideNav/SideNav';
import { SideNav } from '../SideNav';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const SnavItem: FC<ISideNav> = ({ label, children, href }) => {
  const linkColor = useColorModeValue('white.600', 'white.400');
  const linkActiveColor = useColorModeValue('white.800', 'blue.600');
  const router = useRouter();
  const isCurrentPath = router.asPath === href || (href !== '/' && router.pathname.startsWith(href || ''));

  return (
    <Popover trigger={'click'} placement={'bottom-start'}>
      <PopoverTrigger>
        <Box>
          <Box
            padding={'0 0 15px 0'}
            fontSize={15}
            fontWeight={500}
            color={isCurrentPath ? linkActiveColor : linkColor}
            _hover={{
              textDecoration: 'none',
              color: linkActiveColor,
            }}
            cursor="pointer"
          >
            {children ? (
              <>
                {label}
                <ChevronRightIcon />
              </>
            ) : (
              <NextLink href={href || '/'}>
                <Link
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  {label}
                </Link>
              </NextLink>
            )}
          </Box>
        </Box>
      </PopoverTrigger>

      {children && (
        <PopoverContent border={0} boxShadow={'xl'} p={2} rounded={'xl'} minW={'xs'}>
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
