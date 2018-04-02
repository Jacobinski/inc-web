import {DEV_SOCKET_BASE, PROD_SOCKET_BASE} from "../client/constants.js";
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

    constructor(onConnect = Socket.onDefaultConnect, onDisconnect = Socket.onDefaultDisconnect) {
        this.io = socketIOClient(PROD_SOCKET_BASE);
        this.io.on('connect', onConnect);
        this.io.on('disconnect', onDisconnect);
    }

    on(event, onEvent = Socket.onDefaultEvent(event)) {
        this.io.on(event, onEvent);
    }

    close() {
        this.io.close();
    }
}
