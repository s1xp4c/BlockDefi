import { Default } from 'components/layouts/Default';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { Presale } from 'components/templates/presale';
import Moralis from 'moralis';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoadingSpinner } from 'components/modules';

const presalePage: NextPage = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const startHandler = () => setLoading(true);
    const endHandler = () => setLoading(false);

    router.events.on('routeChangeStart', startHandler);
    router.events.on('routeChangeComplete', endHandler);

    return () => {
      router.events.off('routeChangeStart', startHandler);
      router.events.off('routeChangeComplete', endHandler);
    };
  }, [router.events]);
  return <Default pageName="Swap">{loading ? <LoadingSpinner /> : <Presale presale={[]} {...props} />}</Default>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!Moralis.Core.isStarted) {
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  }

  if (!session?.user.address) {
    return { props: { error: 'Connect your wallet first' } };
  }

  const userB = {
    address: session?.user.address,
  };

  const presaleAddress = { address: userB?.address };

  return {
    props: {
      swapper: JSON.parse(JSON.stringify(presaleAddress)),
    },
  };
};

export default presalePage;
