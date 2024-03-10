import { UUID } from "crypto";
import Message, { MessageType } from "./message";

export default class GameDeclinedMessage extends Message {
    receiver: UUID
    constructor(receiver: UUID) {
        super(MessageType.game_declined)

        this.receiver = receiver
    }
}