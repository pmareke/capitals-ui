<template>
  <div id="app">
    <Capitals/>
  </div>
</template>

<script>
import Capitals from './components/Capitals'

export default {
  name: 'App',
  components: {
    Capitals,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
