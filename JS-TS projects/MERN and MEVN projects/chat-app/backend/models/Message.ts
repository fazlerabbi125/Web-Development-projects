import mongoose, { HydratedDocument, Model } from "mongoose";

interface MessageProps {
    sender: mongoose.Schema.Types.ObjectId;
    chat: mongoose.Schema.Types.ObjectId;
    content?: string;
    attachments: string[]
}

const messageSchema = new mongoose.Schema<MessageProps>({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        minLength: 1,
        trim: true,
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

export type ChatDocument = HydratedDocument<MessageProps>;
export type ChatModel = Model<ChatDocument>;

const Message = mongoose.model('Message', messageSchema);
export default Message;
