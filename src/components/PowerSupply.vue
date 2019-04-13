<template>
    <div id="powerSupplyDropdown">
     <b-dropdown variant="outline-success" v-if="this.currentlySelectedCase.id != null"
                id="dropdown-1" :text="selectedPowerSupply.name" class="m-md-2" >
      <b-dropdown-item v-for="ps in powerSpplies" v-bind:key="ps.id"
                       v-on:click="handlePowerSupplyClick(ps)">
        {{ ps.name }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
    name:'PowerSypply',

    props:{
        powerSpplies: Array,
        selectedPowerSupply: Object,
        currentlySelectedCase: Object

    },

    methods:{
        handlePowerSupplyClick(ps){
            this.$emit('handle-power-supply-click',ps)
        }
    }
}
</script>

