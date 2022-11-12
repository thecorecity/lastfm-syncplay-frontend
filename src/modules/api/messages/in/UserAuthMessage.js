import BaseMessage from "../../base/BaseMessage";

export default class UserAuthMessage extends BaseMessage {
  get userId() {
    return this._payload.userId;
  }
}