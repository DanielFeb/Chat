<template>
  <div class="row" >
    <div class="col-md-4">{{ label }} </div>
    <div class="col-md-4"><input v-bind:type="type" v-bind:value="fieldValue" v-on:input="onInput"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import { Prop } from 'vue-property-decorator'

import Message from '@/model/message'
import User from '@/model/user'

@Component({
  // without the model, the prop have to be "value", event have to be "input"
  // see https://cn.vuejs.org/v2/guide/components-custom-events.html
  model: {
    prop: 'fieldValue',
    event: 'fieldInput'
  }
})
export default class FieldWithLabel extends Vue {
  @Prop()
  label: string
  @Prop()
  fieldValue: any
  @Prop()
  type:string

  onInput($event) {
    // user defined model event name
    this.$emit('fieldInput', $event.target.value)
  }
}
</script>

<style scoped>
</style>


