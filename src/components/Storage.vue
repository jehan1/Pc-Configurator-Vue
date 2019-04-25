<template>

<div id="storageDropdown">
    <b-dropdown variant="outline-success" v-if="this.selectedMemory.length >= 1 && this.display == 0 "
                id="dropdown-1" text="Select Storage Drive..." class="m-md-2" :disabled="this.storage.length == 0">
    <b-dropdown-item v-for="st in storage" v-bind:key="st.id"
                       v-on:click="handleStClick(st)">
        {{ st.name }}
    </b-dropdown-item>
    <b-dropdown-divider> 
      
    </b-dropdown-divider>
    </b-dropdown>

    <b-list-group v-if="this.selectedMemory.length >= 1 && this.display == 0 ">
      <b-list-group-item v-for="st in selectedSt" v-bind:key="st.id"  >
        <div class="selected-storage-item">
          <p id="selected-storage-name">{{ st.name }}</p>
          <p id="selected-storage-quantity">Quantity: {{ st.quantity }}</p>
          <b-button class="selected-storage-btn" @click="increaseStQuantity(st)" variant="success">
            <fa-icon icon="plus"></fa-icon>
          </b-button>
          <b-button class="selected-storage-btn" @click="decreaseStQuantity(st)" variant="warning">
            <fa-icon icon="minus"></fa-icon>
          </b-button>
          <b-button class="selected-storage-btn" @click="removeSelectedSt(st)" variant="outline-danger">Remove</b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>

  </template>

  <script>
  export default {
    name: 'Storage',

    props:{
        storage: Array,
        selectedSt: Array,
        display: Number,
        selectedMemory: Array
    },

    methods:{
        handleStClick(st){
            this.$emit('handle-st-click',st)
        },

        increaseStQuantity(st){
            this.$emit('increase-st-quantity',st)
        },

        decreaseStQuantity(st){
            this.$emit('decrease-st-quantity',st)
        },

        removeSelectedSt(st){
            this.$emit('remove-selected-st',st)
        }
      }
  }
  </script>

  <style scoped>
#storageDropdown{

  margin: 20px 0px 0px 0px;
  cursor: pointer;
}

.selected-storage-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  cursor: pointer;
}

#selected-storage-name {
  vertical-align: middle;
  margin-bottom: 0
}

#selected-storage-quantity {
  width: 80px;
  margin: 0px 20px 0px 20px;
  cursor: pointer;
}

.selected-storage-btn {
  margin:  0px 10px 0px 0px;
  cursor: pointer;
}

</style>

  