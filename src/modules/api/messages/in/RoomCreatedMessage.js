import BaseMessage from "@/modules/api/base/BaseMessage";

export default class RoomCreatedMessage extends BaseMessage {
  get roomId() {
    return this._payload.roomId;
  }
}