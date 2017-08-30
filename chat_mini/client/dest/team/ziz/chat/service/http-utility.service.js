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
var server_config_1 = require("../config/server-config");
var HttpUtility = (function () {
    function HttpUtility() {
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.serverURL = server_config_1.SERVER_URL;
    }
    HttpUtility.prototype.setAuthHeader = function (userid, password) {
        this.removeAuthHeader();
        this.headers.append('Authorization', 'Basic ' + btoa(userid + ':' + password));
    };
    HttpUtility.prototype.removeAuthHeader = function () {
        this.headers.delete('Authorization');
    };
    HttpUtility.prototype.getFullUrl = function (url) {
        return this.serverURL + url;
    };
    HttpUtility.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return HttpUtility;
}());
HttpUtility = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], HttpUtility);
exports.HttpUtility = HttpUtility;
//# sourceMappingURL=http-utility.service.js.map