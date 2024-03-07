import {
ClientWebSocket,
TokenController
} from "/components/board/board.js";

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
        const form_data = {
          username,
          password
        };
        try {
          const response = await fetch("/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(form_data)
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
LoginController.add_login_submit_listener();
ClientWebSocket.open_connection();
