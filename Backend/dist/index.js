"use strict";
// create a simple websocket server
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 }, () => {
    console.log("web socket server start on 8080");
});
let senderSocket = null;
let recieverSocket = null;
wss.on("connection", (ws) => {
    ws.on('error', console.error);
    ws.on('message', function message(data) {
        const message = JSON.parse(data);
        if (message.type === 'sender') {
            console.log('sender connected');
            senderSocket = ws;
        }
        else if (message.type === 'receiver') {
            console.log('reciever connected');
            recieverSocket = ws;
        }
        else if (message.type === 'createOffer') {
            if (ws != senderSocket) {
                return;
            }
            recieverSocket === null || recieverSocket === void 0 ? void 0 : recieverSocket.send(JSON.stringify({ type: 'createOffer', sdp: message.sdp }));
        }
        else if (message.type === 'createAnswer') {
            if (ws != recieverSocket) {
                return;
            }
            senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: 'createAnswer', sdp: message.sdp }));
        }
        else if (message.type === 'iceCandidate') {
            if (ws === senderSocket) {
                recieverSocket === null || recieverSocket === void 0 ? void 0 : recieverSocket.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
            }
            else if (ws == recieverSocket) {
                senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
            }
        }
    });
    ws.send('something');
});
