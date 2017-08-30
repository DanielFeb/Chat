import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }             from './app.component';
import { FriendsComponent }         from './friend-list/friends.component';
import { FriendDetailComponent }    from './friend-detail/friend-detail.component';
import { ChatComponent }            from './chat/chat.component';
import { LoginComponent }           from './login/login.component';

import { FriendService }            from './service/friend-list.service';
import { SignService }              from './service/sign.service';
import { PersistentConnection }     from './service/persistent-connection.service';
import { HttpUtility }              from './service/http-utility.service';

@NgModule({
    imports:      [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        ChatComponent,
        FriendsComponent,
        FriendDetailComponent,
        LoginComponent
    ],
    bootstrap:    [ AppComponent ],
    providers:    [
        FriendService,
        SignService,
        PersistentConnection,
        HttpUtility
    ],
})
export class AppModule { }
