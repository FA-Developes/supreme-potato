import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    name: { type: String, required: true, unique: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/
    },
    passwordHash: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, default: false },
    createdOn: { type: Date, required: true }
});

export default mongoose.model('User', userSchema);

export type UserModel = {
    _id: string;
    email: string;
    name: string;
    taksbar: number[];
    passwordHash: string;
    isAdmin: boolean;
    createdOn: Date;
};
