import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }             from './app.component';
import { MainComponent }            from './main/main.component';
import { LoginComponent }           from './login/login.component';

import { FriendService }            from './service/friend.service';
import { SignService }              from './service/sign.service';
import { ChatService }              from './service/chat.service';
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
        MainComponent,
        LoginComponent
    ],
    bootstrap:    [ AppComponent ],
    providers:    [
        FriendService,
        SignService,
        ChatService,
        HttpUtility
    ],
})
export class AppModule { }
