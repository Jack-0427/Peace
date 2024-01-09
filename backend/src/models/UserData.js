import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    cardId: { type: String, required: [true, 'cardId field is required.'] },
    name: { type: String, required: [true, 'name field is required.'] },
    frontImgURL: { type: String, required: [true, 'frontImgURL field is required.'] },
    frontImgDeleteHash: { type: String, required: [true, 'frontImgDeleteHash field is required.'] },
    backImgURL: { type: String, required: [true, 'backImgURL field is required.'] },
    backImgDeleteHash: { type: String, required: [true, 'backImgDeleteHash field is required.'] },
    deleted: { type: Boolean, default: false },
    agreement: { type: String, default: "" },
    comment: { type: String, default: "" },
    hasBeenReviewed: { type: Boolean, default: false },
    videoURL: { type: String },
    videoDeleteHash: { type: String },
    updateAt: { type: Date, default: Date.now() + 8*60*60*1000 }
});

const User = mongoose.model('UserData', UserSchema)
export default User;

