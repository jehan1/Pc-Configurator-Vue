<template>
  <div id="app">
    <Builder v-if="!finished"/>
    <FinishPage v-else />
  </div>
</template>

<script>
import Builder from './components/Builder.vue'


export default {
  name: 'app',
  components: {
    Builder
  },
  data(){
    return{
      finished: false
    }
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
