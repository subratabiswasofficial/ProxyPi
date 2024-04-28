import net from 'node:net';
import NodeRSA from 'node-rsa';
import { Transform } from 'stream';
import 'dotenv/config';

const key = new NodeRSA({ b: 512 });
const server = net.createServer();
const proxy_port = 8081;

const encryptProcess = new Transform({
    transform(chunk, encoding, callback) {
        console.log('[Chunk to String]',chunk.toString());
        callback(null, chunk);
    }
});

server.on('connection', async (clientToLocalSocket) => {
    console.log('New local connection created');

    const localToProxySocket = net.createConnection({
        host: 'localhost',
        port: 8080
    });
    
    clientToLocalSocket.pipe(localToProxySocket);
    localToProxySocket.pipe(clientToLocalSocket);
});

server.listen(proxy_port, () => {
    console.log('LOCAL SERVER RUNNING ON PORT', proxy_port);
});
