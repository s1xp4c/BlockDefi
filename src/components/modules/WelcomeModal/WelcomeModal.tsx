import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Box,
  Grid,
  Button,
} from '@chakra-ui/react';
import { QuestionIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import { ConnectButton } from '../ConnectButton';
import React from 'react';

function WelcomeModal() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent>
          <ModalHeader textAlign={'center'} py={6} pl={1}>
            {'Welcome to BACD Finance'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={'4'}>
            <Box display={'flex'} pb={4}>
              <Box textAlign={'center'}>
                <WarningTwoIcon color="red.400" marginRight={4} />
              </Box>
              <Box>
                <Text pb={2}>
                  {'Investing in Crypto Currency is highly speculative and may result in loss of funds. '}
                </Text>
                <Text>{'Please DYOR! (Do Your Own Research)'}</Text>
              </Box>
            </Box>

            <Box pb={4}>
              <Box display={'flex'} pb={4}>
                <Box textAlign={'center'}>
                  <QuestionIcon color="green.400" marginRight={4} />
                </Box>
                <Text>{'Want to experience the full utility of BACD Finance?'}</Text>
              </Box>
            </Box>
            <Box>
              <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <Box>
                  <Button colorScheme="orange" size="sm" mr={3} onClick={onClose}>
                    {'NO! - Go sightseing'}
                  </Button>
                </Box>
                <Box></Box>
                <Box alignContent={'right'}>
                  <ConnectButton />
                </Box>
              </Grid>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default WelcomeModal;
