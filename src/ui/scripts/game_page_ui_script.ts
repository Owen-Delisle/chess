import { add_click_event_to_element, get_element_by_id } from "../utils/funcs";
import { instantiate_offline_game, instantiate_placeholder_board, resign, offer_draw, logout } from "../board/board_dom_controller";

const offline_button = get_element_by_id("offline_game_button")
const online_button = get_element_by_id("online_game_button")
const resign_button = get_element_by_id("resign_button")
const draw_button = get_element_by_id("draw_button")
const logout_button = get_element_by_id("logout_button")

add_click_event_to_element(offline_button, () => instantiate_offline_game())
add_click_event_to_element(online_button, () => instantiate_placeholder_board())
add_click_event_to_element(resign_button, () => resign())
add_click_event_to_element(draw_button, () => offer_draw())
add_click_event_to_element(logout_button, () => logout())

instantiate_offline_game()