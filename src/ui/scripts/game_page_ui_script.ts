import { add_click_event_to_element, get_element_by_id } from "../utils/funcs";
import { instantiate_offline_game, instantiate_placeholder_board, resign, logout } from "../board/board_dom_controller";

const offline_button = get_element_by_id("offline_game_button")
const online_button = get_element_by_id("online_game_button")
const resign_button = get_element_by_id("resign_button")
const logout_button = get_element_by_id("logout_button")

add_click_event_to_element(offline_button, () => window.location.reload())
add_click_event_to_element(online_button, () => instantiate_placeholder_board())
add_click_event_to_element(resign_button, () => resign())
add_click_event_to_element(logout_button, () => logout())

instantiate_offline_game()