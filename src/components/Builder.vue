<template>
  <div>
    <div>
      <b-dropdown id="dropdown-1" variant="outline-primary" :text="currentlySelectedMotherboard.name" class="m-md-2">
      <b-dropdown-item v-for="mobo in motherboard" v-bind:key="mobo.id"
                      v-on:click="handleMoboClick(mobo)">
        {{ mobo.name }}
      </b-dropdown-item>
      </b-dropdown>
    </div>
   <div id="processorDropdown">
      <b-dropdown variant="outline-success" v-if="currentlySelectedMotherboard.id != null"
                id="dropdown-1" :text="currentlySelectedProcessor.name" class="m-md-2">
      <b-dropdown-item v-for="proc in processors" v-bind:key="proc.id"
                       v-on:click="handleProcClick(proc)">
        {{ proc.name }}
      </b-dropdown-item>
    </b-dropdown>
  </div>

  <div id="memoryDropdown">
     <b-dropdown variant="outline-success" v-if="this.currentlySelectedProcessor.id != null"
                id="dropdown-1" text="Select Memory..." class="m-md-2" :disabled="this.memory.length == 0">
      <b-dropdown-item v-for="mem in memory" v-bind:key="mem.id"
                       v-on:click="handleMemClick(mem)">
        {{ mem.name }}
      </b-dropdown-item>
    </b-dropdown>
  </div>

  <div>
    <b-list-group>
      <b-list-group-item v-for="mem in selectedMemory" v-bind:key="mem.id" >
        <div class="selected-memory-item">
          <p id="selected-memory-name">{{ mem.name }}</p>
          <p id="selected-memory-quantity">Quantity: {{ mem.quantity }}</p>
          <b-button class="selected-mem-btn" v-on:click="increaseMemQuantity(mem)" variant="success">
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
  <div id="CaseDropdown">
      <b-dropdown variant="outline-success" v-if="selectedMemory.length >= 1 "
                id="dropdown-1" :text="currentlySelectedCase.name" class="m-md-2">
      <b-dropdown-item v-for=" c in Case" v-bind:key="c.id"
                       v-on:click="handleCaseClick(c)">
        {{ c.name}}
      </b-dropdown-item>
    </b-dropdown>
  </div>
   <div id="GraphicsCardDropdown">
      <b-dropdown variant="outline-success" v-if="this.currentlySelectedCase.id != null "
                id="dropdown-2" :text="currentlySelectedGcard.name" class="m-md-2">
      <b-dropdown-item v-for=" gCard in graphicsCard" v-bind:key="gCard.id"
                       v-on:click="handleGcardClick(gCard)">
        {{ gCard.name}}
      </b-dropdown-item>
    </b-dropdown>
  </div>

</div>
</template>


<script>

import MotherboardsApi from '../services/api/Motherboards.js';
import ProcApi from '../services/api/Processor.js';
import MemApi from '../services/api/Memory.js';
import CaseApi from '../services/api/Case.js';
import GcardApi from '../services/api/GraphicsCard.js';


export default {
  name: 'Builder',

data(){
  return {
    motherboard: [],
    currentlySelectedMotherboard: { name: 'Select motherboard...'},

    processors: [],
    currentlySelectedProcessor: { name: 'Select processor...' },

    memory: [],
    selectedMemory: [],
    totalQuantity:0,

    Case: [],
    currentlySelectedCase: { name: 'Select The Case...' },

    graphicsCard: [],
    currentlySelectedGcard: { name: 'Select The Graphics Card...' },
    
     PciLaneId:[]
  }
},

methods:{
  async handleMoboClick(mobo){
    this.selectedMemory = []; // clearing any existing selected mem
    this.currentlySelectedProcessor= { name: 'Select processor...' }; // clearing any existing selected proc
    this.currentlySelectedCase = { name: 'Select The Case...' } // clearing any existing selected Case
    this.totalQuantity = 0;

    this.currentlySelectedMotherboard = mobo;

    this.processors = await ProcApi.getProcessors(
      this.currentlySelectedMotherboard.processorSocket.id);
      console.log(this.processors)

    var apiMem = await MemApi.getMemory(
      this.currentlySelectedMotherboard.memoryType.id)
    for (var i = 0; i < apiMem.length; i++) {
      apiMem[i].quantity = 1;
    }
    this.memory = apiMem;

    this.Case = await CaseApi.getCase(this.currentlySelectedMotherboard.caseSize.size)
    
    this.getPciLaneId()
    
    for (var i = 0; i < this.PciLaneId.length; i++) {

     var gCards = await GcardApi.getGrCard(this.PciLaneId[i])
      for(var j = 0 ; j < gCards.length; j++ ){
              this.graphicsCard.push(gCards[j])
        }

    }


  },
  handleProcClick(proc){
    this.currentlySelectedProcessor = proc;
  }, 
  handleMemClick(mem) {
    this.totalQuantity++;
    if ((this.totalMem + mem.capacity) > this.currentlySelectedMotherboard.maxMemory||
        this.totalQuantity   >= this.currentlySelectedMotherboard.noMemoryPorts) {
      alert('NO MORE NEW MEMORY ALLOWED, SIZE EXCEEDED')
    }
    else {
      this.selectedMemory.push(mem);
      this.memory = this.memory.filter((memory) => {
        return mem.id != memory.id
      });
    }
  },
  removeSelectedMem(mem) {
    this.memory.push(mem);
    this.selectedMemory = this.selectedMemory.filter((memory) => {
      return mem.id != memory.id
   });
  },
  increaseMemQuantity(mem) {
    if ((this.totalMem + mem.capacity) > this.currentlySelectedMotherboard.maxMemory ||
        this.totalQuantity >= this.currentlySelectedMotherboard.noMemoryPorts) {
      alert('NO MORE MEMORY QUANTITY ALLOWED!');
      
    }
    else {
      mem.quantity++;
      this.totalQuantity++;
      console.log(this.totalQuantity)
    }
  },
  decreaseMemQuantity(mem) {
    if (mem.quantity == 1) {
      alert('QUANTITY CANNOT BE LESS THAN 1!');
    }
    else {
      mem.quantity--;
      this.totalQuantity--;
    }
  },
  handleCaseClick(c){
    this.currentlySelectedCase= c ;
  },
  handleGcardClick(gCard){
    this.currentlySelectedGcard= gCard;
  },
  getPciLaneId(){
    
    let temp = this.currentlySelectedMotherboard.pciLanes
    for(var i = 0; i < temp.length ; i++){
      this.PciLaneId.push(temp[i].id.pciLaneId)
    }
  }
},
  async mounted() {
    try {
      this.motherboard = await MotherboardsApi.getAllMotherboards();
    }
    catch (error) {
      console.log('server-down');
    }

  },
  computed: {
    totalMem() {
      var value = 0;
      for (var i = 0; i < this.selectedMemory.length; i++) {
        value += this.selectedMemory[i].capacity * this.selectedMemory[i].quantity;
      }

      return value;
    },
  }

}
</script>

<style  scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#processorDropdown {
  margin: 20px 0px 0px 0px;
  cursor: pointer;
}

#memoryDropdown{

  margin: 10px 20px 10px 10px;
  cursor: pointer;
}

.selected-memory-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center
}

#selected-memory-name {
  vertical-align: middle;
  margin-bottom: 0
}

#selected-memory-quantity {
  width: 80px;
  margin: 0px 20px 0px 20px
}

.selected-mem-btn {
  margin:  0px 10px 0px 0px;
}
#CaseDropdown{
  margin: 20px 0px 0px 10px;
  cursor: pointer;
}

#GraphicsCardDropdown{
  margin: 20px 0px 0px 0px;
  cursor: pointer;
}
</style>
