import { UUID } from "crypto";
import { BlackOrWhite } from "../global_types/enums/black_or_white";

export default class PlayerController {
    static player_color: BlackOrWhite = BlackOrWhite.white
    static player_id: UUID
    static opponent_user_id: UUID
    static in_online_game: boolean = false
}