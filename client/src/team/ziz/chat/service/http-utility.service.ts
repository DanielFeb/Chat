import { Injectable }       from '@angular/core';

import { Headers, Http, RequestOptionsArgs }    from '@angular/http';

import { SERVER_URL }       from '../config/server-config';

@Injectable()
export class HttpUtility {
    public headers = new Headers({'Content-Type': 'application/json'});
    public serverURL = SERVER_URL;
    constructor () {
    }

    public get requestOptionsArgs (): RequestOptionsArgs {
        return {
            headers: this.headers,
            withCredentials: true
        };
    }

    public setAuthHeader(userid: string, password: string) {
        this.removeAuthHeader();
        this.headers.append('Authorization', 'Basic ' + btoa(userid + ':' + password));
    }

    public removeAuthHeader() {
        this.headers.delete('Authorization');
    }

    public getFullUrl (url: string): string {
        return this.serverURL + url;
    }

    public handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

export interface DataToPost {
    header: string;
    content: string;
}
