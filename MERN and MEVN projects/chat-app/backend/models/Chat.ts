import mongoose, { Document, Model, ObjectId } from "mongoose";

export interface ChatDocument extends Document {
    isGroupChat: boolean;
    groupName?: string | null;
    members: Array<ObjectId>;
    messages: Array<ObjectId>;
    latestMessage: ObjectId;
    groupAdmin?: ObjectId | null;
    isConnected?: boolean;
    createdAt: string;
    updatedAt: string;
}
export type ChatModel = Model<ChatDocument>;

const chatSchema = new mongoose.Schema<ChatDocument, ChatModel>({
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
        },
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Chat members are required"],
            ref: "User"
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
        required: function () {
            return this.isGroupChat;
        },
    },
    isConnected: {
        type: Boolean,
        default: false,
        required: function () {
            return !this.isGroupChat;
        },
    }
}, { timestamps: true });

const Chat = mongoose.model<ChatDocument, ChatModel>('Chat', chatSchema);
export default Chat;
