import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

const messageSchema: Schema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        minLength: 1,
        trim: true,
        required: true,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    },
    attachments: [
        {
            type: String,
            minLength: 1,
            trim: true,
        }
    ]
}, { timestamps: true });

export interface MessageDocument extends Document {
    sender: ObjectId;
    chat: ObjectId;
    content: string;
    attachments: string[],
    createdAt: string;
    updatedAt: string;
}

export type MessageModel = Model<MessageDocument>;

const Message = mongoose.model<MessageDocument>('Message', messageSchema);
export default Message;
