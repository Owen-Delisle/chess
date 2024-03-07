
const token = localStorage.getItem('jwtToken')

if(!token) {
    throw new Error('Token Invalid')
}

const web_socket: WebSocket = new WebSocket(`ws://localhost:3000?token=${token}`)
export default web_socket