import { Component, OnInit }    from '@angular/core';

import { User }                 from '../model/user';
import { FriendService }          from '../service/friend-list.service';

@Component({
    selector: 'my-friends',
    styleUrls: [ './friends.component.css' ],
    templateUrl: './friends.component.html'
})
export class FriendsComponent implements OnInit {

    public friends: User[] = [];

    public selectedFriend: User;

    constructor (private friendService: FriendService) {
    }

    ngOnInit(): void {
        this.friendService.getFriends()
            .then(friends => this.friends = friends );
    }

    onSelect(friend: User): void {
        this.selectedFriend = friend;
    }
}
