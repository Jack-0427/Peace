import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    name: { type: String, required: [true, 'name field is required.'] },
    phone: { type: String, required: [true, 'phone field is required.'] },
    email: { type: String, required: [true, 'email field is required.'] },
    state: { type: String, required: [true, 'state field is required.'] },
    special: { type: String, default: "預約中" },
    location: { type: String, required: [true, 'location field is required.'] },
    service: { type: String, required: [true, 'service field is required.'] },
    time: { type: String, required: [true, 'time field is required.'] },
});

const Service = mongoose.model('Service', ServiceSchema)
export default Service;