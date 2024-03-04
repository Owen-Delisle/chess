import { UUID } from "crypto";
import Message, { MessageType } from "./message";

export default class GameAcceptedMessage extends Message {
    sender: UUID
    receiver: UUID
    constructor(sender: UUID, receiver: UUID) {
        super(MessageType.game_accepted)

        this.receiver = receiver
        this.sender = sender
    }
}