import { Configuration, OpenAIApi } from 'openai';

export default async (
  req: { body: { username: string; coin: string } },
  res: {
    status: (arg0: number) => {
      (): string;
      new (): string;
      json: { (arg0: { error?: unknown; result?: string | undefined }): void; new (): string };
    };
  },
) => {
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

  const username = req.body.username || 'Any';

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
      prompt: generatePrompt(coin, username),
      temperature: 0.8,
      max_tokens: 2048,
      echo: false,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ error });
    console.error(error);
  }
};

function generatePrompt(coin: string, username: string): string {
  const capitalizedCoin = coin[0].toUpperCase() + coin.slice(1).toLowerCase();
  return `List 5 similar crypto coins by on chain metrics from top 300 by marketcap with in depth explainations on why and try not to be generic when explaining each coin. Add a comment at the end for this person: "${username}" about crypto in general, make the comment witty and make sure to emphasize that it is not ivestment advice. Add an extra line off space between each answer. 
  Coin: ${capitalizedCoin}
  Name:`;
}
