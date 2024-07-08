import * as dynamoose from "dynamoose";
import { Item } from "dynamoose/dist/Item";
import { v4 as uuidv4 } from "uuid";

interface Message extends Item {
  channelId: string;
  createdAt_messageId: string;
  content: string;
}
// Define the schema
const messageSchema = new dynamoose.Schema({
  channelId: {
    type: String,
    hashKey: true,
  },
  createdAt_messageId: {
    type: String,
    rangeKey: true,
    default: () => {
      const now = Date.now();
      const uniqueId = uuidv4();
      return `${now.toString().padStart(20, "0")}_${uniqueId}`;
    },
  },
  content: {
    type: String,
    required: true,
  },
});

// Define the Message model
export const Message = dynamoose.model<Message>("messages", messageSchema);