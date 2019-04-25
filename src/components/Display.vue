<template>
    <div id= "component-list"  >
    <b-list-group  >
      <b-list-group-item  v-if="this.display == 1"  >
        <div class="selected-component-item" >
          <p id="heading">Motherboard: </p>
          <p id="componenets"> {{ currentlySelectedMotherboard.name }}</p>

          <p id="heading">Processor: </p>
          <p id="componenets"> {{ currentlySelectedProcessor.name }}</p>

          <p id="heading" v-if ="selectedMemory.length >= 1">Memory: </p>
          <p id="componenets" v-for="mem in selectedMemory" v-bind:key="mem.id">
             {{mem.quantity}} X {{ mem.name }}</p>

          <p id="heading"  v-if ="selectedSt.length >= 1">Storage Drive: </p>
          <p id="componenets" v-for="st in selectedSt" v-bind:key="st.id">
              {{st.quantity}} X {{ st.name }}</p>

          <p id="heading" v-if ="selectedMports.length >= 1" > M.2 Drive: </p>
          <p id="componenets" v-for="st in selectedMports" v-bind:key="st.id" >
               {{st.quantity}} X {{ st.name }}</p>

          <p id="heading"  >Case: </p>
          <p id="componenets" >{{ currentlySelectedCase.name }}</p>
          
          <p id="heading" v-if = "graphicsVideoPorts.length >= 1" >Graphics Card: </p>
          <p id="componenets" v-if = "graphicsVideoPorts.length >= 1" >
              {{totalGcardQuantity}} X {{ selectedGraphicsCard.name }}</p>
        
          <p id="heading" v-if = "monitorId.length >= 1" > Monitors : </p>
          <p id="componenets" v-for="st in selectedMonitors" v-bind:key="st.id" >
              {{st.quantity}} X  {{ st.name }}</p>
        
          <p id="heading"  >Power Supply: </p>
          <p id="componenets" >{{ selectedPowerSupply.name }}</p>
        </div>
      </b-list-group-item >
    </b-list-group>
    </div>
</template>

<script>
import { METHODS } from 'http';

export default {
    name: 'Display',

    props:{
        display: Number,
        selectedPowerSupply: Object,
        currentlySelectedMotherboard: Object,
        currentlySelectedProcessor: Object,
        selectedMemory: Array,
        currentlySelectedCase: Object,
        selectedGraphicsCard: Object,
        selectedSt: Array,
        selectedMports: Array,
        monitorId: Array,
        graphicsVideoPorts:Array,
        selectedMonitors:Array,
        totalGcardQuantity: Number

    }
}
</script>

<style scoped>

#component-list {
  position: relative;
  width: 50%;
  float: left;
  height: 100%;
  z-index: 1010101010;
  
}
#heading{
   font-weight: bold; 
}
#selected-component-item{
    border:0px solid transparent;
}
</style>


