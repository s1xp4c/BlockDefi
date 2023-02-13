import { FC, ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { Footer, Header } from 'components/modules';
import Head from 'next/head';

const Default: FC<{ children: ReactNode; pageName: string }> = ({ children, pageName }) => (
  <>
    <Head>
      <title>{`${pageName} | BACD FINANCE`}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#603cba" />
    </Head>
    <Box boxShadow={'xl'}>
      <Header />
    </Box>
    <Container maxW="container.lg" p={3} marginTop={5} as="main" minH="70vh" boxShadow={'xl'}>
      {children}
    </Container>
    <Footer />
  </>
);

export default Default;
