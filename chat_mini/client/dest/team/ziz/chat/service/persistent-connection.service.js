"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var PersistentConnection = (function () {
    function PersistentConnection(socketURL, onConnectionOpen, onMessageRecieved, onConnectionClose) {
        //this.socketjs = new SockJS('ws://localhost:7777/' + socketURL);
        this.websocket = new WebSocket('ws://localhost:7777/portfolio');
        this.websocket.onopen = function (event) {
            console.log('Info: connection opened.');
            onConnectionOpen();
        };
        this.websocket.onmessage = function (event) {
            console.log('Received: ' + event.data);
            onMessageRecieved(event);
        };
        this.websocket.onclose = function (event) {
            console.log('Info: connection closed.', event);
            onConnectionClose();
        };
    }
    PersistentConnection.prototype.isConnected = function () {
        return this.websocket.OPEN;
    };
    PersistentConnection.prototype.sendMessage = function (data) {
        this.websocket.send(data);
    };
    return PersistentConnection;
}());
PersistentConnection = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [String, Function, Function, Function])
], PersistentConnection);
exports.PersistentConnection = PersistentConnection;
//# sourceMappingURL=persistent-connection.service.js.map