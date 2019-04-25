<template>
    <div>

    <div id= "submitButton" >  
    <b-button 
        variant="primary"
        v-if="selectedPowerSupply.id != null"
        @click="submit()"
        >
        submit
    </b-button>
    </div>
    
    </div>
</template>

<script>
export default {
    name: 'Submit',

    props:{
        selectedPowerSupply: Object,
        

    },
    data(){
        return{
            hh: 0
        }
    },
    methods:{
        submit(){
            this.hh = 1
            this.$emit("submit-btn",this.hh)
        }
    }
}
</script>

<style >

#submitButton{
    margin: 20px 0px 0px 0px;
    
     
}



</style>



