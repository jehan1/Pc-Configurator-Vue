<template>
<div id ="processor">
    <div id="processorDropdown">
      <b-dropdown variant="outline-success" v-if="this.currentlySelectedMotherboard.id != null && this.display == 0"
                id="dropdown-1" :text="processor.name" class="m-md-2">
      <b-dropdown-item v-for="proc in processors" v-bind:key="proc.id"
                       v-on:click="handleProcClick(proc)">
        {{ proc.name }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</div>
</template>

<script>

import { config } from '../main.js';

export default {
  name : 'processor',
    
  props:{
    processors: Array,
    display: Number,
    currentlySelectedMotherboard: Object,
    currentlySelectedProcessor: Object

  },

  methods:{
    handleProcClick(proc){
      this.processor = proc
      this.$emit('handle-pro-click',proc);

    }
  },
  computed:{
    processor:{
      get: function(){
      var pr = this.currentlySelectedProcessor
      return pr
      },
      set: function(currentlySelectedProcessor){
        var pr = currentlySelectedProcessor;
      }
      
    }
  }
}
</script>

<style scoped>

#processorDropdown {
  margin: 20px 0px 0px 0px;
  cursor: pointer;
  
}
</style>


