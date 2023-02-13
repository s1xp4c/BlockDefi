import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { InfoIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';

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
          <ModalHeader>{'Welcome to BACD Finance'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={'4'}>
            <Text>
              <InfoIcon color="green.400" marginRight={'2'} />
              {'Please be adviced that this is a final exam project from KEA and is to be used at your own discretion.'}
            </Text>

            <Text>{'Any and all content found in this dApp is purely for educational purposes. '}</Text>
            <br></br>
            <Text>
              <WarningTwoIcon color="yellow.400" marginRight={'2'} />
              {'Investing in Crypto Currency is highly speculative and may result in loss of funds. '}
            </Text>
            <br></br>
            <Text>{'Please DYOR! (Do Your Own Research)'}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default WelcomeModal;
