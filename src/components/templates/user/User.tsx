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
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { EditIcon, CopyIcon } from '@chakra-ui/icons';
import { getEllipsisTxt } from 'utils/format';
import ultralightCopy from 'copy-to-clipboard-ultralight';
import { IUserData } from './types';

const User: FC<IUserData> = ({ userData }) => {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');
  const [addressHovered, setAddressHovered] = useBoolean();
  const [profileIdHovered, setProfileIdHovered] = useBoolean();

  const [inputValueName, setInputValueName] = useState('');
  const [inputValueBio, setInputValueBio] = useState('');

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
                  <Th>User ID:</Th>
                  <Th textAlign={'right'}>
                    <Box as={motion.div} animation={animation}>
                      <Avatar></Avatar>
                    </Box>
                  </Th>
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
                    {' '}
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
                  <Th>Username:</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr _hover={{ bgColor: hoverTrColor }} cursor="pointer">
                  <Td>{!inputValueName ? userData.username : inputValueName}</Td>
                  <Td></Td>
                </Tr>
              </Tbody>
            </Table>

            <Table>
              <Tbody>
                <Tr>
                  <Td>
                    {' '}
                    {
                      <Input
                        value={inputValueName}
                        onChange={(e) => setInputValueName(e.target.value)}
                        id="nameInput"
                        placeholder={'Update your cool Username?'}
                      ></Input>
                    }
                  </Td>
                  <Td textAlign={'right'} w={'20px'}>
                    {
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
                    }
                  </Td>
                </Tr>
              </Tbody>
            </Table>
            <Table>
              <Thead>
                <Tr>
                  <Th>deFi wallet address:</Th>
                  <Th></Th>
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
                    {
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
                    }
                  </Td>
                  <Td textAlign={'right'} w={'20px'}>
                    {
                      <Button onClick={() => updateUserBio()}>
                        <EditIcon></EditIcon>{' '}
                      </Button>
                    }
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
