import { Box, useColorMode, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';

const BacdLogo = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Box
        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
        paddingTop={2}
        _hover={{
          transform: 'scale(0.98)',
        }}
      >
        <NextLink href="/" passHref>
          <Link>
            <Image
              src={colorMode === 'dark' ? '/bacd_logo_text_white.svg' : '/bacd_logo_text.svg'}
              height={35}
              width={100}
              alt="BACD LOGO"
            />
          </Link>
        </NextLink>
      </Box>
    </>
  );
};

export default BacdLogo;
