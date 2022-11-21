import mongoose, { Document, model, Schema } from "mongoose";

export type TToken = {
    email: string;
    token: string;
    createdAt?: string;
};

const VerToken: Schema = new Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    token: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
        expires: "5m",
    },
});

export interface IToken extends TToken, Document {}
const Token = model<IToken>("Token", VerToken);

export default Token;
