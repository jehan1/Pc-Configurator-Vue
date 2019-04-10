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
          <b-button class="selected-mem-btn" @click="increaseMemQuantity(mem)" variant="success">
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
                id="dropdown-2" :text="selectedGraphicsCard.name" class="m-md-2">
      <b-dropdown-item v-for=" gCard in graphicsCard" v-bind:key="gCard.id"
                       v-on:click="handleGcardClick(gCard)">
        {{ gCard.name}}
      </b-dropdown-item>
    </b-dropdown>
  </div>
  <div>
    <b-list-group>
      <b-list-group-item  selectedGraphicsCard v-if="this.selectedGraphicsCard.id != null " >
        <div class="selected-GraphicsCard-item">
          <p id="selected-GraphicsCard-name">{{ selectedGraphicsCard.name }}</p>
          <p id="selected-GraphicsCard-quantity">Quantity: {{ this.totalGcardQuantity }}</p>
          <b-button class="selected-GraphicsCard-btn" v-on:click="increasegCardQuantity(selectedGraphicsCard)" variant="success">
            <fa-icon icon="plus"></fa-icon>
          </b-button>
          <b-button class="selected-GraphicsCard-btn" v-on:click="decreasegCardQuantity(selectedGraphicsCard)" variant="warning">
            <fa-icon icon="minus"></fa-icon>
          </b-button>
          <b-button class="selected-mon-btn" v-on:click="removeSelectedgCard(selectedGraphicsCard)" variant="outline-danger">Remove</b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
  <div id="monitorDropdown">
     <b-dropdown variant="outline-success" v-if="this.currentlySelectedCase.id != null"
                id="dropdown-1" text="Select Monitors..." class="m-md-2" :disabled="this.monitors.length == 0">
      <b-dropdown-item v-for="mon in monitors" v-bind:key="mon.id"
                       v-on:click="handleMonClick(mon)">
        {{ mon.name }}
      </b-dropdown-item>
    </b-dropdown>
  </div>

  <div>
    <b-list-group>
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
</div>
</template>


<script>

import MotherboardsApi from '../services/api/Motherboards.js';
import ProcApi from '../services/api/Processor.js';
import MemApi from '../services/api/Memory.js';
import CaseApi from '../services/api/Case.js';
import GcardApi from '../services/api/GraphicsCard.js';
import MonApi from '../services/api/Monitors.js';


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
    selectedGraphicsCard:{ name: 'Select The Graphics Card...' },
    PciLaneId:[],
    totalGcardQuantity: 0,
    

    monitors:[],
    selectedMonitors:[],
    motherboardVideoPorts:[],
    graphicsVideoPorts:[],
    monitorId: [],
    totalMonitors: 0
  }
},

methods:{
  async handleMoboClick(mobo){
    this.selectedMemory = []; // clearing any existing selected mem
    this.currentlySelectedProcessor= { name: 'Select processor...' }; // clearing any existing selected proc
    this.currentlySelectedCase = { name: 'Select The Case...' } // clearing any existing selected Case
    this.totalQuantity = 0;
    this.graphicsCard = [];
    this.selectedGraphicsCard = { name: 'Select The Graphics Card...' },
    this.selectedMonitors = [];
    this.monitors = [];
    this.motherboardVideoPorts =[],

    this.currentlySelectedMotherboard = mobo;

    this.processors = await ProcApi.getProcessors(
      this.currentlySelectedMotherboard.processorSocket.id);
      

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

    this.getOnBoardMonitors()
    
    
  },
  handleProcClick(proc){
    this.currentlySelectedProcessor = proc;
  }, 
  handleMemClick(mem) {
    
    if ((this.totalMem + mem.capacity) > this.currentlySelectedMotherboard.maxMemory||
        this.totalQuantity   >= this.currentlySelectedMotherboard.noMemoryPorts) {
      alert('NO MORE NEW MEMORY ALLOWED, SIZE EXCEEDED')
    }
    else {
      this.totalQuantity++;
      this.selectedMemory.push(mem);
      this.memory = this.memory.filter((memory) => {
        return mem.id != memory.id
      });
    }
  },
  removeSelectedMem(mem) {
    this.memory.push(mem);
    this.totalQuantity = this.totalQuantity - mem.quantity
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
    this.totalGcardQuantity = 0;
    this.selectedGraphicsCard= null
    this.totalGcardQuantity++;
    this.selectedGraphicsCard = gCard;
    
    
    
    this.getGraphicsCardMonitors();

  },
  getPciLaneId(){
    
    this.PciLaneId = []
    let temp = this.currentlySelectedMotherboard.pciLanes
    for(var i = 0; i < temp.length ; i++){
      this.PciLaneId.push(temp[i].id.pciLaneId)
    }

    
  },
  increasegCardQuantity(selectedGraphicsCard){
    let temp = this.currentlySelectedMotherboard.pciLanes
    for(var i = 0; i < temp.length ; i++){
      if(this.selectedGraphicsCard.pciLanes.id ==
          temp[i].id.pciLaneId){
            if(this.totalGcardQuantity < temp[i].quantity){
              this.totalGcardQuantity++;
            }
            else{
              alert(" Quntity exceeded")
            }          
        }
    }
  },
  decreasegCardQuantity(selectedGraphicsCard){
    if (this.totalGcardQuantity == 1) {
      alert('QUANTITY CANNOT BE LESS THAN 1!');
    }
    else {
      this.totalGcardQuantity--;
    }
  },
  removeSelectedgCard(selectedGraphicsCard){
    this.selectedGraphicsCard = { name: 'Select The Graphics Card...' }
  },

  async getGraphicsCardMonitors(){
    
    this.graphicsVideoPorts = []
    this.monitors = []
    this.monitorId = []
    this.selectedMonitors = []
    this.motherboardVideoPorts =[]
    this.totalMonitors = 0

    let temp = this.selectedGraphicsCard.videoPorts
      for(var i = 0; i < temp.length ; i++){
        this.graphicsVideoPorts.push(temp[i].id.videoPortsId)
    }
    this.monitors = []
    for (var i = 0; i < this.graphicsVideoPorts.length; i++) {

      var mon = await MonApi.getMonitors(this.graphicsVideoPorts[i])
      for(var j = 0 ; j < mon.length; j++ ){
        if(this.monitors.length < 1){
            this.monitors.push(mon[j])
            this.monitorId.push(mon[j].id)
            mon[j].quantity = 1;
        }
        else{ 
          if( !this.monitorId.includes(mon[j].id) ){
          this.monitors.push(mon[j])
          this.monitorId.push(mon[j].id)
          mon[j].quantity = 1;
          }   
        }
      }
    }
  },
  
  async getOnBoardMonitors(){
    this.monitors = []
    this.monitorId = []
    this.motherboardVideoPorts = []
    this.totalMonitors = 0

    let temp = this.currentlySelectedMotherboard.videoPorts
      for(var i = 0; i < temp.length ; i++){
        this.motherboardVideoPorts.push(temp[i].id.videoPortsId)
      }
      for (var i = 0; i < this.motherboardVideoPorts.length; i++) {

      var mon = await MonApi.getMonitors(this.motherboardVideoPorts[i])
      for(var j = 0 ; j < mon.length; j++ ){
        if(this.monitors.length < 1){
            this.monitors.push(mon[j])
            this.monitorId.push(mon[j].id)
            mon[j].quantity = 1;
        }
        else{ 
          if( !this.monitorId.includes(mon[j].id) ){
          this.monitors.push(mon[j])
          this.monitorId.push(mon[j].id)
          mon[j].quantity = 1;
          }   
        }
      }
    }
  },
  handleMonClick(mon){
    
    if(this.motherboardVideoPorts.length > 1 && 
      this.totalMotherboardVideoPorts >= this.totalMonitors){
        this.totalMonitors++;
        
        this.selectedMonitors.push(mon)
        this.monitors = this.monitors.filter((monitors) => {
          return mon.id != monitors.id
        });
      
    }
      else if(this.graphicsVideoPorts.length > 1 && 
          this.totalGraphicsCardVideoPorts >= this.totalMonitors){
            this.totalMonitors++;
            
            this.selectedMonitors.push(mon)
            this.monitors = this.monitors.filter((monitors) => {
              return mon.id != monitors.id
            });
      }
      else{
        alert('Cannot add more monitors a annot add more monitors, the maximum allowed quantity exceeded')
      }
   },
   removeSelectedMon(mon) {
    this.monitors.push(mon);
    this.totalMonitors = this.totalMonitors - mon.quantity
    this.selectedMonitors = this.selectedMonitors.filter((monitors) => {
      return mon.id != monitors.id
      });
   },
   increaseMonQuantity(mon){
     if(this.motherboardVideoPorts.length > 1 && 
      this.totalMotherboardVideoPorts > this.totalMonitors){
        
        mon.quantity++
        console.log(mon.quantity)
        this.totalMonitors++;
        
      }
      else if (this.graphicsVideoPorts.length> 1 && 
          this.totalGraphicsCardVideoPorts > this.totalMonitors){
            mon.quantity++
            this.totalMonitors++;
            
        }
      
      else { 
        alert('Cannot add more monitors, the maximum allowed quantity exceeded')
      }
    },
    decreaseMonQuantity(mon){
      console.log(mon.quantity)
      if(!mon.quantity == 1 ){
        mon.quantity--;
        this.totalMonitors--;  
      }
      else { 
        alert('Cannot decrease less than 1')
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
    totalMotherboardVideoPorts(){
      var totalMobVideoPorts = 0;
      let temp = this.currentlySelectedMotherboard.videoPorts
      for (var i = 0; i < temp.length; i++) {
        totalMobVideoPorts += temp[i].quantity
      }
      return totalMobVideoPorts
    },
    totalGraphicsCardVideoPorts(){
      var totalGraVideoPorts = 0;
      let temp = this.selectedGraphicsCard.videoPorts
      
      for (var i = 0; i < temp.length; i++) {
        totalGraVideoPorts += temp[i].quantity
        }
      return  totalGraVideoPorts
    } 
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
  justify-content: center;
  cursor: pointer;
}

#selected-memory-name {
  vertical-align: middle;
  margin-bottom: 0
}

#selected-memory-quantity {
  width: 80px;
  margin: 0px 20px 0px 20px;
  cursor: pointer;
}

.selected-mem-btn {
  margin:  0px 10px 0px 0px;
  cursor: pointer;
}
#CaseDropdown{
  margin: 20px 0px 0px 10px;
  cursor: pointer;
}

#GraphicsCardDropdown{
  margin: 20px 0px 10px 10px;
  cursor: pointer;
}
.selected-GraphicsCard-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center
}

#selected-GraphicsCard-name {
  vertical-align: middle;
  margin-bottom: 0
}

#selected-GraphicsCard-quantity {
  width: 80px;
  margin: 0px 20px 0px 20px
}

.selected-GraphicsCard-btn {
  margin:  0px 10px 0px 0px;
}

#monitorDropdown{

  margin: 10px 20px 10px 10px;
  cursor: pointer;
}

.selected-Monitors-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
