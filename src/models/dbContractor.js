import mongoose from 'mongoose';

const contractorSchema = mongoose.Schema({
  name: String,
  nip: Number,
  adress: String,
  tel: Number,
  email: String,
  invoices: Array,
});

export default mongoose.model('contractors', contractorSchema);
