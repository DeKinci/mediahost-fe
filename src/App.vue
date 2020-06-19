<template>
  <div class="wrapper" id="app">
    <NavBar :current="this.$route.path"/>
    <router-view class="container "></router-view>
  </div>
</template>

<script>
  import NavBar from './components/NavBar'

  export default {
    name: 'app',
    components: {
      NavBar
    },
    methods: {
      goBack () {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
<style lang="scss">
  @import 'assets/css/main';
</style>
