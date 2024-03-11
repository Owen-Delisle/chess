import { UUID } from "crypto";
import Message, { MessageType } from "./message";
import { BlackOrWhite } from "../../global_types/enums/black_or_white";

export default class GameAcceptedMessage extends Message {
    sender: UUID
    receiver: UUID
    color: BlackOrWhite

    constructor(sender: UUID, receiver: UUID, color: BlackOrWhite) {
        super(MessageType.game_accepted)

        this.receiver = receiver
        this.sender = sender
        this.color = color
    }
}