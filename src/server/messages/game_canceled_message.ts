import { UUID } from "crypto";
import Message, { MessageType } from "./message";

export default class GameCanceledMessage extends Message {
    receiver: UUID
    constructor(receiver: UUID) {
        super(MessageType.game_canceled)

        this.receiver = receiver
    }
}