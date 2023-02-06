import { Default } from 'components/layouts/Default';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { Voting } from 'components/templates/voting';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoadingSpinner } from 'components/modules';

import Moralis from 'moralis';

const votingPage: NextPage = (props) => {
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

  return <Default pageName="Voting">{loading ? <LoadingSpinner /> : <Voting voting={[]} {...props} />}</Default>;
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

  const votingAddress = { address: userB?.address };

  return {
    props: {
      voting: JSON.parse(JSON.stringify(votingAddress)),
    },
  };
};

export default votingPage;
