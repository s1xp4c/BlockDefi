import React from 'react';
import { SymbolOverview } from 'react-ts-tradingview-widgets';
import { Box, useColorModeValue } from '@chakra-ui/react';

interface TradingViewWidgetProps {
  symbols: [
    ['Bitcoin', 'BTCUSD'],
    ['Ethereum', 'ETHUSD'],
    ['BACDv2', 'UNISWAP3ETH:BACD2USDC|1D'],
    ['Solana', 'SOLUSD'],
    ['FREEcoin', 'GATEIO:FREEUSDT|1D'],
    ['dYdX', 'DYDXUSD'],
  ];
  colorTheme: string;
  isTransparent?: boolean;
}

const ChartCard: React.FC<TradingViewWidgetProps> = (props) => {
  return (
    <Box h={'xl'}>
      <SymbolOverview
        colorTheme={useColorModeValue('light', 'dark')}
        autosize
        chartType="candlesticks"
        downColor="#800080"
        borderDownColor="#800080"
        symbols={props.symbols}
        wickDownColor="#800080"
        dateFormat={"dd MMM 'yy"}
        isTransparent={props.isTransparent}
      />
    </Box>
  );
};

export default ChartCard;
