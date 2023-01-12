<template>
    <div class="container">
        <div class="frame">
            <div class="nav">
                <ul class="links">
                    <li 
                    class="signin"
                    >
                        <a class="btn" @click="changeTab('SignIn')">Sign in</a>
                    </li>
                </ul>
            </div>
            <div>
		        <form class="form-signin" action="" method="post" name="form">
                    <label for="username">Username</label>
                    <input class="form-styling" type="text" name="username" v-model="loginEmail"/>
                    <label for="password">Password</label>
                    <input class="form-styling" type="password" name="password" v-model="loginPassword" @keyup.enter="signIn()"/>
                    <div v-if="isLoginError" class="error-message">Login error! Try another email or password</div>
                    <div>
                        <a class="btn-signin" @keyup.enter="signIn()" @click="signIn()">
                          Sign in
                        </a>
                    </div>
		        </form>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            loginEmail: '',
            loginPassword: '',
            isLoginError: false,
        }
    },
    methods: {
        ...mapActions(['setUserToken']),
        async signIn() {
            await this.setUserToken({
                email: this.loginEmail,
                password: this.loginPassword
            }).then(() => {
                this.$nuxt.$options.router.push('/')
        }).catch(() => {this.isLoginError = true});
        }
    },
}
</script>

<style>
body {
    margin: 0;
    overflow: hidden;
}

.form-styling {
    width: 100%;
    height: 43px;
    padding-left: 15px;
    border: none;
    border-radius: 20px;
    margin-bottom: 20px;
    background: rgba(255,255,255,.2);
}

.btn-signin {
    float: left;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 13px;
    text-align: center;
    color: #ffffff;
    padding-top: 8px;
    width: 100%;
    height: 35px;
	border: none;
	border-radius: 20px;
    margin-top: 23px;
    background-color: #1059ffba;
    padding: 11px 0px;
    color: #fff;
    text-decoration: none;
}

a.btn-signin:hover {
    cursor: pointer; 
    background-color: #0F4FE6;
    transition: background-color .5s; 
}
</style>

<style scoped>

html, body * { 
    box-sizing: border-box; 
    font-family: 'Open Sans', sans-serif; 
}

body {
    background:
      linear-gradient(
        rgba(138, 52, 52, 0.75), 
        rgba(180, 48, 33, 0.95));
}


.frame {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background: linear-gradient(
         rgba(35,43,85,0.75),
         rgba(182, 40, 45, 0.95)),
         no-repeat center center;
    background-size: cover;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    transition: all .5s ease;
}

.nav {
    position: relative;
    top: 0px;
    transition: all .5s ease;
}

li {
    padding-left: 10px;
    font-size: 18px;
    display: inline;
    text-align: left;
    text-transform: uppercase;
    padding-right: 10px;
    color: #ffffff;
}

.signin a {
    padding-bottom: 10px;
    color: #ffffff;
    text-decoration: none;
    border-bottom: solid 2px #1059ffba;
    transition: all .25s ease;
    cursor: pointer;
}

.form-signin {
    width: 430px;
    height: 375px;
	font-size: 16px;
	font-weight: 300;
    padding: 55px 37px 0;
    transition: opacity .5s ease, transform .5s ease;
}

.form-signin-left {
  transform: translateX(-400px);
  opacity: .0;
}

.form-signin input {
  color: #ffffff;
  font-size: 18px;
}

label {
    font-weight: 400;
    text-transform: uppercase;
    font-size: 13px;
    padding-left: 15px;
    padding-bottom: 10px;
    color: rgba(255,255,255,.7);
    display: block;
}

:focus {
    outline: none;
}

.form-signin input:focus, textarea:focus {
    background: rgba(255,255,255,.3);
    border: none; 
    padding-right: 40px;
    transition: background .5s ease;
}

h1 {
    color: #ffffff;
    font-size: 35px;
	font-weight: 300;
    text-align: center;
}

.error-message {
    color: #fff;
    font-size: 17px;
    font-weight: 600;
}
</style>