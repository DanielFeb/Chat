<template>
  <div class="row">
    <div class="container-fluid" >
      <div v-bind:class="{other: this.message.sendUserID !== this.currentUser.userID, self: this.message.sendUserID === this.currentUser.userID}">
        {{ message.textMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import { Prop } from 'vue-property-decorator'

import Message from '@/model/message'
import User from '@/model/user'

@Component({
})
export default class MessageItem extends Vue {
  @Prop()
  message: Message
  @Prop()
  currentUser: User
}
</script>

<style scoped>
.other {
  float: left;
  background-color: silver;
  border: solid black 0.3px;
  padding: 5px 5px 5px 5px;
  margin: 5px 5px 0px 5px;
}
.self {
  float: right;
  background-color:greenyellow;
  border: solid black 0.3px;
  padding: 5px 5px 5px 5px;
  margin: 5px 5px 0px 5px;
}
</style>


