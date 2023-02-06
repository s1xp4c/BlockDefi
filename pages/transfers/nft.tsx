import { Default } from 'components/layouts/Default';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { INFTTransfers, NFTTransfers } from 'components/templates/transfers/NFT';
import Moralis from 'moralis';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoadingSpinner } from 'components/modules';

const NFTTransfersPage: NextPage<INFTTransfers> = (props) => {
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

  return <Default pageName="NFT Transfers">{loading ? <LoadingSpinner /> : <NFTTransfers {...props} />};</Default>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session?.user.address) {
    return { props: { error: 'Connect your wallet first' } };
  }

  const transfers = await Moralis.EvmApi.nft.getWalletNFTTransfers({
    address: session?.user.address,
    chain: process.env.APP_CHAIN_ID,
  });

  return {
    props: {
      transfers: JSON.parse(JSON.stringify(transfers.result)),
    },
  };
};

export default NFTTransfersPage;
