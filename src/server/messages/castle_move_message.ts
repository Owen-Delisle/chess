import { UUID } from "crypto";
import { MessageTargetType } from "../types/message_target_type";
import Message, { MessageType } from "./message";
import { CastleMove } from "../../global_types/castle_move";

export default class CastleMoveMessage extends Message {
    target_type: MessageTargetType
    recipient_id: UUID
    castle_move: CastleMove
    constructor(target_type: MessageTargetType, recipient_id: UUID, castle_move: CastleMove) {
        super(MessageType.castle_move)
        this.target_type = target_type
        this.recipient_id = recipient_id
        this.castle_move = castle_move
    }
}