import React from 'react';
import { TickerTape } from 'react-ts-tradingview-widgets';
import { Box } from '@chakra-ui/react';

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
  ];
  colorTheme: 'dark';
  isTransparent?: boolean;
  showSymbolLogo?: boolean;
  locale?: string;
}

const Ticker: React.FC<TradingViewWidgetProps> = (props) => {
  return (
    <Box>
      <TickerTape
        showSymbolLogo={true}
        colorTheme={props.colorTheme}
        locale="en"
        symbols={props.symbols}
        isTransparent={props.isTransparent}
      />
    </Box>
  );
};

export default Ticker;
