import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  VStack,
  Heading,
  Box,
  Text,
  Avatar,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { getEllipsisTxt } from 'utils/format';
import { IERC20Balances } from './types';
import { useSession } from 'next-auth/react';
import { LoadingSpinner } from 'components/modules';

const ERC20Balances: FC<IERC20Balances> = ({ balances }) => {
  const { status } = useSession();

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');
  const valueFirst = '1e';
  useEffect(() => console.log('balances: ', balances), [balances]);

  return (
    <>
      <Heading size="lg" marginBottom={6}>
        ERC20 Balances
      </Heading>
      {balances?.length ? (
        <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px">
          <TableContainer w={'full'}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Token</Th>
                  <Th>Amount</Th>
                  <Th isNumeric>Address</Th>
                </Tr>
              </Thead>
              <Tbody>
                {balances?.map(({ token, value, decimals, token_address }, key) => (
                  <Tr key={`${token?.symbol}-${key}-tr`} _hover={{ bgColor: hoverTrColor }} cursor="pointer">
                    <Td>
                      <HStack>
                        <Avatar size="sm" src={token?.logo || ''} name={token?.name} />
                        <VStack alignItems={'flex-start'}>
                          <Text as={'span'}>{token?.name}</Text>
                          <Text fontSize={'xs'} as={'span'}>
                            {token?.symbol}
                          </Text>
                        </VStack>
                      </HStack>
                    </Td>
                    <Td>
                      {(value / ((valueFirst as unknown as number) + ((decimals as unknown as number) || 18))).toFixed(
                        5,
                      )}
                    </Td>
                    <Td isNumeric>{getEllipsisTxt((token_address as unknown as string) || '')}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Token</Th>
                  <Th>Amount</Th>
                  <Th isNumeric>Address</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box>Looks Like you do not have any ERC20 tokens</Box>
      )}
    </>
  );
};

export default ERC20Balances;
