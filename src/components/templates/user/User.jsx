import { useState, useEffect } from 'react';
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

function User({ user }) {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');
  const [addressHovered, setAddressHovered] = useBoolean();
  const [profileIdHovered, setProfileIdHovered] = useBoolean();

  const [bioValue, changeBioValue] = useState();
  const [nameValue, changeNameValue] = useState();

  const [pulledBio, changePulledBio] = useState(user.bio);
  const [pulledName, changePulledName] = useState(user.username);

  const [inputValueName, changeInputValueName] = useState(undefined);
  const [inputValueBio, changeInputValueBio] = useState(undefined);

  const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0); border-radius: 20%; }
  100% { transform: scale(0) rotate(0); border-radius: 20%; }
`;
  const animation = `${animationKeyframes} 4s ease-out `;

  const toast = useToast();

  const userProfileId = user.profileId;
  const userAddress = user.address;

  useEffect(() => console.log('user: ', user), [user]);

  const copyToClipboard = (e) => {
    if (e) {
      ultralightCopy(e);
    }
  };

  async function updateUserBio() {
    const { data } = await axios.post(
      'api/updateMongoUser',
      { profileId: user.profileId, bio: bioValue, username: nameValue },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );
    changePulledBio(data.bio);
    changeInputValueBio('');
    console.log(`User Updated with: ${data.bio}`);
  }

  async function updateUserName() {
    const { data } = await axios.post(
      'api/updateMongoUser',
      { profileId: user.profileId, username: nameValue },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );
    changePulledName(data.username);
    changeInputValueName('');
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

      {user ? (
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
                  {profileIdHovered ? <Td>{userProfileId}</Td> : <Td>{getEllipsisTxt(userProfileId)}</Td>}
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
                          motionPreset: 'slide-in-top',
                        })
                      }
                    >
                      <Button onClick={copyToClipboard(userProfileId)}>
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
                  <Td>{pulledName}</Td>
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
                        id="nameInput"
                        onChange={(e) => {
                          changeNameValue(e.target.value);
                        }}
                        placeholder={'Update your cool Username?'}
                        value={inputValueName}
                      ></Input>
                    }
                  </Td>
                  <Td textAlign={'right'} w={'20px'}>
                    {
                      <Button onClick={() => updateUserName()}>
                        <EditIcon></EditIcon>{' '}
                      </Button>
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
                  {!addressHovered ? <Td>{getEllipsisTxt(userAddress)}</Td> : <Td>{userAddress}</Td>}
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
                          motionPreset: 'slide-in-top',
                        })
                      }
                    >
                      <Button onClick={copyToClipboard(userAddress)}>
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
                  <Td id="pWrap">{pulledBio}</Td>
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
                          id="aboutInput"
                          type="textarea"
                          rows={3}
                          onChange={(e) => changeBioValue(e.target.value)}
                          placeholder={'So, what´s up with You?'}
                          value={inputValueBio}
                          resize={'none'}
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
}
export default User;
