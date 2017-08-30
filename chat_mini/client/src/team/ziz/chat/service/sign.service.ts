import { Injectable }       from '@angular/core';
import { Http }    from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User }             from '../model/user';
import { HttpUtility }      from './http-utility.service';
import { GLOBAL_URL, GREET_URL }       from '../config/server-config';

@Injectable()
export class SignService {

    public currentUser: User = null;

    constructor(private http: Http, private httpUtility: HttpUtility) {
    }

    public greet(username: string): Promise<string> {
        let url = this.httpUtility.getFullUrl(GREET_URL) + '?username=' + username;
        return this.http.get(url)
                .toPromise()
                .then(response => response.text())
                .catch(this.httpUtility.handleError);
    }

    public isUserLoggedIn(): boolean {
        return this.currentUser !== null;
    }

    public tryLogin(userid: string, password: string): Promise<boolean> {
        if (this.isUserLoggedIn()) {
            return Promise.resolve(true);
        }
        let url = this.httpUtility.getFullUrl(GLOBAL_URL);
        this.httpUtility.setAuthHeader(userid, password);
        return this.http.get(url, {headers: this.httpUtility.headers})
                .toPromise()
                .then(response => {
                    this.currentUser = response.json() as User;
                    console.log('tryLogin:', this.currentUser);
                    return this.isUserLoggedIn();
                })
                .catch(this.httpUtility.handleError);
    }

    public signOut(): boolean {
        this.httpUtility.removeAuthHeader();
        this.currentUser = null;
        return !this.isUserLoggedIn();
    }
}
