import {
WSSController
} from "./chunk-3f9b25b69bf8ad8f.js";

// src/server/controllers/login_controller.ts
class LoginController {
  static token = localStorage.getItem("jwtToken");
  static add_login_submit_listener() {
    console.log("Oh index, you shouldnt have!");
    if (LoginController.token) {
      window.location.href = "/dashboard";
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
          const poo = {
            type: "login",
            userID: "b6cd9167-479f-40f5-a24d-dc594c27963b"
          };
          localStorage.setItem("jwtToken", token);
          window.location.href = "/dashboard";
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
