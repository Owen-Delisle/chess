import { UUID } from "crypto";
import Message, { MessageType } from "./message";

export default class EnPasssantMessage extends Message {
    recipient_id: UUID
    pawn_to_take_pos: string

    constructor(recipient_id: UUID, pawn_to_take_pos: string) {
        super(MessageType.en_passant)

        this.recipient_id = recipient_id
        this.pawn_to_take_pos = pawn_to_take_pos
    }
}