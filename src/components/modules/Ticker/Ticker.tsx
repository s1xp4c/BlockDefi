import React from 'react';
import { TickerTape } from 'react-ts-tradingview-widgets';
import { Box, useColorModeValue } from '@chakra-ui/react';

interface TradingViewWidgetProps {
  symbols: [
    {
      proName: 'BITSTAMP:BTCUSD';
      title: 'Bitcoin';
    },
    {
      proName: 'BITSTAMP:ETHUSD';
      title: 'Ethereum';
    },
    {
      proName: 'UNISWAP3ETH:BACD2USDC';
      title: 'BACDv2';
    },
    {
      proName: 'GATEIO:FREEUSDT';
      title: 'FREEdom Coin';
    },
    {
      proName: 'COINBASE:SOLUSD';
      title: 'Solana';
    },
    {
      proName: 'COINBASE:GRTUSD';
      title: 'The Graph';
    },
    {
      proName: 'COINBASE:LRCUSD';
      title: 'Loopring';
    },
  ];
  colorTheme: string;
  isTransparent?: boolean;
  showSymbolLogo?: boolean;
  locale?: string;
}

const Ticker: React.FC<TradingViewWidgetProps> = (props) => {
  return (
    <Box boxShadow={'xl'} p={3} mb={3} rounded={'xl'}>
      <TickerTape
        showSymbolLogo={true}
        colorTheme={useColorModeValue('light', 'dark')}
        locale="en"
        symbols={props.symbols}
        isTransparent={props.isTransparent}
      />
    </Box>
  );
};

export default Ticker;
