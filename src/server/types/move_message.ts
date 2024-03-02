import { UUID } from "crypto"
import { Move } from "../../global_types/move"

export type MoveMessage = {
    type: MessageStyle
    recipient_id: UUID
    move: Move
}

export enum MessageStyle {
    direct,
    global
}