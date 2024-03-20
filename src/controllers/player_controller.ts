import { UUID } from "crypto";
import { BlackOrWhite } from "../global_types/enums/black_or_white";

export default class PlayerController {
    static player_color: BlackOrWhite
    static player_id: UUID
    static opponent_user_id: UUID | string = "none"
}