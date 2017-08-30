import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FriendsComponent }         from './friend-list/friends.component';
import { FriendDetailComponent }    from './friend-detail/friend-detail.component';
import { LoginComponent }            from './login/login.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'friend-detail/:id', component: FriendDetailComponent },
    { path: 'friends',  component: FriendsComponent },
    { path: 'login',  component: LoginComponent }
];

@NgModule ({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {};
