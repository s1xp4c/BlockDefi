import { Default } from 'components/layouts/Default';
import { EvmAddress } from '@moralisweb3/common-evm-utils';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import getErc20LogoAddress from 'utils/getErc20LogoAddress';
import Moralis from 'moralis';
import { ERC20Balances, IERC20Balances } from 'components/templates/balances/ERC20';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoadingSpinner } from 'components/modules';
import { EvmChain } from '@moralisweb3/common-evm-utils';

const ERC20: NextPage<IERC20Balances> = (props) => {
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

  return <Default pageName="ERC20 Balances">{loading ? <LoadingSpinner /> : <ERC20Balances {...props} />}</Default>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session?.user.address) {
    return { props: { error: 'Connect your wallet first' } };
  }

  const balances = await Moralis.EvmApi.token.getWalletTokenBalances({
    address: session?.user.address,
    chain: process.env.APP_CHAIN_ID,
  });
  const chain = EvmChain.POLYGON;
  const native = await Moralis.EvmApi.balance.getNativeBalance({
    address: session?.user.address,
    chain,
  });
  console.log(native.toJSON());

  const tokensWithLogosAdded = balances.toJSON().map((balance) => ({
    ...balance,
    value: balance.balance,
    token: {
      address: balance.token_address,
      name: balance.name,
      symbol: balance.symbol,
      logo: getErc20LogoAddress({
        blockchain: 'ethereum',
        address: EvmAddress.create(balance?.token_address || '').checksum,
      }),
    },
  }));

  return {
    props: {
      balances: JSON.parse(JSON.stringify(tokensWithLogosAdded)),
    },
  };
};

export default ERC20;
