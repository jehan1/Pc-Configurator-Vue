<template>
    <div>
      <b-dropdown id="dropdown-1" variant="outline-primary" :text="currentlySelectedMotherboard.name" class="m-md-2">
      <b-dropdown-item v-for="mobo in motherboard" v-bind:key="mobo.id"
                      v-on:click="handleMoboClick(mobo)">
        {{ mobo.name }}
      </b-dropdown-item>
      </b-dropdown>
    </div>
</template>

<script>

import { config } from '../main.js';

export default {
    name: 'Motherboard',
    props: ["motherboard"],

    data(){
        return{
            currentlySelectedMotherboard: { name: 'Select motherboard...'},
        }
    },
    methods:{
        handleMoboClick(mobo){
            this.currentlySelectedMotherboard = mobo
            this.$emit('handle-mobo-click',mobo);
            
        }
    }
}

</script>

