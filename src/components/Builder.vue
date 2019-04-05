<template>
  <div>
    <div>
      <b-dropdown id="dropdown-1" variant="outline-primary" :text="currentlySelectedMotherboard.name" class="m-md-2">
      <b-dropdown-item v-for="mobo in motherboard" v-bind:key="mobo.id"
                      v-on:click="handleMoboClick(mobo)">
        {{ mobo.name }}
      </b-dropdown-item>
      </b-dropdown>
    </div>
   <div id="processorDropdown">
      <b-dropdown variant="outline-success" v-if="currentlySelectedMotherboard.id != null"
                id="dropdown-1" :text="currentlySelectedProcessor.name" class="m-md-2">
      <b-dropdown-item v-for="proc in processors" v-bind:key="proc.id"
                       v-on:click="handleProcClick(proc)">
        {{ proc.name }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
  </div>
</template>


<script>

import MotherboardsApi from '../services/api/Motherboards.js';

export default {
  name: 'Motherboard',


data(){
  return {
    motherboard: [],
    currentlySelectedMotherboard: { name: 'Select motherboard...'},

    processors: [],
    currentlySelectedProcessor: { name: 'Select processor...' }
  }
},
methods:{
  handleMoboClick(mobo){
    this.currentlySelectedMotherboard = mobo;
  },
  handleProcClick(proc){
      this.currentlySelectedProcessor = proc;
  }
},
async mounted() {
    try {
      this.motherboard = await MotherboardsApi.getAllMotherboards();
    }
    catch (error) {
      console.log('server-down');
    }

}
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#processorDropdown {
  margin: 10px 0px 0px 0px;
}
</style>
