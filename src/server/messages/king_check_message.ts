import { UUID } from "crypto";
import Message, { MessageType } from "./message";
import Square from "../../components/square/square";

export default class KingCheckStatusMessage extends Message {
    recipient_id: UUID
    check_status: CheckStatus
    square: Square

    constructor(recipient_id: UUID, square: Square, check_status: CheckStatus) {
        super(MessageType.king_check_status)

        this.recipient_id = recipient_id
        this.square = square
        this.check_status = check_status
    }
}

export enum CheckStatus {
    in_check,
    not_in_check
}