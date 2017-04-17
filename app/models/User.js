import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    type: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String
}, {
    timestamps: true
});

export default mongoose.model('User', UserSchema);
