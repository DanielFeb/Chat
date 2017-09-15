import { Injectable }   from '@angular/core';
import { Http }         from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HttpUtility }      from '../service/http-utility.service';
import { User }             from '../model/user';
import { FRIEND_LIST_URL }  from '../config/server-config';
import { SignService }                                      from '../service/sign.service';

@Injectable()
export class FriendService {

    private friendsPromise: Promise<User[]> = null;

    constructor(private http: Http,
                private httpUtility: HttpUtility,
                private signService: SignService) {

        this.signService.addAfterSignOutCallBack(this.clean.bind(this));
    }

    public getFriends(): Promise<User[]> {
        if (this.friendsPromise !== null) {
            return this.friendsPromise;
        } else {
            this.getFiendsFromServer()
            return this.friendsPromise;
        }
    }

    public getFriend(friendId: number): Promise<User> {
        return this.getFriends()
            .then( friends => {
                let tmpFriend: User = null;
                friends.forEach( (friend: User, index: number, array: User[]) => {
                    if (friend.userID === friendId) {
                        tmpFriend = friend;
                    }
                });
                return tmpFriend;
            });
    }

    public update(friend: User): Promise<User> {

        this.friendsPromise.then(
            friends => {
                friends.forEach( (tmpFriend: User, index: number, array: User[]) => {
                    if (tmpFriend.userID === friend.userID) {
                        array[index] = friend;
                    }
                });
            }
        );
        return Promise.resolve(friend);
    }

    private getFiendsFromServer(): void {
        let url = this.httpUtility.getFullUrl(FRIEND_LIST_URL);
        this.friendsPromise = this.http.get(url, this.httpUtility.requestOptionsArgs)
                .toPromise()
                .then(response => {
                    let friends = response.json() as User[];
                    console.log('getfriends:', friends);
                    return friends;
                })
                .catch(this.httpUtility.handleError);
    }

    public clean(): boolean {
        this.friendsPromise = null;
        return true;
    }
}

