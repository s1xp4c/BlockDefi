import { Configuration, OpenAIApi } from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: 'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

  const coin = req.body.coin || '';
  if (coin.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid Crypto coin',
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(coin),
      temperature: 0.6,
      max_tokens: 1000,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ error });
    console.error(error);
  }
}

function generatePrompt(coin: string): string {
  const capitalizedCoin = coin[0].toUpperCase() + coin.slice(1).toLowerCase();
  return `List 5 similar crypto coins by on chain metrics from top 300 by marketcap with in depth explainations on why.
  Coin: ${capitalizedCoin}
  Names:`;
}
