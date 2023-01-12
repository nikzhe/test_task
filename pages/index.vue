<template>
  <div>
    <home-page />
  </div>
</template>

<script>
import HomePage from '../components/HomePage.vue'
export default {
  components: { HomePage },
  name: 'IndexPage',
  middleware: 'login-redirect'
}
</script>
