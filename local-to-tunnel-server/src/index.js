import net, { Socket } from 'node:net';
import 'dotenv/config';

// const localToCloudTunnelConnection = net.createConnection({
//     host: 'localhost',
//     port: process.env.TUNNEL_PORT
// });

// localToCloudTunnelConnection.on('connect', async (localToCloudTunnelSocket) => {
//     console.log('New connection created with cloud tunnel');
// });

// const localServerToLocalSocket = net.createConnection({
//     host: 'localhost',
//     port: process.env.TUNNEL_PORT
// });

const cloudServer = new Socket();
const cloudSocket = cloudServer.connect({
    host: '127.0.0.1',
    port: 8799
});

cloudSocket.on('connect', () => {
    console.log('Socket connected with server');
});