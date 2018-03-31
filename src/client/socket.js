import socketIOClient from "socket.io-client";

export default class Socket {
    static onDefaultConnect() {
        console.log('connected');
    }

    static onDefaultDisconnect() {
        console.log('disconnected');
    }

    static onDefaultEvent(event) {
        console.log(event);
    }

    constructor(onConnect = Socket.onDefaultConnect, onDisconnect = Socket.onDefaultDisconnect()) {
        this.io = socketIOClient('http://0.0.0.0:8000');
        this.io.on('connect', () => onConnect);
        this.io.on('disconnect', () => onDisconnect);
    }

    on(event, onEvent = Socket.onDefaultEvent(event)) {
        this.io.on(event, onEvent);
    }
}
