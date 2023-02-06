import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    profileId: {
      type: String,
    },
    bio: {
      type: String,
      default: 'Input a little about yourself :)',
    },
    address: {
      type: String,
    },
    username: {
      type: String,
    },
  },
  { timestamps: true },
);

const Users = mongoose.models.users || mongoose.model('users', userSchema);

export default Users;
