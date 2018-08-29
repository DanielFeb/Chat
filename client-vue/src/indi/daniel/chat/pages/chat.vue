<template>
  <div class="row justify-content-md-center h-100">
    <div class="col-sm-12e col-md-10 align-middle">
      <div class="row h-100">
        <div id="friend-list" class="friend-list col-md-4 d-none d-sm-none d-md-block">
          <div class="container">
            <h2 class="subtitle">
              Friend list
            </h2>
            <a v-on:click="signOut">sign out</a>
            <hr>
            <friend-item
              v-for="(messageStack, index) in messageStacks" 
              v-bind:key="index"
              v-bind:messageStack="messageStack"
              v-on:selectFriend="select">
            </friend-item>
          </div>
        </div>
        <div id="chat-window-div" class="chat-window col-md-8">
          <div class="title-container">
            <h2 class="subtitle">
              {{ titleOfChat }}
            </h2>
          </div>
          <hr>
          <div v-show="currentFriendMessageStack !== null">
            <div id="messages-div" class="messages-container">
              <message-item v-for="(message, index) in messages"
              v-bind:key="index"
              v-bind:message="message"
              v-bind:currentUser="currentUser"></message-item>
            </div>
            <hr>
            <div id="input-div" class="input-container">
              <textarea id="input" v-model="inputMessage" class="container-fluid input" />
              <button class="send-button" @click="send">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'

import AppLogo from '@/components/AppLogo.vue'
import FriendItem from '@/components/FriendItem.vue'
import MessageItem from '@/components/MessageItem.vue'

import Friend from '../model/friend'
import User from '../model/user'
import Message from '../model/message'
import MessageStack from '../model/message-stack'

import AuthenticationService from '../service/authentication.service'
import ChatService from '../service/chat.service'

@Component({
  components: {
    AppLogo,
    FriendItem,
    MessageItem
  }
})
export default class Chat extends Vue {

  messageStacks: MessageStack[] = []

  currentFriendMessageStack: MessageStack | null = null

  currentUser: User

  inputMessage: string = ''

  get messages () {
    if (this.currentFriendMessageStack) {
      return this.currentFriendMessageStack.messages
    }
    return []
  }

  get titleOfChat () {
    if (this.currentFriendMessageStack) {
      return this.currentFriendMessageStack.friend.nickname
    }
    return ""
  }

  select (messageStack: MessageStack) {
    if (this.currentFriendMessageStack) {
      this.currentFriendMessageStack.isActive = false
      this.currentFriendMessageStack.cacheMessage = this.inputMessage
    }
    this.currentFriendMessageStack = messageStack
    this.currentFriendMessageStack.isActive = true
    this.inputMessage = this.currentFriendMessageStack.cacheMessage
  }

  send () {
    if(this.currentFriendMessageStack && this.inputMessage !== '') {
      let message: Message = {
        sendUserID: this.currentUser.userID,
        recieveUserID: this.currentFriendMessageStack.friend.userID,
        textMessage: this.inputMessage,
        sendTime: 3214124124
      } as Message;

      ChatService.sendMessage(message)
      this.currentFriendMessageStack.messages.push(message)
      this.inputMessage = ''
    }
  }

  signOut() {
    AuthenticationService.signOut()
    this.$router.replace('/login')
  }

  created() {
    if (AuthenticationService.isUserLoggedIn()) {
      this.currentUser = AuthenticationService.currentUser

      let onOpenFunc = (messageStacks: MessageStack[]) => {
        this.messageStacks = messageStacks
      }

      let onMessageFunc = (message: Message) => {
          this.pushRecievedMessage(message)
      }

      let onCloseFunc = (event: CloseEvent) => {

      }
      ChatService.start(onOpenFunc, onMessageFunc, onCloseFunc)
    }
    else {
      this.$router.replace('/login')
    }
  }

  getMessageStackByFriendId (firendId: number): MessageStack | undefined {
    let theMessageStack = this.messageStacks.find(
      (value) => {
        return value.friend.userID === firendId
      }
    )
    return theMessageStack
  }

  pushSentMessage (message: Message) {
    let theMessageStack = this.getMessageStackByFriendId(message.recieveUserID)
    if (theMessageStack !== undefined) {
      theMessageStack.messages.push(message)
    }
  }

  pushRecievedMessage (message: Message) {
    let theMessageStack = this.getMessageStackByFriendId(message.sendUserID)
    if (theMessageStack !== undefined) {
      theMessageStack.messages.push(message)
    }
  }
}
</script>

<style>
.title-container {
  height: 5vh;
}
.messages-container {
  height: 45vh;
}
.input-container {
  height: 30vh;
}
.friend-list {
  background-color:darkslategray;
}
.input {
  height: 25vh;
  resize: none;
  border: none;
  background-color: inherit;
  outline: none;
}
.chat-window {
  background-color:gainsboro;
  text-align: center;
}
.send-button {
  float: right;
  width: 120px;
}
</style>
