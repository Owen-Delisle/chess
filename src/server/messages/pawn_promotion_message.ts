import { UUID } from "crypto";
import Message, { MessageType } from "./message";
import { BlackOrWhite } from "../../global_types/enums/black_or_white";

export default class PawnPromotionMessage extends Message {
    recipient_id: UUID
    pawn_id: string
    pawn_pos: string
    pawn_color: BlackOrWhite

    constructor(recipient_id: UUID, pawn_id: string, pawn_pos: string, pawn_color: BlackOrWhite) {
        super(MessageType.pawn_promotion)

        this.recipient_id = recipient_id
        this.pawn_id = pawn_id
        this.pawn_pos = pawn_pos
        this.pawn_color = pawn_color
    }
}