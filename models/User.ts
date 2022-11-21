import mongoose, { Document, model, Schema } from "mongoose";

export type TUser = {
    email: string;
    password: string;
    avatar?: string;
};

export interface IUser extends TUser, Document {}

const userSchema: Schema = new Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    avatar: {
        type: mongoose.Schema.Types.String,
        default: "pfp placeholder",
    },
});

const User = model<IUser>("User", userSchema);
export default User;
