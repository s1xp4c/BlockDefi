import type { NextApiRequest, NextApiResponse } from 'next';

import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: 'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

  const coin = req.body.coin || 'Any';
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
      temperature: 0.8,
      max_tokens: 2048,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ error });
    console.error(error);
  }
}

function generatePrompt(coin: string): string {
  const capitalizedCoin = coin[0].toUpperCase() + coin.slice(1).toLowerCase();
  return `List 5 similar crypto coins by on chain metrics from top 300 by marketcap with in depth explainations on why and throw in a comment or two.
  Coin: ${capitalizedCoin}
  Names:`;
}
