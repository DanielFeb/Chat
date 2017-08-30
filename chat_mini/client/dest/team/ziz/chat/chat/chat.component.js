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
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var user_1 = require("../model/user");
var friend_list_service_1 = require("../service/friend-list.service");
var persistent_connection_service_1 = require("../service/persistent-connection.service");
var server_config_1 = require("../config/server-config");
var ChatComponent = (function () {
    function ChatComponent(friendService, router, route, location) {
        this.friendService = friendService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.messageHistory = '';
        this.inputMessage = '';
        this.chatConnection = null;
        this.chatConnection = new persistent_connection_service_1.PersistentConnection(server_config_1.CHAT_SOCKET_URL, this.onConnectionClose, this.onMessageRecieved, this.onConnectionClose);
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) { return _this.friendService.getFriend(+params.get('userID')); })
            .subscribe(function (friend) { return _this.friend = friend; });
    };
    ChatComponent.prototype.showFriendDetail = function () {
        this.router.navigate(['/friend-detail', this.friend.userID]);
    };
    ChatComponent.prototype.onConnectionOpen = function () {
    };
    ChatComponent.prototype.onConnectionClose = function () {
    };
    ChatComponent.prototype.onMessageRecieved = function (event) {
        console.log('Chat ts recieved messagez:', event);
    };
    ChatComponent.prototype.sendMessage = function () {
        if (this.inputMessage !== '') {
            this.chatConnection.sendMessage(this.inputMessage);
            this.inputMessage = '';
        }
    };
    return ChatComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", user_1.User)
], ChatComponent.prototype, "friend", void 0);
ChatComponent = __decorate([
    core_1.Component({
        selector: 'chat',
        templateUrl: './chat.component.html',
        styleUrls: ['./chat.component.css']
    }),
    __metadata("design:paramtypes", [friend_list_service_1.FriendService,
        router_1.Router,
        router_1.ActivatedRoute,
        common_1.Location])
], ChatComponent);
exports.ChatComponent = ChatComponent;
;
//# sourceMappingURL=chat.component.js.map