<template>
      <div id="CaseDropdown">
      <b-dropdown variant="outline-success" v-if=" selectedSt.length >= 1 "
                id="dropdown-1" :text="currentlySelectedCase.name" class="m-md-2">
      <b-dropdown-item v-for=" c in Case" v-bind:key="c.id"
                       v-on:click="handleCaseClick(c)">
        {{ c.name}}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
    name: 'Case',

    props:{
        Case: Array,
        selectedSt: Array
    },

    data(){
        return{
           currentlySelectedCase: {name:'Select The Case...'}
        }
    },

    methods:{
        handleCaseClick(c){
            this.currentlySelectedCase = c
            this.$emit('handle-case-click',c)
        }
    }

}
</script>
