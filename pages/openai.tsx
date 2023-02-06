import { Default } from 'components/layouts/Default';
import { GetServerSideProps, NextPage } from 'next';
import { OpenAI } from 'components/templates/openAI';
import { getSession } from 'next-auth/react';
import Moralis from 'moralis';
import { LoadingSpinner } from 'components/modules';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const openAIPage: NextPage = (props) => {
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
  return <Default pageName="OpenAI">{loading ? <LoadingSpinner /> : <OpenAI useraddress={[]} {...props} />}</Default>;
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

  const userAddress = { address: userB?.address };

  return {
    props: {
      useraddress: JSON.parse(JSON.stringify(userAddress)),
    },
  };
};
export default openAIPage;
