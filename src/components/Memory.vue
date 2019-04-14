<template>
    <div id="memoryDropdown">
     <b-dropdown variant="outline-success" v-if="this.currentlySelectedProcessor.id != null"
                id="dropdown-1" text="Select Memory..." class="m-md-2" :disabled="this.memory.length == 0">
      <b-dropdown-item v-for="mem in memory" v-bind:key="mem.id"
                       v-on:click="handleMemClick(mem)">
        {{ mem.name }}
      </b-dropdown-item>
    </b-dropdown>

    <b-list-group>
      <b-list-group-item v-for="mem in selectedMemory" v-bind:key="mem.id" >
        <div class="selected-memory-item">
          <p id="selected-memory-name">{{ mem.name }}</p>
          <p id="selected-memory-quantity">Quantity: {{ mem.quantity }}</p>
          <b-button class="selected-mem-btn" @click="increaseMemQuantity(mem)" variant="success">
            <fa-icon icon="plus"></fa-icon>
          </b-button>
          <b-button class="selected-mem-btn" v-on:click="decreaseMemQuantity(mem)" variant="warning">
            <fa-icon icon="minus"></fa-icon>
          </b-button>
          <b-button class="selected-mem-btn" v-on:click="removeSelectedMem(mem)" variant="outline-danger">Remove</b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
    
    <p v-if="this.selectedMemory.length >= 1">Total selected memory size: {{ this.totalMem }} GB</P>
  </div>
</template>

<script>

import { config } from '../main.js';
import { totalmem } from 'os';

export default {
    name: 'Memory',
    props:{
        memory: Array,
        selectedMemory:Array,
        totalMem: Number,
        currentlySelectedProcessor: Object
    },
    data(){
        return{
            selectedProcessor: null
        }
    },

    created() {
      config.$on('handle-proc-click',( currentlySelectedProcessor )=> {
        this.selectedProcessor = currentlySelectedProcessor
    });
    },   

    methods:{
        handleMemClick(mem){
            this.$emit('handle-mem-click',mem)
        },

        increaseMemQuantity(mem){
            this.$emit('increase-mem-quantity',mem)
        },

        decreaseMemQuantity(mem){
            this.$emit('decrease-mem-quantity',mem)
        },

        removeSelectedMem(mem){
            this.$emit('remove-selected-mem',mem)
        }
    }
}
</script>

<style scoped>
#memoryDropdown{

  margin: 20px 0px 0px 0px;
  cursor: pointer;
}

.selected-memory-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  cursor: pointer;
}

#selected-memory-name {
  vertical-align: middle;
  margin-bottom: 0
}

#selected-memory-quantity {
  width: 80px;
  margin: 0px 20px 0px 20px;
  cursor: pointer;
}

.selected-mem-btn {
  margin:  0px 10px 0px 0px;
  cursor: pointer;
}

</style>



