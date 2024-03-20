import { UUID } from "crypto";
import Message, { MessageType } from "./message";

export default class GameDeclinedMessage extends Message {
    receiver: UUID
    message: string
    constructor(receiver: UUID, message: string) {
        super(MessageType.game_declined)
        this.receiver = receiver
        this.message = message
    }
}