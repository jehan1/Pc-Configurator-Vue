<template>
    <div id="processorDropdown">
      <b-dropdown variant="outline-success" v-if="this.currentlySelectedMotherboard.id != null"
                id="dropdown-1" :text="currentlySelectedProcessor.name" class="m-md-2">
      <b-dropdown-item v-for="proc in processors" v-bind:key="proc.id"
                       v-on:click="handleProcClick(proc)">
        {{ proc.name }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>

import { config } from '../main.js';

export default {
  name : 'processor',
    
  props:{
    processors: Array,
    currentlySelectedMotherboard: Object

  },
 
  data(){
    return {
      currentlySelectedProcessor: { name: 'Select processor...' },

      }
    },
      
    methods:{
      handleProcClick(proc){
        this.currentlySelectedProcessor = proc
        this.$emit('handle-pro-click',proc);
 
      }
    }
}
</script>

<style>
#processorDropdown {
  margin: 20px 0px 0px 0px;
  cursor: pointer;
}
</style>


