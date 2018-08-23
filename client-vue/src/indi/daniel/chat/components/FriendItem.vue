<template>
  <div class="row friend-item" @click="select" v-bind:class="{ active: messageStack.isActive }">
    <div name="icon" class="col-4">
      <div class="icon">
        {{messageStack.friend.iconUrl}}
      </div>
    </div>
    <div name="profile" class="col-8">
      <p>{{messageStack.friend.nickname}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { emit } from 'cluster';

import MessageStack from '@/model/message-stack'

@Component
export default class FriendItem extends Vue {
  @Prop()
  messageStack: MessageStack
  @Prop()
  isActive: Boolean
  select() {
    this.$emit("selectFriend", this.messageStack)
  }
}
</script>

<style scoped>
.friend-item {
  padding-bottom: 5px;
  padding-top: 5px;
  border-bottom: black solid 0.3px;
}
.icon {
  height: 60px;
  width: 60px;
  border: lightgray solid 0.3px;
}
.active {
  background-color: teal;
}
</style>
