import mongoose, { Document, Model, ObjectId } from "mongoose";

export interface MessageDocument extends Document {
    sender: ObjectId;
    chat: ObjectId;
    content: string;
    attachments: string[],
    createdAt: string;
    updatedAt: string;
}

export type MessageModel = Model<MessageDocument>;

const messageSchema = new mongoose.Schema<MessageDocument, MessageModel>({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    },
    content: {
        type: String,
        minLength: 1,
        trim: true,
        required: true,
    },
    attachments: [
        {
            type: String,
            minLength: 1,
            trim: true,
        }
    ]
}, { timestamps: true });

const Message = mongoose.model<MessageDocument, MessageModel>('Message', messageSchema);
export default Message;
