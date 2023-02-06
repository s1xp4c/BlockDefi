import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    profileId: {
      type: String,
    },
    balance: {
      type: Number,
    },

    bio: {
      type: String,
      default: 'Input a little about yourself :)',
    },
  },
  { timestamps: true },
);

const Users = mongoose.models.users || mongoose.model('users', userSchema);

export default Users;
