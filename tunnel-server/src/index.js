import net from 'node:net';
import 'dotenv/config';

const server = net.createServer();

server.on('connection', async (clientToLocalSocket) => {
    console.log('New local connection created');

    const localToProxySocket = net.createConnection({
        host: 'localhost',
        port: 8080
    });

    clientToLocalSocket.pipe(localToProxySocket);
    localToProxySocket.pipe(clientToLocalSocket);
});

server.listen(process.env.TUNNEL_PORT, () => {
    console.log('LOCAL SERVER RUNNING ON PORT', process.env.TUNNEL_PORT);
});