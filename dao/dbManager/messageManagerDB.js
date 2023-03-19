import messageSchema from "../models/message.Schema.js";

export default class MessageManagerDB {
  constructor() {
    console.log("MongoDB Message");
  }

  getAll = async () => {
    const messages = await messageSchema.find.lean();
    return messages;
  };

  saveMessage = async (message) => {
    let result = await messageSchema.create(message);
    return result;
  };
}