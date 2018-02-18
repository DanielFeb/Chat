<template>
<div class ="container">
  <div class="row chat-container">
    <div id="friend-list" class="friend-list col-md-4">
      <div class="container">
        <h2 class="subtitle">
          Friend list
        </h2>
        <hr>
        <friend-item
        v-for="(messageStack, index) in messageStacks" 
        v-bind:key="index"
        v-bind:messageStack="messageStack"
        v-on:selectFriend="select"></friend-item>
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
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'

import AppLogo from '@/components/AppLogo.vue'
import FriendItem, { MessageStack } from '@/components/FriendItem.vue'
import MessageItem from '@/components/MessageItem.vue'

import Friend from '@/model/friend'
import User from '@/model/User'
import Message from '@/model/message'

@Component({
  components: {
    AppLogo,
    FriendItem,
    MessageItem
  }
})
export default class Chat extends Vue {

  messageStacks: MessageStack[] = []

  currentFriendMessageStack: MessageStack | null  = null

  currentUser: User = { userID: 1, password: '' }

  inputMessage: String = ''

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

  select(messageStack: MessageStack) {
    if (this.currentFriendMessageStack) {
      this.currentFriendMessageStack.isActive = false
      this.currentFriendMessageStack.cacheMessage = this.inputMessage
    }
    this.currentFriendMessageStack = messageStack
    this.currentFriendMessageStack.isActive = true
    this.inputMessage = this.currentFriendMessageStack.cacheMessage
  }

  send () {
    if(this.currentFriendMessageStack && this.inputMessage != '') {
      let message: Message = {
        sendUserID: this.currentUser.userID,
        recieveUserID: this.currentFriendMessageStack.friend.userID,
        textMessage: this.inputMessage,
        sendTime: 3214124124,
      } as Message;
      this.currentFriendMessageStack.messages.push(message)
      this.inputMessage = ''
    }
  }

  created() {
    // Mock data
    this.messageStacks = [
      new MessageStack({
        nickname: 'daniel',
        iconUrl: 'test'
      }),
      new MessageStack({
        nickname: 'sally',
        iconUrl: 'test1'
      }),
      new MessageStack({
        nickname: 'mona',
        iconUrl: 'test2'
      })
    ]
    this.messageStacks[0].messages.push({
    sendUserID: 1,
    recieveUserID: 2,
    textMessage: "test mesage",
    sendTime: 213123
    })
    this.messageStacks[0].messages.push({
    sendUserID: 2,
    recieveUserID: 1,
    textMessage: "test mesage2",
    sendTime: 213123
    })
    this.messageStacks[0].messages.push({
    sendUserID: 1,
    recieveUserID: 2,
    textMessage: "test mesage3",
    sendTime: 213123
    })
    this.messageStacks[0].messages.push({
    sendUserID: 1,
    recieveUserID: 2,
    textMessage: "test mesage4",
    sendTime: 213123
    })
  }
}
</script>

<style>
.chat-container {
  height: 90vh;
}
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
