import { Default } from 'components/layouts/Default';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { ITransactions, Transactions } from 'components/templates/transactions';
import Moralis from 'moralis';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoadingSpinner } from 'components/modules';

const TransactionsPage: NextPage<ITransactions> = (props) => {
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

  return <Default pageName="Transactions">{loading ? <LoadingSpinner /> : <Transactions {...props} />}</Default>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session?.user.address) {
    return { props: { error: 'Connect your wallet first' } };
  }

  const transactions = await Moralis.EvmApi.transaction.getWalletTransactions({
    address: session?.user.address,
    chain: process.env.APP_CHAIN_ID,
  });

  return {
    props: {
      transactions: JSON.parse(JSON.stringify(transactions.result)),
    },
  };
};

export default TransactionsPage;
