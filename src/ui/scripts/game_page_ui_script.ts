import { add_click_event_to_element, get_element_by_id } from "../utils/funcs";
import { instantiate_offline_game } from "../board/board_dom_controller";
const offline_button = get_element_by_id("offline_game_button")
add_click_event_to_element(offline_button, () => instantiate_offline_game())