import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }         from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location }                         from '@angular/common';

import { User }                             from '../model/user';
import { FriendService }                    from '../service/friend-list.service';
import { PersistentConnection }             from '../service/persistent-connection.service';
import { CHAT_SOCKET_URL }                  from '../config/server-config';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: [ './chat.component.css' ]
})
export class ChatComponent implements OnInit {
    @Input()
    public friend: User;

    public messageHistory: string = '';

    public inputMessage: string = '';

    private chatConnection: PersistentConnection = null;

    constructor(
        private friendService: FriendService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) {
        this.chatConnection = new PersistentConnection (CHAT_SOCKET_URL,
                                                        this.onConnectionClose,
                                                        this.onMessageRecieved,
                                                        this.onConnectionClose);
    }

    public ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.friendService.getFriend(+params.get('userID')))
            .subscribe(friend => this.friend = friend);
    }

    public showFriendDetail() {
        this.router.navigate(['/friend-detail', this.friend.userID]);
    }

    public onConnectionOpen () {
    }

    public onConnectionClose () {
    }

    public onMessageRecieved (event: any) {
        console.log('Chat ts recieved messagez:', event);
    }

    public sendMessage() {
        if ( this.inputMessage !== '' ) {
            this.chatConnection.sendMessage(this.inputMessage);
            this.inputMessage = '';
        }
    }
};
