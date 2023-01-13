<template>
    <nav class="navbar">
        <nuxt-link to="/">
            <div class="home-icon-block">
            </div>
        </nuxt-link>
        <div class="links-block">
            <nuxt-link to="/" class="link">
                Projects
            </nuxt-link>
            <a class="link" @click="logoutMethod()">
                Logout
            </a>
        </div>
    </nav>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions(['logout']),
        async logoutMethod() {
            await this.logout().then(() => {
                this.$nuxt.$options.router.push('/login')
            });
        }
    },
}
</script>
<style scoped>
.navbar {
    width: 100%;
    padding: 20px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    -webkit-box-shadow: 0px 0.5px 8px 0px rgba(0,0,0,0.72);
    -moz-box-shadow: 0px 0.5px 8px 0px rgba(0,0,0,0.72);
    box-shadow: 0px 0.5px 8px 0px rgba(0,0,0,0.72);
    background: #fff;
}

.home-icon-block {    
    height: 30px;
    width: 30px;
    background-size: cover;
    background-image: url('../static/images/logo.png');
    cursor: pointer;
}

.link, .links-block {
    padding-right: 30px;
}

.link {
    cursor: pointer;
}

.links-block a {
    font-weight: 300;
    font-size: 20px;
    color: rgba(90, 90, 90, 0.74);
    text-transform: uppercase;
    text-decoration: none;
}
</style>
