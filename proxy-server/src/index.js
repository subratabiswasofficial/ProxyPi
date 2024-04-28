// Import of net module
import { createServer, createConnection } from "net";
import 'dotenv/config';

const server = createServer();

server.on("connection", (localToProxySocket) => {

    localToProxySocket.once("data", (data) => {
        let isTLSConnection = data.toString().indexOf("CONNECT") !== -1;

        let serverPort = 80;
        let serverAddress;

        if (isTLSConnection) {
            serverPort = 443;
            serverAddress = data
                .toString()
                .split("CONNECT")[1]
                .split(" ")[1]
                .split(":")[0];
        } else {
            serverAddress = data.toString().split("Host: ")[1].split("\r\n")[0];
        }


        let proxyToServerSocket = createConnection(
            {
                host: serverAddress,
                port: serverPort,
            }
        );

        if (isTLSConnection) {
            localToProxySocket.write("HTTP/1.1 200 OK\r\n\r\n");
        } else {
            proxyToServerSocket.write(data);
        }

        localToProxySocket.pipe(proxyToServerSocket);
        proxyToServerSocket.pipe(localToProxySocket);
    });
});

server.listen(process.env.PROXY_PORT,
    () => {
        console.log('PROXY SERVER RUNNING ON PORT', process.env.PROXY_PORT);
    }
);
