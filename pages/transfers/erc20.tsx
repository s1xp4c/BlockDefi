import { Default } from 'components/layouts/Default';
import { ERC20Transfers } from 'components/templates/transfers/ERC20';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { IERC20Transfers } from 'components/templates/transfers/ERC20/types';
import Moralis from 'moralis';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoadingSpinner } from 'components/modules';

const ERC20: NextPage<IERC20Transfers> = (props) => {
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

  return <Default pageName="ERC20 Transfers">{loading ? <LoadingSpinner /> : <ERC20Transfers {...props} />}</Default>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session?.user.address) {
    return { props: { error: 'Connect your wallet first' } };
  }

  const transfers = await Moralis.EvmApi.token.getWalletTokenTransfers({
    address: session?.user.address,
    chain: process.env.APP_CHAIN_ID,
  });
  console.log(transfers.toJSON());

  return {
    props: {
      transfers: JSON.parse(JSON.stringify(transfers.result)),
    },
  };
};

export default ERC20;
