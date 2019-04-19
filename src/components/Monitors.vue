  <template>
  <div id="monitorDropdown">
     <b-dropdown variant="outline-success" v-if="this.currentlySelectedCase.id != null && this.display == 0"
                id="dropdown-1" text="Select Monitors..." class="m-md-2" :disabled="this.monitors.length == 0">
      <b-dropdown-item v-for="mon in monitors" v-bind:key="mon.id"
                       v-on:click="handleMonClick(mon)">
        {{ mon.name }}
      </b-dropdown-item>
    </b-dropdown>
 
    <b-list-group v-if= "this.display == 0">
      <b-list-group-item v-for="mon in selectedMonitors" v-bind:key="mon.id" >
        <div class="selected-Monitors-item">
          <p id="selected-Monitors-name">{{ mon.name }}</p>
          <p id="selected-Monitors-quantity">Quantity: {{ mon.quantity }}</p>
          <b-button class="selected-mon-btn" v-on:click="increaseMonQuantity(mon)" variant="success">
            <fa-icon icon="plus"></fa-icon>
          </b-button>
          <b-button class="selected-mon-btn" v-on:click="decreaseMonQuantity(mon)" variant="warning">
            <fa-icon icon="minus"></fa-icon>
          </b-button>
          <b-button class="selected-mon-btn" v-on:click="removeSelectedMon(mon)" variant="outline-danger">Remove</b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>  
  </template>

  <script>
  export default {
      name: 'Monitors',

      props:{
        monitors: Array,
        selectedMonitors: Array,
        display: Number,
        currentlySelectedCase: Object
      },

      methods:{
        handleMonClick(mon){
            this.$emit('handle-mon-click',mon)
        },

        increaseMonQuantity(mon){
           this.$emit('increase-mon-quantity',mon) 
        },

        decreaseMonQuantity(mon){
            this.$emit('decrease-mon-quantity',mon)
        },

        removeSelectedMon(mon){
            this.$emit('remove-selected-mon',mon)
        }

      }
  }
  </script>
  
  <style  scoped>

  #monitorDropdown{

  margin: 20px 0px 0px 0px;
  cursor: pointer;
  }

.selected-Monitors-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  cursor: pointer;
}

#selected-Monitors-name {
  vertical-align: middle;
  margin-bottom: 0
}

#selected-Monitors-quantity {
  width: 80px;
  margin: 0px 20px 0px 20px;
  cursor: pointer;
}

.selected-mon-btn {
  margin:  0px 10px 0px 0px;
  cursor: pointer;
}
  
</style>
  
  