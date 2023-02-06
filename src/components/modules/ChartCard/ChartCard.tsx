import React from 'react';
import { SymbolOverview } from 'react-ts-tradingview-widgets';
import { Box } from '@chakra-ui/react';

interface TradingViewWidgetProps {
  symbols: [
    ['Bitcoin', 'BTC'],
    ['Ethereum', 'ETH'],
    ['BACDv2', 'UNISWAP3ETH:BACD2USDC|1D'],
    ['Solana', 'SOL'],
    ['FREEcoin', 'GATEIO:FREEUSDT|1D'],
  ];
  colorTheme: 'dark';
  isTransparent?: boolean;
}

const ChartCard: React.FC<TradingViewWidgetProps> = (props) => {
  return (
    <Box h={'xl'}>
      <SymbolOverview
        colorTheme={props.colorTheme}
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
