import { UUID } from "crypto";
import { MessageTargetType } from "../types/message_target_type";
import Message, { MessageType } from "./message";
import { Move } from '../../global_types/move'

export default class MoveMessage extends Message {
    target_type: MessageTargetType
    recipient_id: UUID
    move: Move
    constructor(target_type: MessageTargetType, recipient_id: UUID, move: Move) {
        super(MessageType.move)
        this.target_type = target_type
        this.recipient_id = recipient_id
        this.move = move
    }
}