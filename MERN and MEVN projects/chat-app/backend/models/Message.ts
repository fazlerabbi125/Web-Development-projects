import mongoose, { Document, Model, ObjectId } from "mongoose";

export interface MessageDocument extends Document {
    sender: ObjectId;
    receivers: Array<ObjectId>;
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
    receivers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
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

const Message = mongoose.model<MessageDocument, MessageModel>('Message', messageSchema);
export default Message;
