<template>
  <div >
    <h1>{{ info }}</h1>
   
  </div>
</template>


<script>
import axios from 'axios'

export default {

data(){
  return {
    info: null
  }
},
created() {
  axios
    .get('http://localhost:8090/Motherboard')
    .then(response => (this.info = response))
  }

}
</script>

<style scoped>

</style>
