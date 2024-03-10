import { UUID } from "crypto";
import Message, { MessageType } from "./message";

export default class PawnPromotionMessage extends Message {
    recipient_id: UUID
    pawn_id: string

    constructor(recipient_id: UUID, pawn_id: string) {
        super(MessageType.pawn_promotion)

        this.recipient_id = recipient_id
        this.pawn_id = pawn_id
    }
}