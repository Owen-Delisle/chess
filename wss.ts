import { Server } from 'ws';
import http from 'http';
import { http_server, PORT } from './http_server.ts';

const server = http.createServer(http_server)

const wss = new Server({ server })

const clients: Set<WebSocket> = new Set()
const active_users: Set<WebSocket> = new Set()

wss.on('connection', function connection(ws) {
    console.log('Client connected');

    const client_connection: WebSocket = ws as WebSocket
    clients.add(client_connection)

    // Handle messages from clients
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        for(const client of clients) {
            client.send(`Message From WSS: ${message.toString()}`)
        }

        const data = JSON.parse(message.toString())

        if(data.message_type === 0) {
            active_users.add(data.recipient_id)
        }

        active_users.forEach(user => {
            console.log(user)
        })
    });

    client_connection.on('close', function() {
        clients.delete(client_connection)
    })
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default wss