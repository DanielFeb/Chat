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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var http_utility_service_1 = require("./http-utility.service");
var server_config_1 = require("../config/server-config");
var FriendService = (function () {
    function FriendService(http, httpUtility) {
        this.http = http;
        this.httpUtility = httpUtility;
        this.friendList = null;
    }
    FriendService.prototype.getFriends = function () {
        if (this.friendList !== null) {
            return Promise.resolve(this.friendList);
        }
        else {
            return this.getFiendsFromServer();
        }
    };
    FriendService.prototype.getFriend = function (id) {
        return this.getFriends()
            .then(function (friendList) {
            var tmpFriend = null;
            friendList.forEach(function (friend, index, array) {
                if (friend.userID === id) {
                    tmpFriend = friend;
                }
            });
            return tmpFriend;
        });
    };
    FriendService.prototype.update = function (friend) {
        this.friendList.forEach(function (tmpFriend, index, array) {
            if (tmpFriend.userID === friend.userID) {
                array[index] = friend;
            }
        });
        return Promise.resolve(friend);
    };
    FriendService.prototype.getFiendsFromServer = function () {
        var _this = this;
        var url = this.httpUtility.getFullUrl(server_config_1.FRIEND_LIST_URL);
        return this.http.get(url, { headers: this.httpUtility.headers })
            .toPromise()
            .then(function (response) {
            _this.friendList = response.json();
            console.log('getFriendList:', _this.friendList);
            return _this.friendList;
        })
            .catch(this.httpUtility.handleError);
    };
    return FriendService;
}());
FriendService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, http_utility_service_1.HttpUtility])
], FriendService);
exports.FriendService = FriendService;
//# sourceMappingURL=friend-list.service.js.map