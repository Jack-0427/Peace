import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    cardId: { type: String, required: [true, 'cardId field is required.'] },
    name: { type: String, default: "" },
    password: { type: String, required: [true, 'password field is required.'] },
    createAt: { type: Date, default: Date.now() + 8*60*60*1000 }
});

const Account = mongoose.model('Account', AccountSchema)
export default Account;