import {
Message,
MessageType,
WSSController
} from "./chunk-4105888b8a932930.js";

// src/server/components/login_message.ts
class LoginMessage extends Message {
  recipient_id;
  constructor(recipient_id) {
    super(MessageType.login);
    this.recipient_id = recipient_id;
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
      console.log("BAAALALLALBALABLBALA");
      console.log(is_valid_token);
      if (is_valid_token) {
        localStorage.setItem(this.jwt_token_id, token);
      }
    } catch (error) {
      console.error("Verification error:", error.message);
      throw error;
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
    console.log("Oh index, you shouldnt have!");
    if (LoginController.token) {
      return;
    }
    document.addEventListener("DOMContentLoaded", function() {
      const loginForm = document.getElementById("login_form");
      console.log("OH THE HUMANITY");
      if (!loginForm) {
        throw new Error("Login in form not found in Login Controller");
      }
      loginForm.addEventListener("submit", async function(event) {
        console.log("Hi, Mom!");
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const formData = {
          username,
          password
        };
        console.log(formData);
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
          const login_message2 = new LoginMessage("b6cd9167-479f-40f5-a24d-dc594c27963b");
          WSSController.send_message(login_message2);
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
    WSSController.open_coneection();
  }
}
customElements.define("index-element", Index);
export {
  Index as default
};
