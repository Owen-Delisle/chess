import {
ClientWebSocket,
TokenAPI
} from "/components/board/board.js";

// src/server/redirects/online.ts
function redirect_to_online_page() {
  fetch("/redirect_to_online").then((response) => {
    if (response.ok) {
      window.location.href = "/";
    } else {
      console.error("Error triggering redirect:", response.statusText);
    }
  }).catch((error) => {
    console.error("Redirect Fetch Error:", error);
  });
}

// src/server/api/login_api.ts
class LoginAPI {
  static async login_with_form(username, password) {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        throw new Error("Failed to login");
      }
      const token_from_db = await TokenAPI.retrieve_token_from_db_by_username(username);
      if (!token_from_db) {
        throw new Error("Bad token from DB");
      }
      TokenAPI.add_token_to_storage(token_from_db);
      redirect_to_online_page();
    } catch (error) {
      console.error("Error:", error.message);
      alert("Thrown from Client - Failed to login on");
    }
  }
}

// src/server/controllers/login_controller.ts
class LoginController {
  static add_login_submit_listener() {
    document.addEventListener("DOMContentLoaded", function() {
      const loginForm = document.getElementById("login_form");
      if (!loginForm) {
        throw new Error("Login in form not found in Login Controller");
      }
      loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        LoginAPI.login_with_form(username, password);
      });
    });
  }
}

// src/index.ts
LoginController.add_login_submit_listener();
ClientWebSocket.open_connection();
