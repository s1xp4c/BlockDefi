import connectDB from '../../lib/connectDB';
import Users from '../../lib/userSchema';

export default async (req, res) => {
  const { profileId, bio, username } = req.body;

  await connectDB();

  try {
    await Users.findOneAndUpdate({ profileId }, { bio, username });
    res.status(200).json({ bio, username });
  } catch (error) {
    res.status(400).json({ error });
    console.error(error);
  }
};
