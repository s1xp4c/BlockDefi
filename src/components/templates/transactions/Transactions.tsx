import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Heading,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

import { FC, useEffect } from 'react';
import { getEllipsisTxt } from 'utils/format';

import { ITransactions } from './types';

const Transactions: FC<ITransactions> = ({ transactions }) => {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => console.log('transactions: ', transactions), [transactions]);

  return (
    <>
      <Heading size="lg" marginBottom={6}>
        Transactions
      </Heading>
      {transactions?.length ? (
        <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px">
          <TableContainer w={'full'}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Chain</Th>
                  <Th>From</Th>
                  <Th>To</Th>
                  <Th>Amount</Th>
                  <Th isNumeric>Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions?.map((tx, key) => (
                  <Tr key={key} _hover={{ bgColor: hoverTrColor }} cursor="pointer">
                    <Td>{tx.chain}</Td>
                    <Td>{getEllipsisTxt(tx?.from || '')}</Td>
                    <Td>{getEllipsisTxt(tx?.to || '')}</Td>
                    <Td>{(tx.value / 1e18).toFixed(5)}</Td>
                    <Td isNumeric>{new Date(tx.blockTimestamp).toLocaleDateString()}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Chain</Th>
                  <Th>From</Th>
                  <Th>To</Th>
                  <Th>Amount</Th>
                  <Th isNumeric>Date</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box>Looks Like you do not have any transactions</Box>
      )}
    </>
  );
};

export default Transactions;
