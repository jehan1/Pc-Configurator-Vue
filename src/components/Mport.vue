<template>
     <div id="mPortDropdown">
     <b-dropdown variant="outline-success" v-if="this.selectedSt.length >= 1 "
                id="dropdown-1" text="Select M.2 Drive..." class="m-md-2" :disabled="this.mPorts.length == 0">
      <b-dropdown-item v-for="mp in mPorts" v-bind:key="mp.id"
                       v-on:click="handleMportClick(mp)">
        {{ mp.name }}
      </b-dropdown-item>
    </b-dropdown>
  
    <b-list-group>
      <b-list-group-item v-for="sMports in selectedMports" v-bind:key="sMports.id" >
        <div class="selected-mPort-item">
          <p id="selected-mPort-name">{{ sMports.name }}</p>
          <p id="selected-mPort-quantity">Quantity: {{ sMports.quantity }}</p>
          <b-button class="selected-mPort-btn" @click="increaseMportQuantity(sMports)" variant="success">
            <fa-icon icon="plus"></fa-icon>
          </b-button>
          <b-button class="selected-mPort-btn" @click="decreaseMportQuantity(sMports)" variant="warning">
            <fa-icon icon="minus"></fa-icon>
          </b-button>
          <b-button class="selected-mPort-btn" @click="removeSelectedMport(sMports)" variant="outline-danger">Remove</b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
    name: 'Mport',

    props:{
        mPorts: Array,
        selectedMports: Array,
        selectedSt: Array

    },

    methods:{
        handleMportClick(mp){
            this.$emit('handle-mport-click',mp)
        },

        increaseMportQuantity(sMports){
            this.$emit('increase-mport-quantity',sMports)
        },

        decreaseMportQuantity(sMports){
            this.$emit('decrease-mport-quantity',sMports)
        },

        removeSelectedMport(sMports){
            this.$emit('remove-selected-mport',sMports)
        }

    }
}
</script>

<style scoped>
#mPortDropdown{

  margin: 10px 20px 10px 10px;
  cursor: pointer;
}

.selected-mPort-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

#selected-mPort-name {
  vertical-align: middle;
  margin-bottom: 0
}

#selected-mPort-quantity {
  width: 80px;
  margin: 0px 20px 0px 20px;
  cursor: pointer;
}

.selected-mPort-btn {
  margin:  0px 10px 0px 0px;
  cursor: pointer;
}

</style>