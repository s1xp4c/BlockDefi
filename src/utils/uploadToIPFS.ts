import Moralis from 'moralis';

const uploadToIPFS = (path: string, content: string) => {
  try {
    const abi = [
      {
        path,
        content,
      },
    ];

    if (!Moralis.Core.isStarted) {
      Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
    }

    const response = Moralis.EvmApi.ipfs.uploadFolder({
      abi,
    });
    console.log(response);
  } catch (e) {
    console.error(e);
  }
};
export default uploadToIPFS;
