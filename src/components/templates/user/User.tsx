import { useState, FC } from 'react';
import React from 'react';
import axios from 'axios';

import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
  Box,
  useColorModeValue,
  Button,
  Input,
  Grid,
  GridItem,
  Avatar,
  useBoolean,
  Textarea,
  useToast,
  keyframes,
  InputLeftAddon,
  InputGroup,
  Stack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { EditIcon, CopyIcon, EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { getEllipsisTxt } from 'utils/format';
import ultralightCopy from 'copy-to-clipboard-ultralight';
import { IUserData } from './types';
import { MetaMaskAvatar } from 'components/elements';

const User: FC<IUserData> = ({ userData }) => {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');
  const [addressHovered, setAddressHovered] = useBoolean();
  const [profileIdHovered, setProfileIdHovered] = useBoolean();

  const [inputValueName, setInputValueName] = useState('');
  const [inputValueBio, setInputValueBio] = useState('');
  const [inputValueEmail, setInputValueEmail] = useState('');
  const [inputValuePhone, setInputValuePhone] = useState('');

  const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0); border-radius: 20%; }
  100% { transform: scale(0) rotate(0); border-radius: 20%; }
`;
  const animation = `${animationKeyframes} 4s ease-out `;

  const toast = useToast();

  const copyToClipboard = (e: string | undefined) => {
    if (e) {
      ultralightCopy(e);
    }
  };

  async function updateUserBio() {
    const { data } = await axios.post(
      'api/updateMongoUser',
      { profileId: userData.profileId, bio: inputValueBio },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );
    setInputValueName('');
    console.log(`User Updated with: ${data.bio}`);
  }

  async function updateUserName() {
    const { data } = await axios.post(
      'api/updateMongoUser',
      { profileId: userData.profileId, username: inputValueName },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );

    console.log(`User Updated with: ${data.username}`);
  }

  async function updateUserEmail() {
    const { data } = await axios.post(
      'api/updateMongoUser',
      { profileId: userData.profileId, email: inputValueEmail },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );

    console.log(`User Updated with: ${data.email}`);
  }

  async function updateUserPhone() {
    const { data } = await axios.post(
      'api/updateMongoUser',
      { profileId: userData.profileId, phone: inputValuePhone },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );

    console.log(`User Updated with: ${data.phone}`);
  }

  return (
    <>
      <Grid templateColumns="repeat(1, 1fr)" gap={4}>
        <GridItem colSpan={1}>
          <Heading size="lg" marginBottom={6}>
            User Info
          </Heading>
        </GridItem>
      </Grid>

      {userData?.profileId ? (
        <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="26px 18px" userSelect={'none'}>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Username:</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr _hover={{ bgColor: hoverTrColor }} cursor="pointer">
                  <Td>{inputValueName ? inputValueName : userData.username}</Td>
                  <Td></Td>
                </Tr>
              </Tbody>
            </Table>
            <Table>
              <Tbody>
                <Tr>
                  <Td>
                    <>
                      <Stack spacing={4}>
                        <InputGroup>
                          <InputLeftAddon pointerEvents="none" children={<Avatar size="xs" color="gray.300" />} />
                          <Input
                            value={inputValueName}
                            onChange={(e) => setInputValueName(e.target.value)}
                            id="nameInput"
                            placeholder={'Update your cool Username?'}
                          ></Input>
                        </InputGroup>
                      </Stack>
                    </>
                  </Td>
                  <Td textAlign={'right'} w={'20px'}>
                    <Box
                      onClick={() =>
                        toast({
                          position: 'top',
                          title: 'Perfect!',
                          description: 'Your username is updated',
                          status: 'success',
                          duration: 3000,
                          isClosable: false,
                          variant: 'solid',
                        })
                      }
                    >
                      <Button onClick={() => updateUserName()}>
                        <EditIcon></EditIcon>{' '}
                      </Button>
                    </Box>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
            <Table>
              <Thead>
                <Tr>
                  <Th>E-mail:</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr _hover={{ bgColor: hoverTrColor }} cursor="pointer">
                  <Td>{!inputValueEmail ? userData.email : inputValueEmail}</Td>
                  <Td></Td>
                </Tr>
              </Tbody>
            </Table>
            <Table>
              <Tbody>
                <Tr>
                  <Td>
                    <>
                      <Stack spacing={4}>
                        <InputGroup>
                          <InputLeftAddon
                            pointerEvents="none"
                            children={<EmailIcon fontSize="1.6em" color="gray.300" />}
                          />
                          <Input
                            type={'email'}
                            value={inputValueEmail}
                            onChange={(e) => setInputValueEmail(e.target.value)}
                            id="emailInput"
                            placeholder={'Set your E-mail'}
                          ></Input>
                        </InputGroup>
                      </Stack>
                    </>
                  </Td>
                  <Td textAlign={'right'} w={'20px'}>
                    <Box
                      onClick={() =>
                        toast({
                          position: 'top',
                          title: 'Yeeees!',
                          description: 'Your E-mail is updated',
                          status: 'success',
                          duration: 3000,
                          isClosable: false,
                          variant: 'solid',
                        })
                      }
                    >
                      <Button onClick={() => updateUserEmail()}>
                        <EditIcon></EditIcon>{' '}
                      </Button>
                    </Box>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
            <Table>
              <Thead>
                <Tr>
                  <Th>Phone:</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr _hover={{ bgColor: hoverTrColor }} cursor="pointer">
                  <Td>{!inputValuePhone ? userData.phone : inputValuePhone}</Td>
                  <Td></Td>
                </Tr>
              </Tbody>
            </Table>
            <Table>
              <Tbody>
                <Tr>
                  <Td>
                    <>
                      <Stack spacing={4}>
                        <InputGroup>
                          <InputLeftAddon
                            pointerEvents="none"
                            children={<PhoneIcon fontSize="1.6em" color="gray.300" />}
                          />
                          <Input
                            type="tel"
                            value={inputValuePhone}
                            onChange={(e) => setInputValuePhone(e.target.value)}
                            id="phoneInput"
                            placeholder={'Let us call you <3'}
                          ></Input>
                        </InputGroup>
                      </Stack>
                    </>
                  </Td>
                  <Td textAlign={'right'} w={'20px'}>
                    <Box
                      onClick={() =>
                        toast({
                          position: 'top',
                          title: 'Ringleberry!',
                          description: 'Your Phone number is updated',
                          status: 'success',
                          duration: 3000,
                          isClosable: false,
                          variant: 'solid',
                        })
                      }
                    >
                      <Button onClick={() => updateUserPhone()}>
                        <EditIcon></EditIcon>{' '}
                      </Button>
                    </Box>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
            <Table>
              <Thead>
                <Tr>
                  <Th>About You</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr _hover={{ bgColor: hoverTrColor }} cursor="pointer">
                  <Td id="pWrap">{!inputValueBio ? userData.bio : inputValueBio}</Td>
                  <Td></Td>
                </Tr>
              </Tbody>
            </Table>
            <Table>
              <Tbody>
                <Tr>
                  <Td>
                    <>
                      <style>
                        {`#pWrap {
          white-space: pre-line;
        }`}
                      </style>
                      <Textarea
                        id="pWrap"
                        rows={3}
                        placeholder={'So, what´s up with You?'}
                        resize={'none'}
                        value={inputValueBio}
                        onChange={(e) => setInputValueBio(e.target.value)}
                      ></Textarea>
                    </>
                  </Td>
                  <Td textAlign={'right'} w={'20px'}>
                    <Box
                      onClick={() =>
                        toast({
                          position: 'top',
                          title: 'Shazaaaaam!',
                          description: 'Your personal bio has been updated',
                          status: 'success',
                          duration: 3000,
                          isClosable: false,
                          variant: 'solid',
                        })
                      }
                    >
                      <Button onClick={() => updateUserBio()}>
                        <EditIcon></EditIcon>{' '}
                      </Button>
                    </Box>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
            <Table>
              <Thead>
                <Tr>
                  <Th>Profile ID:</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr
                  _hover={{ bgColor: hoverTrColor }}
                  onMouseEnter={setProfileIdHovered.on}
                  onMouseLeave={setProfileIdHovered.off}
                  cursor="pointer"
                >
                  {profileIdHovered ? <Td>{userData.profileId}</Td> : <Td>{getEllipsisTxt(userData.profileId)}</Td>}
                  <Td textAlign={'right'} w={'20px'}>
                    <Box
                      onClick={() =>
                        toast({
                          position: 'top',
                          title: 'Great!',
                          description: 'User ID copied to clipboard.',
                          status: 'success',
                          duration: 3000,
                          isClosable: false,
                          variant: 'solid',
                        })
                      }
                    >
                      <Button
                        onClick={() => {
                          copyToClipboard(userData.profileId);
                        }}
                      >
                        <CopyIcon></CopyIcon>
                      </Button>
                    </Box>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
            <Table>
              <Thead>
                <Tr>
                  <Th>wallet address:</Th>
                  <Th textAlign={'right'}>
                    <Box as={motion.div} animation={animation} px={1}>
                      <MetaMaskAvatar account={userData.address} />
                    </Box>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr
                  _hover={{ bgColor: hoverTrColor }}
                  onMouseEnter={setAddressHovered.on}
                  onMouseLeave={setAddressHovered.off}
                  cursor="pointer"
                >
                  {!addressHovered ? <Td>{getEllipsisTxt(userData.address)}</Td> : <Td>{userData.address}</Td>}
                  <Td textAlign={'right'} w={'20px'}>
                    {' '}
                    <Box
                      onClick={() =>
                        toast({
                          position: 'top',
                          title: 'Success!',
                          description: 'Wallet Address copied to clipboard.',
                          status: 'success',
                          duration: 3000,
                          isClosable: false,
                          variant: 'solid',
                        })
                      }
                    >
                      <Button
                        onClick={() => {
                          copyToClipboard(userData.address);
                        }}
                      >
                        <CopyIcon></CopyIcon>
                      </Button>
                    </Box>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box>Looks Like you need to connect your wallet</Box>
      )}
    </>
  );
};
export default User;
