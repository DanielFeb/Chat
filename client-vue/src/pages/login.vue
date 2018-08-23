<template>
  <div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4">
      <div class="row login-container">
        <h4>
          <field-with-label label="Username" v-model="username" type="text"></field-with-label>
        </h4>
        <h4>
          <field-with-label label="Password" v-model="password" type="password"></field-with-label>
        </h4>
        <div class="row">
          <div class="col-md-4">
            <button v-on:click="login">Login</button>
          </div>
        </div>
      </div>
      <nuxt-link to="/chat">chat</nuxt-link>
    </div>
    <div class="col-md-4"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import FieldWithLabel from '@/components/FieldWithLabel.vue'

@Component({
    components: {
        FieldWithLabel
    }
})
export default class Login extends Vue {
    username: string = ''
    password: string = ''
    login () {
        alert(this.username + "---" + this.password)
    }
}
</script>

<style scoped>

.login-container {
    background-color: cornsilk;
    text-align: center;
}
</style>


