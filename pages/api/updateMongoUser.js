import connectDB from '../../lib/connectDB';
import Users from '../../lib/userSchema';

export default async(req, res) => {
    const { profileId, bio, username, email, phone } = req.body;

    await connectDB();

    try {
        await Users.findOneAndUpdate({ profileId }, { bio, username, email, phone });
        res.status(200).json({ bio, username, email, phone });
    } catch (error) {
        res.status(400).json({ error });
        console.error(error);
    }
};