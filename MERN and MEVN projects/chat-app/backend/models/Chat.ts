import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

const chatSchema: Schema = new mongoose.Schema({
    isGroupChat: {
        type: Boolean,
        default: false,
    },
    groupName: {
        type: String,
        minLength: 1,
        trim: true,
        default: null,
        required: function () {
            return this.isGroupChat;
        }
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: "Chat members are required",
            ref: "User"
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ],
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
        required: function () {
            return this.isGroupChat;
        }
    }
}, { timestamps: true });

export interface ChatDocument extends Document {
    isGroupChat: boolean;
    groupName?: string | null;
    members: Array<ObjectId>;
    messages: Array<ObjectId>;
    groupAdmin?: ObjectId | null;
    createdAt: string;
    updatedAt: string;
}
export type ChatModel = Model<ChatDocument>;

const Chat = mongoose.model<ChatDocument>('Chat', chatSchema);
export default Chat;
