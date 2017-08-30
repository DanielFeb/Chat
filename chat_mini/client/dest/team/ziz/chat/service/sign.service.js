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
var SignService = (function () {
    function SignService(http, httpUtility) {
        this.http = http;
        this.httpUtility = httpUtility;
        this.currentUser = null;
    }
    SignService.prototype.greet = function (username) {
        var url = this.httpUtility.getFullUrl(server_config_1.GREET_URL) + '?username=' + username;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.text(); })
            .catch(this.httpUtility.handleError);
    };
    SignService.prototype.isUserLoggedIn = function () {
        return this.currentUser !== null;
    };
    SignService.prototype.tryLogin = function (userid, password) {
        var _this = this;
        if (this.isUserLoggedIn()) {
            return Promise.resolve(true);
        }
        var url = this.httpUtility.getFullUrl(server_config_1.GLOBAL_URL);
        this.httpUtility.setAuthHeader(userid, password);
        return this.http.get(url, { headers: this.httpUtility.headers })
            .toPromise()
            .then(function (response) {
            _this.currentUser = response.json();
            console.log('tryLogin:', _this.currentUser);
            return _this.isUserLoggedIn();
        })
            .catch(this.httpUtility.handleError);
    };
    SignService.prototype.signOut = function () {
        this.httpUtility.removeAuthHeader();
        this.currentUser = null;
        return !this.isUserLoggedIn();
    };
    return SignService;
}());
SignService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, http_utility_service_1.HttpUtility])
], SignService);
exports.SignService = SignService;
//# sourceMappingURL=sign.service.js.map