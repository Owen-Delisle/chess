import TestView from './tests/test_view'
import LoginController from './server/controllers/login_controller'
import ClientWebSocket from './server/client_websocket'


LoginController.add_login_submit_listener()
ClientWebSocket.open_connection()

