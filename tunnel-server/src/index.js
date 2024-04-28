import net from 'node:net';
import 'dotenv/config';

const server = net.createServer();

server.on('connection', async (clientSocket) => {
    console.log('New local connection created with client');
    clientSocket.on('end', () => {
        console.log('New local connection ended with client');
    });
});

server.listen(process.env.TUNNEL_PORT, () => {
    console.log('TUNNEL SERVER RUNNING ON PORT', process.env.TUNNEL_PORT);
});