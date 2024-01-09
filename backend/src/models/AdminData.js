import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name: { type: String, required: [true, 'name field is required.'] },
    password: { type: String, required: [true, 'password field is required.'] },
    createAt: { type: Date, default: Date.now() + 8*60*60*1000 }
});

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;