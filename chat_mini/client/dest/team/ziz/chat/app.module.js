"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var friends_component_1 = require("./friend-list/friends.component");
var friend_detail_component_1 = require("./friend-detail/friend-detail.component");
var chat_component_1 = require("./chat/chat.component");
var login_component_1 = require("./login/login.component");
var friend_list_service_1 = require("./service/friend-list.service");
var sign_service_1 = require("./service/sign.service");
var persistent_connection_service_1 = require("./service/persistent-connection.service");
var http_utility_service_1 = require("./service/http-utility.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            app_routing_module_1.AppRoutingModule,
            http_1.HttpModule
        ],
        declarations: [
            app_component_1.AppComponent,
            chat_component_1.ChatComponent,
            friends_component_1.FriendsComponent,
            friend_detail_component_1.FriendDetailComponent,
            login_component_1.LoginComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [
            friend_list_service_1.FriendService,
            sign_service_1.SignService,
            persistent_connection_service_1.PersistentConnection,
            http_utility_service_1.HttpUtility
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map