<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-6">
        <div class="panel panel-login">
          <div class="panel-heading">
            <div class="row justify-content-md-center">
              <div class="col-xs-12">
                <a href="#" class="active" id="login-form-link">Login</a>
              </div>
              <!--<div class="col-xs-6">
                <a href="#" id="register-form-link">Register</a>
              </div> -->
            </div>
            <hr>
          </div>
          <div class="panel-body">
            <div class="row justify-content-md-center">
              <div class="col-lg-12">
                <div class="form-group">
                  <input type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Username" v-model="username"/>
                </div>
                <div class="form-group">
                  <input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password" v-model="password">
                </div>
                <div class="form-group text-center">
                  <input type="checkbox" tabindex="3" class="" name="remember" id="remember">
                  <label for="remember"> Remember Me</label>
                </div>
                <div class="form-group">
                  <div class="row justify-content-md-center">
                    <div class="col-md-10 col-12 ">
                      <button v-on:click="login" class="form-control btn btn-login">Log In</button>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row justify-content-md-center">
                    <div class="col-lg-12">
                      <a href="#" tabindex="5" class="forgot-password">Forgot Password?</a>
                    </div>
                  </div>
                </div>
              </div>
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
import FieldWithLabel from '@/components/FieldWithLabel.vue'
import AuthenticationService from '../service/authentication.service'

@Component({
  components: {
    FieldWithLabel
  }
})
export default class Login extends Vue {
  username: string = ''
  password: string = ''

  login () {
    AuthenticationService.login(this.username, this.password)
    .then(() => {
      this.$router.replace("/chat")
    })
  }
  created() {
    if (AuthenticationService.isUserLoggedIn()) {
      this.$router.replace('/chat')
    }
  }
}
</script>

<style scoped>

body {
    padding-top: 90px;
}
.panel-login {
  border-color: #ccc;
  -webkit-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
  box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
}
.panel-login>.panel-heading {
  color: #00415d;
  background-color: #fff;
  border-color: #fff;
  text-align:center;
}
.panel-login>.panel-heading a{
  text-decoration: none;
  color: #666;
  font-weight: bold;
  font-size: 15px;
  -webkit-transition: all 0.1s linear;
  -moz-transition: all 0.1s linear;
  transition: all 0.1s linear;
}
.panel-login>.panel-heading a.active{
  color: #029f5b;
  font-size: 18px;
}
.panel-login>.panel-heading hr{
  margin-top: 10px;
  margin-bottom: 0px;
  clear: both;
  border: 0;
  height: 1px;
  background-image: -webkit-linear-gradient(left,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.15),rgba(0, 0, 0, 0));
  background-image: -moz-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
  background-image: -ms-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
  background-image: -o-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
}
.panel-login input[type="text"],.panel-login input[type="email"],.panel-login input[type="password"] {
  height: 45px;
  border: 1px solid #ddd;
  font-size: 16px;
  -webkit-transition: all 0.1s linear;
  -moz-transition: all 0.1s linear;
  transition: all 0.1s linear;
}
.panel-login input:hover,
.panel-login input:focus {
  outline:none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  border-color: #ccc;
}
.btn-login {
  background-color: #59B2E0;
  outline: none;
  color: #fff;
  font-size: 14px;
  height: auto;
  font-weight: normal;
  padding: 14px 0;
  text-transform: uppercase;
  border-color: #59B2E6;
}
.btn-login:hover,
.btn-login:focus {
  color: #fff;
  background-color: #53A3CD;
  border-color: #53A3CD;
}
.forgot-password {
  text-decoration: underline;
  color: #888;
}
.forgot-password:hover,
.forgot-password:focus {
  text-decoration: underline;
  color: #666;
}

.btn-register {
  background-color: #1CB94E;
  outline: none;
  color: #fff;
  font-size: 14px;
  height: auto;
  font-weight: normal;
  padding: 14px 0;
  text-transform: uppercase;
  border-color: #1CB94A;
}
.btn-register:hover,
.btn-register:focus {
  color: #fff;
  background-color: #1CA347;
  border-color: #1CA347;
}

</style>


