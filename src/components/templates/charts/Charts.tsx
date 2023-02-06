import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import { ICharts } from './types';
import { Ticker } from '../../modules/Ticker';
import { ChartCard } from '../../modules/ChartCard';
import { useEffect } from 'react';

function Charts(chartsAddress: ICharts) {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => console.log('ChartsAddress: ', chartsAddress), [chartsAddress]);

  return (
    <>
      <Ticker
        symbols={[
          {
            proName: 'BITSTAMP:BTCUSD',
            title: 'Bitcoin',
          },
          {
            proName: 'BITSTAMP:ETHUSD',
            title: 'Ethereum',
          },
          {
            title: 'BACDv2',
            proName: 'UNISWAP3ETH:BACD2USDC',
          },
          {
            title: 'FREEdom Coin',
            proName: 'GATEIO:FREEUSDT',
          },
          {
            title: 'Solana',
            proName: 'COINBASE:SOLUSD',
          },
        ]}
        colorTheme={'dark'}
      />
      <Heading size="lg" marginBottom={6}>
        Charts
      </Heading>
      <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px" userSelect={'none'}>
        <ChartCard
          symbols={[
            ['Bitcoin', 'BTC'],
            ['Ethereum', 'ETH'],
            ['BACDv2', 'UNISWAP3ETH:BACD2USDC|1D'],
            ['Solana', 'SOL'],
            ['FREEcoin', 'GATEIO:FREEUSDT|1D'],
          ]}
          colorTheme={'dark'}
        />
      </Box>
    </>
  );
}

export default Charts;
