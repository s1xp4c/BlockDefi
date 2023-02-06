import { Default } from 'components/layouts/Default';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { IUserData, User } from 'components/templates/user';
import Users from './api/auth/userSchema';
import connectDB from './api/auth/connectDB';
import Moralis from 'moralis';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoadingSpinner } from 'components/modules';

const userPage: NextPage<IUserData> = (props) => {
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

  return <Default pageName="User">{loading ? <LoadingSpinner /> : <User {...props} />}</Default>;
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

  const userData = { address: userB?.address, profileId: userM?.profileId, bio: userM?.bio, username: userM?.username };

  return {
    props: {
      user: JSON.parse(JSON.stringify(userData)),
    },
  };
};

export default userPage;
