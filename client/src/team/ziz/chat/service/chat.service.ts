import { Injectable }                       from '@angular/core';

import { SERVER_URL, CHAT_SOCKET_URL }                      from '../config/server-config';
import { Message }                                          from '../model/message';
import { User }                                             from '../model/user';
import { FriendMessageStack }                               from '../model/friend-message-stack';
import { SignService }                                      from '../service/sign.service';
import { FriendService }                                    from '../service/friend.service';

import * as SockJS from 'sockjs-client';

@Injectable()
export class ChatService {
    private websocket: any;
    private friendMessageStacks: FriendMessageStack[];
    private isConnected = false;

    constructor(private signService: SignService,
                private friendService: FriendService) {
        this.signService.addAfterSignOutCallBack(this.stop.bind(this));
    }

    public start(
        onOpenFunc: (stacks: FriendMessageStack[]) => void,
        onMessageFunc: (message: Message) => void,
        onCloseFunc: (event: CloseEvent) => void
    ) {
        if (this.isConnected) {
            console.warn('Websocket has been connected!');
            return;
        }
        this.friendService.getFriends().then(
            friends => {
                // initial messageStacks
                this.friendMessageStacks = [];
                for (let friend of friends) {
                    this.addEmptyFriendMessageStack(friend);
                }

                // setup websocket
                this.websocket = new SockJS(SERVER_URL + CHAT_SOCKET_URL);
                this.websocket.onopen = (event: Event) => {
                    console.log('Info: connection opened.');
                    onOpenFunc(this.friendMessageStacks);
                    this.isConnected = true;
                };

                this.websocket.onmessage = (event: MessageEvent) => {
                    console.log('Info: on message:' + event.data);
                    let message: Message = JSON.parse(event.data);
                    this.pushRecievedMessage(message);
                    onMessageFunc(message);
                };

                this.websocket.onclose = (event: CloseEvent) => {
                    console.log('Info: connection closed.', event);
                    onCloseFunc(event);
                    this.isConnected = false;
                };
            }
        );
    }

    public stop(): boolean {
        if (!this.isConnected) {
            console.warn('Websocket hasn\'t been connected!');
            return false;
        }
        this.websocket.close();
        this.friendMessageStacks = [];
        return true;
    }

    public getFriendMessageStackByFriendId(firendId: number): FriendMessageStack {
        let theMessageStack = this.friendMessageStacks.find(
            function(this: ChatService, value: FriendMessageStack, index: number, messageStacks: FriendMessageStack[]){
                return value.friend.userID === firendId;
            }.bind(this)
        );
        return theMessageStack;
    }

    public sendMessage (message: Message) {
        this.websocket.send(JSON.stringify(message));
        this.pushSentMessage(message);
    }

    public pushSentMessage(message: Message) {
        this.getFriendMessageStackByFriendId(message.recieveUserID).addUnReadMessage(message);
    }

    public pushRecievedMessage(message: Message) {
        this.getFriendMessageStackByFriendId(message.sendUserID).addUnReadMessage(message);
    }

    private addEmptyFriendMessageStack(friend: User) {
        this.friendMessageStacks.push(new FriendMessageStack(friend));
    }

}

