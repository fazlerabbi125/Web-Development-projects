import mongoose, { HydratedDocument, Model } from "mongoose";

interface ChatProps {
    isGroupChat: boolean;
    groupName?: string;
    members: Array<mongoose.Schema.Types.ObjectId>;
    messages: Array<mongoose.Schema.Types.ObjectId>;
    groupAdmin?: mongoose.Schema.Types.ObjectId
}

const chatSchema = new mongoose.Schema<ChatProps>({
    isGroupChat: {
        type: Boolean,
        default: false,
    },
    groupName: {
        type: String,
        minLength: 1,
        trim: true,
        default: "",
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

export type ChatDocument = HydratedDocument<ChatProps>;
export type ChatModel = Model<ChatDocument>;

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
