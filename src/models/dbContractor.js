import mongoose from 'mongoose';

const Schema = mongoose.Schema

const contractorSchema =   new Schema({
  name: String,
  nip: Number,
  address: String,
  tel: String,
  email: String,
  invoices: Array,
},
{
    collection: 'Challenge',
    timestamps: true,
  });

export default mongoose.model('Contractor', contractorSchema);
