import UserAuthMessage from './messages/in/UserAuthMessage';
import RoomCreatedMessage from './messages/in/RoomCreatedMessage';

export interface MessageTypesMap {
    hello: UserAuthMessage;
    roomCreated: RoomCreatedMessage
}