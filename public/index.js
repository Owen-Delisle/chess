// src/server/messages/message.ts
class Message {
  message_type;
  constructor(message_type) {
    this.message_type = message_type;
  }
}
var MessageType;
(function(MessageType2) {
  MessageType2[MessageType2["login"] = 0] = "login";
  MessageType2[MessageType2["move"] = 1] = "move";
  MessageType2[MessageType2["logout"] = 2] = "logout";
  MessageType2[MessageType2["active_users"] = 3] = "active_users";
  MessageType2[MessageType2["game_request"] = 4] = "game_request";
  MessageType2[MessageType2["game_accepted"] = 5] = "game_accepted";
})(MessageType || (MessageType = {}));

// src/server/messages/game_request_message.ts
class GameRequestMessage extends Message {
  recipient_id;
  constructor(recipient_id) {
    super(MessageType.game_request);
    this.recipient_id = recipient_id;
  }
}

// src/server/messages/game_accepted_message.ts
class GameAcceptedMessage extends Message {
  sender;
  receiver;
  constructor(sender, receiver) {
    super(MessageType.game_accepted);
    this.receiver = receiver;
    this.sender = sender;
  }
}

// src/components/square/color.ts
var BlackOrWhite;
(function(BlackOrWhite2) {
  BlackOrWhite2["black"] = "black";
  BlackOrWhite2["white"] = "white";
})(BlackOrWhite || (BlackOrWhite = {}));

// src/server/client_websocket.ts
class ClientWebSocket {
  static token = localStorage.getItem("jwtToken");
  static web_socket = new WebSocket(`ws://localhost:3000?token=${this.token}`);
  static open_connection() {
    ClientWebSocket.web_socket.addEventListener("open", function(event) {
      console.log("Client WebSocket connection established");
      document.getElementById("moves_list").addEventListener("child_added", function(event2) {
        console.log("WERE MOVING");
        ClientWebSocket.send_last_move_to_server();
      });
    });
    ClientWebSocket.web_socket.addEventListener("message", function(event) {
      console.log("Event from WSS:", event.data);
      const message4 = JSON.parse(event.data);
      const message_type = message4.type;
      switch (message_type) {
        case MessageType.active_users.toString():
          const active_users = message4.users;
          ClientWebSocket.update_active_users_list_ui(active_users);
          break;
        case MessageType.game_request.toString():
          console.log("CLIENT RECEIVED BATTLE REQUEST");
          ClientWebSocket.update_request_list_ui(message4.requesting_user, message4.recieving_user);
          break;
        case MessageType.game_accepted.toString():
          ClientWebSocket.update_current_game_ui(message4.accepting_user, BlackOrWhite.black);
          break;
        case MessageType.move.toString():
          console.log("CLIENT RECEIVED MOVE");
          break;
      }
    });
  }
  static send_message_to_server(message4) {
    console.log("CLIENT SENDING MESSAGE");
    console.log(message4);
    const message_to_send = JSON.stringify(message4);
    ClientWebSocket.web_socket.send(message_to_send);
  }
  static update_active_users_list_ui(active_users_id) {
    const user_list_element = document.getElementById("user_list");
    if (!user_list_element) {
      throw new Error("USERS LIST ELEMENT NOT FOUND");
    }
    user_list_element.innerHTML = "";
    active_users_id.forEach((user_id) => {
      const list_item = document.createElement("li");
      const typed_user_id = user_id;
      list_item.textContent = typed_user_id;
      list_item.addEventListener("click", function() {
        ClientWebSocket.send_message_to_server(new GameRequestMessage(typed_user_id));
      });
      user_list_element.appendChild(list_item);
    });
  }
  static update_request_list_ui(user_id_of_requester, this_client_user_id) {
    const game_request_list_element = document.getElementById("game_request_list");
    if (!game_request_list_element) {
      throw new Error("GAME REQUEST ELEMENT LIST NOT FOUND");
    }
    game_request_list_element.innerHTML = "";
    const list_item = document.createElement("li");
    list_item.textContent = user_id_of_requester;
    list_item.addEventListener("click", function() {
      ClientWebSocket.send_message_to_server(new GameAcceptedMessage(this_client_user_id, user_id_of_requester));
      ClientWebSocket.update_current_game_ui(user_id_of_requester, BlackOrWhite.white);
    });
    game_request_list_element.appendChild(list_item);
  }
  static update_current_game_ui(user_id_of_opponent, color2) {
    const current_game_element = document.getElementById("current_game");
    if (!current_game_element) {
      throw new Error("CURRENT GAME ELEMENT NOT FOUND");
    }
    const oponent_id_item = document.createElement("p");
    oponent_id_item.textContent = user_id_of_opponent;
    current_game_element.appendChild(oponent_id_item);
    const board_container_element = document.getElementById("board_element_container");
    if (!board_container_element) {
      throw new Error("BOARD CONTAINER ELEMENT NOT FOUND");
    }
    if (!board_container_element.firstChild) {
      throw new Error("Board Container should not be empty");
    }
    const body = document.getElementById("body");
    body.removeChild(board_container_element);
    const new_container = document.createElement("div");
    body.appendChild(new_container);
    new_container.id = "shit-cock-balls";
    new_container.innerHTML = `<board-element game_type="online" player_color="${color2}" opponent_user_id="${user_id_of_opponent}"></board-element>`;
  }
  static move_piece_with_server_move(move) {
  }
  static send_last_move_to_server() {
    const move_message = new GameRequestMessage("482f8176-e673-4d80-9941-254399f0a400");
    ClientWebSocket.send_message_to_server(move_message);
  }
}

// src/server/controllers/token_controller.ts
class TokenController {
  static jwt_token_id = "jwtToken";
  static async retrieve_token_from_storage() {
    const token = localStorage.getItem(this.jwt_token_id);
    return token;
  }
  static async add_token_to_storage(token) {
    try {
      const is_valid_token = await TokenController.verify_jwt_token(token);
      if (is_valid_token) {
        localStorage.setItem(this.jwt_token_id, token);
      }
    } catch (error) {
      console.error("Verification error:", error.message);
      throw error;
    }
  }
  static async userID_from_token(token) {
    try {
      const response = await fetch("/userID_from_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        return data.userId;
      } else {
        throw new Error("Failed to fetch");
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  static async verify_jwt_token(token) {
    try {
      const response = await fetch("/verify_jwt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        return data.success === true;
      } else {
        throw new Error("Failed to fetch");
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  }
}

// src/server/controllers/login_controller.ts
class LoginController {
  static token = localStorage.getItem("jwtToken");
  static add_login_submit_listener() {
    if (LoginController.token) {
      return;
    }
    document.addEventListener("DOMContentLoaded", function() {
      const loginForm = document.getElementById("login_form");
      if (!loginForm) {
        throw new Error("Login in form not found in Login Controller");
      }
      loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const formData = {
          username,
          password
        };
        try {
          const response = await fetch("/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          });
          if (!response.ok) {
            throw new Error("Failed to login");
          }
          const { token } = await response.json();
          TokenController.add_token_to_storage(token);
        } catch (error) {
          console.error("Error:", error.message);
          alert("Thrown from Client - Failed to login on");
        }
      });
    });
  }
}

// src/index.ts
class Index extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    LoginController.add_login_submit_listener();
    this.render();
  }
  render() {
    ClientWebSocket.open_connection();
  }
}
customElements.define("index-element", Index);
export {
  Index as default
};
