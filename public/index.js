import {
ClientWebSocket,
LoginController
} from "/components/board/board.js";

// src/index.ts
LoginController.add_login_submit_listener();
ClientWebSocket.open_connection();
