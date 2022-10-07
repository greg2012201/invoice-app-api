import mongoose from 'mongoose';
import { IUser } from 'types';

const Schema = mongoose.Schema;

const userSchema = new Schema<IUser>(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    contractors: [{ type: Schema.Types.ObjectId, ref: 'Contractor' }],
  },
  {
    collection: 'User',
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', userSchema);
