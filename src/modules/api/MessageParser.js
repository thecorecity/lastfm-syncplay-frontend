import UserAuthMessage from "@/modules/api/messages/in/UserAuthMessage";
import RoomCreatedMessage from "@/modules/api/messages/in/RoomCreatedMessage";


export const MessageTypes = {
  hello: UserAuthMessage,
  roomCreated: RoomCreatedMessage
}

export default class MessageParser {
  /**
   * @param {MessageEvent} message
   * @return {BaseMessage}
   */
  parse(message) {
    const payload = JSON.parse(message.data);
    const messageType = payload['$t'];

    if (!MessageTypes.hasOwnProperty(messageType)) {
      throw new Error(`Unknown message type: ${messageType}`);
    }

    /** @type {typeof BaseMessage} */
    const MessageClass = MessageTypes[messageType];

    return new MessageClass(payload);
  }
}