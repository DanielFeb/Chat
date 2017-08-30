import { Component }        from '@angular/core';
import { Router }           from '@angular/router';

import { SignService } from './service/sign.service';

@Component({

    styles: [],
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <nav>
        <div *ngIf="isShowGreet"> {{greet}} </div>
        <div *ngIf="isShowLogin"> <a routerLink="/login" routerLinkActive="active">login</a> </div>
        <div *ngIf="isShowSignout"> <a (click)="signout()" >signout</a> </div>
    </nav>
    <router-outlet></router-outlet>
    `,
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    public title = 'Welcome to Mini Chat!';

    public get isShowGreet() {
        return this.signService.isUserLoggedIn();
    }

    public get isShowLogin() {
        return !this.signService.isUserLoggedIn();
    }

    public get isShowSignout() {
        return this.signService.isUserLoggedIn();
    }

    public get greet(){
        return 'Hello ' + this.signService.currentUser.nickname;
    }

    public signout() {
        this.signService.signOut();
        this.router.navigate(['/login']);
    }

    constructor ( private signService: SignService,
                  private router: Router) {

    }
}

