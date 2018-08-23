


import { Message }                                          from '../model/message';
import { User }                                             from '../model/user';

export class FriendMessageStack {
    public friend: User;
    public messagesRead: Message[];
    public messagesUnRead: Message[];
    constructor (friend: User) {
        this.friend = friend;
        this.messagesRead = [];
        this.messagesUnRead = [];
    }
    public readAllMessages() {
        this.messagesUnRead.forEach(element => {
            this.messagesRead.push(element);
        });
        this.messagesUnRead.splice(0, this.messagesUnRead.length);
    }
    public addUnReadMessage(message: Message) {
        this.messagesUnRead.push(message);
    }
}
