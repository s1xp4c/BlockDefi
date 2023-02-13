import { InjectedConnector } from 'wagmi/connectors/injected';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import apiPost from 'utils/apiPost';
import { Button, Text, HStack, Avatar, useToast, Box } from '@chakra-ui/react';
import { getEllipsisTxt } from 'utils/format';
import axios from 'axios';
import { useState } from 'react';

const ConnectButton = () => {
  const { connectAsync } = useConnect({ connector: new InjectedConnector() });
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const toast = useToast();
  const { data } = useSession();
  const [isHovered, setIsHovered] = useState(false);

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync();
    }
    try {
      const { account, chain } = await connectAsync();
      const userData = { address: account, chain: chain.id, network: 'evm' };
      const { message } = await apiPost('/auth/request-message', userData);
      const signature = await signMessageAsync({ message });

      await axios.post('/api/auth/request-message', userData, {
        headers: {
          'content-type': 'application/json',
        },
      });

      await signIn('credentials', { message, signature, callbackUrl: '/' });
    } catch (e) {
      toast({
        title: 'Oops, something is wrong...',
        description: (e as { message: string })?.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  const handleDisconnect = async () => {
    await disconnectAsync();
    signOut({ callbackUrl: '/' });
  };

  if (data?.user) {
    return (
      <Box onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <HStack onClick={handleDisconnect} cursor={'pointer'}>
          {isHovered ? (
            <Button size="sm" colorScheme="red">
              {'Disconnect Wallet'}
            </Button>
          ) : (
            <>
              <Avatar size="xs" />
              <Text fontWeight="medium">{getEllipsisTxt(data.user.address)}</Text>
            </>
          )}
        </HStack>
      </Box>
    );
  }

  return (
    <Button size="sm" onClick={handleAuth} colorScheme="blue">
      {'Connect Wallet'}
    </Button>
  );
};

export default ConnectButton;
