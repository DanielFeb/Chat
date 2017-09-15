import { Component, OnInit }        from '@angular/core';

import { Message }                                  from '../model/message';
import { FriendMessageStack }                       from '../model/friend-message-stack';
import { SignService }                              from '../service/sign.service';
import { ChatService }          from '../service/chat.service';

import * as $ from 'jquery';

@Component({
    selector: 'main',
    styleUrls: [ './main.component.css' ],
    templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

    public friendMessageStacks: FriendMessageStack[] = [];

    public selectedStack: FriendMessageStack;

    public inputMessage: string = '';

    constructor(private chatService: ChatService,
                private signService: SignService) {
    }

    ngOnInit(): void {
        this.signService.checkAuth();
        this.chatService.start(
            (stacks) => {
                this.friendMessageStacks = stacks;
            },
            (message) => {
                if ( this.selectedStack && message.sendUserID === this.selectedStack.friend.userID){
                    this.consumeMessage();
                }
            },
            (event) => {

            }
        );
    }

    public onSelect (stack: FriendMessageStack): void {
        this.cleanChatWindow();
        this.selectedStack = stack;
        this.selectedStack.readAllMessages();
        this.selectedStack.messagesRead.forEach(message => {
            this.addMessageBubble(message);
        });
    }

    public consumeMessage () {
        this.selectedStack.messagesUnRead.forEach(message => {
            this.addMessageBubble(message);
        });
        this.selectedStack.readAllMessages();
    }

    public sendMessage() {
        if ( this.inputMessage !== '' ) {
            let message: Message = {
                sendUserID: this.signService.currentUser.userID,
                recieveUserID: this.selectedStack.friend.userID,
                textMessage: this.inputMessage,
                sendTime: Date.now()
            };
            this.chatService.sendMessage(message);
            this.consumeMessage();
            this.inputMessage = '';
        }
    }

    public cleanChatWindow() {
        $('#chat_div p').empty();
    }

    public addMessageBubble(message: Message) {
        if (message.sendUserID === this.selectedStack.friend.userID) {
            $('#chat_div').append('<p> He said at ' + message.sendTime + ':' + message.textMessage + '</p>');
        } else {
            $('#chat_div').append('<p> You said at ' + message.sendTime + ':' + message.textMessage + '</p>');
        }
    }
}
