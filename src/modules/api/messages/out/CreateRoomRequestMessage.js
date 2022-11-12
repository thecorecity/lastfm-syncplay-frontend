import BaseMessage from "@/modules/api/base/BaseMessage";

export default class CreateRoomRequestMessage extends BaseMessage {
  constructor({password = null}) {
    super({$t: 'createRoom', password});
  }
}