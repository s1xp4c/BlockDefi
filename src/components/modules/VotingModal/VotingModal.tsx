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

function VotingModal() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent>
          <ModalHeader>Welcome to BACD Voting</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={'4'}>
            <Text>
              <InfoIcon color="green.400" marginRight={'2'} />
              {
                'Please be adviced that you need atleast 100 BACD tokens to vote and more than 1000 BACD tokens to make a proposal.'
              }
            </Text>

            <Text>{'Please connect the address from which you wish to vote in the Voting dashboard'}</Text>
            <br></br>
            <Text>
              <WarningTwoIcon color="yellow.400" marginRight={'2'} />
              {
                'If you do not currently have any BACD tokens in your wallet, feel free to make a Swap in the panel on the left'
              }
            </Text>
            <br></br>
            <Text>{'Please DYOR! (Do Your Own Research)'}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default VotingModal;
