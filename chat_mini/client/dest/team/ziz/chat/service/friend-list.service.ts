import { Injectable }   from '@angular/core';
import { Http }         from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HttpUtility }      from './http-utility.service';
import { User }             from '../model/user';
import { FRIEND_LIST_URL }  from '../config/server-config';

@Injectable()
export class FriendService {

    private friendList: User[] = null;

    constructor(private http: Http, private httpUtility: HttpUtility) {
    }

    public getFriends(): Promise<User[]> {
        if (this.friendList !== null) {
            return Promise.resolve(this.friendList);

        } else {
            return this.getFiendsFromServer();
        }
    }

    public getFriend(id: number): Promise<User> {
        return this.getFriends()
            .then( friendList => {
                let tmpFriend: User = null;
                friendList.forEach( (friend: User, index: number, array: User[]) => {
                    if (friend.userID === id) {
                        tmpFriend = friend;
                    }
                });
                return tmpFriend;
            });
    }

    public update(friend: User): Promise<User> {

        this.friendList.forEach( (tmpFriend: User, index: number, array: User[]) => {
            if (tmpFriend.userID === friend.userID) {
                array[index] = friend;
            }
        });
        return Promise.resolve(friend);
    }

    private getFiendsFromServer(): Promise<User[]> {

        let url = this.httpUtility.getFullUrl(FRIEND_LIST_URL);
        return this.http.get(url, {headers: this.httpUtility.headers})
                .toPromise()
                .then(response => {
                    this.friendList = response.json() as User[];
                    console.log('getFriendList:', this.friendList);
                    return this.friendList;
                })
                .catch(this.httpUtility.handleError);
    }
}

