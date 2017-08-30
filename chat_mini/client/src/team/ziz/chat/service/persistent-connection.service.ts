import { Injectable }                       from '@angular/core';

import { SERVER_URL }                       from '../config/server-config';

import * as SockJS from 'sockjs-client';

@Injectable()
export class PersistentConnection {
    private websocket: WebSocket;
    private socketjs: any;
    constructor(socketURL: string,
                onConnectionOpen: () => void,
                onMessageRecieved: (event: any) => void,
                onConnectionClose: () => void) {
        //this.socketjs = new SockJS('ws://localhost:7777/' + socketURL);
        this.websocket = new WebSocket('ws://localhost:7777/portfolio');
        this.websocket.onopen = function (event: Event) {
            console.log('Info: connection opened.');
            onConnectionOpen();
        };

        this.websocket.onmessage = function (event: MessageEvent) {
            console.log('Received: ' + event.data);
            onMessageRecieved(event);
        };

        this.websocket.onclose = function (event: CloseEvent) {
            console.log('Info: connection closed.', event);
            onConnectionClose();
        };
    }

    public isConnected () {
        return this.websocket.OPEN;
    }

    public sendMessage (data: any) {
        this.websocket.send(data);
    }

}
