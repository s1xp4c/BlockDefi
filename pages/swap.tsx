import { Default } from 'components/layouts/Default';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { Swap } from 'components/templates/swap';
import Moralis from 'moralis';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoadingSpinner } from 'components/modules';
import connectDB from '../lib/connectDB';
import Users from '../lib/userSchema';
import { ISwapData } from './../src/components/templates/swap/types';

const swapPage: NextPage<ISwapData> = (props) => {
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

  return <Default pageName="Swap">{loading ? <LoadingSpinner /> : <Swap {...props} />}</Default>;
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

  await connectDB();

  const userM = await Users.findOne({
    profileId: session?.user.profileId,
  }).lean();

  const userData = {
    address: userB?.address,
    profileId: userM?.profileId,
    username: userM?.username,
  };
  const uniData = {
    UNI_TOKEN_LIST: process.env.UNISWAP_TOKEN_LIST,
    UNI_NATIVE: process.env.NATIVE,
    UNI_FEE_ADDRESS: process.env.UNI_FEE_ADDRESS,
    UNI_FEE: process.env.UNI_FEE,
    UNI_SEC: process.env.UNI_SEC_TOKEN,
  };

  return {
    props: {
      userData: JSON.parse(JSON.stringify(userData)),
      uniData: JSON.parse(JSON.stringify(uniData)),
    },
  };
};

export default swapPage;
