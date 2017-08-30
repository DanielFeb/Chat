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
var FriendDetailComponent = (function () {
    function FriendDetailComponent(friendService, route, location) {
        this.friendService = friendService;
        this.route = route;
        this.location = location;
    }
    FriendDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) { return _this.friendService.getFriend(+params.get('id')); })
            .subscribe(function (friend) { return _this.friend = friend; });
    };
    FriendDetailComponent.prototype.save = function () {
        var _this = this;
        this.friendService.update(this.friend)
            .then(function () { return _this.goBack(); });
    };
    FriendDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    return FriendDetailComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", user_1.User)
], FriendDetailComponent.prototype, "friend", void 0);
FriendDetailComponent = __decorate([
    core_1.Component({
        selector: 'friend-detail',
        templateUrl: './friend-detail.component.html',
        styleUrls: ['./friend-detail.component.css']
    }),
    __metadata("design:paramtypes", [friend_list_service_1.FriendService,
        router_1.ActivatedRoute,
        common_1.Location])
], FriendDetailComponent);
exports.FriendDetailComponent = FriendDetailComponent;
;
//# sourceMappingURL=friend-detail.component.js.map