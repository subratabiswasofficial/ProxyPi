// import NodeRSA from 'node-rsa';
// const key = new NodeRSA({});

// const text = 'Hello RSA!';
// const encrypted = key.encrypt(text, 'base64');
// console.log('encrypted: ', encrypted);
// const decrypted = key.decrypt(encrypted, 'utf8');
// console.log('decrypted: ', decrypted);

import { Transform } from 'stream';

const encryptProcess = new Transform({
    transform(chunk, encoding, callback) {
        // console.log('[Chunk to String]',chunk.toString());
        callback(null, '[]' + chunk.toString());
    }
});

encryptProcess.pipe(encryptProcess);

encryptProcess.on('data', (chunk) => {
    console.log(chunk.toString());
});

setInterval(() => {
    encryptProcess.write('hello');
}, 2000)