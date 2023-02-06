import Moralis from 'moralis';

export const resolveENS = async (address?: string) => {
  try {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
    }

    const response = await Moralis.EvmApi.resolve.resolveAddress({
      address,
    });

    console.log(response?.result);
  } catch (e) {
    console.error(e);
  }
};
