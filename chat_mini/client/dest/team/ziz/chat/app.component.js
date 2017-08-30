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
var router_1 = require("@angular/router");
var sign_service_1 = require("./service/sign.service");
var AppComponent = (function () {
    function AppComponent(signService, router) {
        this.signService = signService;
        this.router = router;
        this.title = 'Welcome to Mini Chat!';
    }
    Object.defineProperty(AppComponent.prototype, "isShowGreet", {
        get: function () {
            return this.signService.isUserLoggedIn();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "isShowLogin", {
        get: function () {
            return !this.signService.isUserLoggedIn();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "isShowSignout", {
        get: function () {
            return this.signService.isUserLoggedIn();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "greet", {
        get: function () {
            return 'Hello ' + this.signService.currentUser.nickname;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.signout = function () {
        this.signService.signOut();
        this.router.navigate(['/login']);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        styles: [],
        selector: 'my-app',
        template: "\n    <h1>{{title}}</h1>\n    <nav>\n        <div *ngIf=\"isShowGreet\"> {{greet}} </div>\n        <div *ngIf=\"isShowLogin\"> <a routerLink=\"/login\" routerLinkActive=\"active\">login</a> </div>\n        <div *ngIf=\"isShowSignout\"> <a (click)=\"signout()\" >signout</a> </div>\n    </nav>\n    <router-outlet></router-outlet>\n    ",
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [sign_service_1.SignService,
        router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map