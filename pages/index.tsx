import { Default } from 'components/layouts/Default';
import { Home } from 'components/templates/home';
import type { GetServerSideProps, NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoadingSpinner } from 'components/modules';
import Moralis from 'moralis';
import { getSession } from 'next-auth/react';
import connectDB from '../lib/connectDB';
import Users from '../lib/userSchema';
import { IUserData } from 'components/templates/home/types';

const HomePage: NextPage<IUserData> = (props) => {
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
  return <Default pageName="Home">{loading ? <LoadingSpinner /> : <Home {...props} />}</Default>;
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

  return {
    props: {
      userData: JSON.parse(JSON.stringify(userData)),
    },
  };
};

export default HomePage;
