<template>
    <div id= "submitButton" >
       
    <b-button 
        variant="primary"
        v-if="selectedPowerSupply.id != null"
        >
        submit
        </b-button>
    </div>
</template>

<script>
export default {
    name: 'Submit',

    props:{
        selectedPowerSupply: Object,

    }
}
</script>

<style scoped>

#submitButton{
    margin: 20px 0px 0px 0px;
}

</style>



