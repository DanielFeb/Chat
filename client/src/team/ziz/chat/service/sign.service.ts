import { Injectable }       from '@angular/core';
import { Http }    from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { User }             from '../model/user';
import { HttpUtility }      from '../service/http-utility.service';
import { GLOBAL_URL, GREET_URL }       from '../config/server-config';

@Injectable()
export class SignService {

    public currentUser: User = null;
    private afterSignOutCallBacks: (() => boolean)[] = [];

    constructor(private http: Http,
                private httpUtility: HttpUtility,
                private router: Router) {
    }

    public addAfterSignOutCallBack(callBack: () => boolean) {
        this.afterSignOutCallBacks.push(callBack);
    }

    public greet(username: string): Promise<string> {
        let url = this.httpUtility.getFullUrl(GREET_URL) + '?username=' + username;
        return this.http.get(url, this.httpUtility.requestOptionsArgs)
                .toPromise()
                .then(response => response.text())
                .catch(this.httpUtility.handleError);
    }

    public isUserLoggedIn(): boolean {
        return this.currentUser !== null;
    }

    public checkAuth() {
        if (!this.isUserLoggedIn()) {
            this.router.navigate(['/login']);
        }
    }

    public tryLogin(userid: string, password: string): Promise<boolean> {
        if (this.isUserLoggedIn()) {
            return Promise.resolve(true);
        }
        let url = this.httpUtility.getFullUrl(GLOBAL_URL);
        this.httpUtility.setAuthHeader(userid, password);
        return this.http.get(url, this.httpUtility.requestOptionsArgs)
                .toPromise()
                .then(response => {
                    this.currentUser = response.json() as User;
                    return this.isUserLoggedIn();
                })
                .catch(this.httpUtility.handleError);
    }

    public signOut(): boolean {
        let success = true;
        this.httpUtility.removeAuthHeader();
        this.currentUser = null;
        this.afterSignOutCallBacks.forEach((callBackFunc: () => boolean) => {
            success = success && callBackFunc();
        });
        return success;
    }
}
