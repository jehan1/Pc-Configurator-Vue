<template>
  <div >
    <div id ="builder">
      <Motherboard 
      v-bind:motherboard="motherboard"
      @handle-mobo-click ="handleMoboClick"
      >
      </Motherboard>
      <Processor
      v-bind:processors="processors"
      v-bind:currentlySelectedMotherboard="currentlySelectedMotherboard"
      v-bind:display="display"
      @handle-pro-click ="handleProcClick"
      />
    
      <Memory
      v-bind:memory="memory"
      v-bind:selectedMemory="selectedMemory"
      v-bind:totalMem="totalMem"
      v-bind:currentlySelectedProcessor="currentlySelectedProcessor"
      v-bind:display="display"
      @handle-mem-click ="handleMemClick"
      @increase-mem-quantity ="increaseMemQuantity"
      @decrease-mem-quantity="decreaseMemQuantity"
      @remove-selected-mem="removeSelectedMem"
      />
    
      <storage
      v-bind:storage="storage"
      v-bind:selectedSt="selectedSt"
      v-bind:selectedMemory="selectedMemory" 
      v-bind:display="display"
      @handle-st-click ="handleStClick"
      @increase-st-quantity ="increaseStQuantity"
      @decrease-st-quantity="decreaseStQuantity"
      @remove-selected-st="removeSelectedSt"
      />

      <Mport
      v-bind:mPorts="mPorts"
      v-bind:selectedMports="selectedMports"
      v-bind:selectedSt="selectedSt"
      v-bind:display="display"
      @handle-mport-click ="handleMportClick"
      @increase-mport-quantity ="increaseMportQuantity"
      @decrease-mport-quantity="decreaseMportQuantity"
      @remove-selected-mport="removeSelectedMport"    
      />

      <Case
      v-bind:Case="Case"
      v-bind:selectedSt="selectedSt"
      v-bind:display="display"
      @handle-case-click ="handleCaseClick"
      />

      <GraphicsCard
      v-bind:graphicsCard="graphicsCard"
      v-bind:selectedGraphicsCard="selectedGraphicsCard"
      v-bind:currentlySelectedCase="currentlySelectedCase"
      v-bind:totalGcardQuantity="totalGcardQuantity"
      v-bind:display="display"
      @handle-gcard-click ="handleGcardClick"
      @increase-gcard-quantity ="increasegCardQuantity"
      @decrease-gcard-quantity="decreasegCardQuantity"
      @remove-selected-gcard="removeSelectedgCard"  
      />

      <Monitors
      v-bind:monitors="monitors"
      v-bind:selectedMonitors="selectedMonitors"
      v-bind:currentlySelectedCase="currentlySelectedCase"
      v-bind:display="display"
      @handle-mon-click ="handleMonClick"
      @increase-mon-quantity ="increaseMonQuantity"
      @decrease-mon-quantity="decreaseMonQuantity"
      @remove-selected-mon="removeSelectedMon"
      />
      <PowerSupply
      v-bind:powerSpplies="powerSpplies"
      v-bind:selectedPowerSupply="selectedPowerSupply"
      v-bind:currentlySelectedCase="currentlySelectedCase"
      v-bind:display="display"
      @handle-power-supply-click ="handlePowerSupplyClick" 
      />
      <Submit
      v-bind:selectedPowerSupply="selectedPowerSupply"
      @submit-btn ="submit" 
      />
     
    </div>
    <div  >
      <Display
      v-bind:currentlySelectedMotherboard="currentlySelectedMotherboard"
      v-bind:currentlySelectedProcessor="currentlySelectedProcessor"
      v-bind:selectedMemory="selectedMemory"
      v-bind:currentlySelectedCase="currentlySelectedCase"
      v-bind:selectedGraphicsCard="selectedGraphicsCard"
      v-bind:selectedSt="selectedSt"
      v-bind:selectedMports="selectedMports"
      v-bind:monitorId="monitorId"
      v-bind:selectedPowerSupply="selectedPowerSupply"
      v-bind:display="display"
      v-bind:graphicsVideoPorts="graphicsVideoPorts"
      v-bind:selectedMonitors="selectedMonitors"
      v-bind:totalGcardQuantity="totalGcardQuantity"/>
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
import StorageApi from '../services/api/Storage.js';
import MporteApi from '../services/api/Mports.js';
import PowerSApi from '../services/api/PowerSupply.js';

import Motherboard from './Motherboard.vue';
import Processor from './Processor.vue';
import Memory from './Memory.vue';
import Storage from './Storage.vue';
import Mport from './Mport.vue';
import Case from './Case.vue';
import GraphicsCard from './GraphicsCard.vue';
import Monitors from './Monitors.vue';
import PowerSupply from './PowerSupply.vue';
import Display from './Display.vue';
import Submit from './Submit.vue';




export default {
  name: 'Builder',
  components:{
    Motherboard,
    Processor,
    Memory,
    Storage,
    Mport,
    Case,
    GraphicsCard,
    Monitors,
    PowerSupply,
    Submit,
    Display
  },

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

    storage: [],
    selectedSt: [],
    totalStorage: 0,
    
    mPorts:[],
    mPortId:[],
    selectedMports:[],
    totalMports: 0,

    monitors:[],
    selectedMonitors:[],
    motherboardVideoPorts:[],
    graphicsVideoPorts:[],
    monitorId: [],
    totalMonitors: 0,

    powerSpplies: [],
    totalVoltage: 0,
    totalMolex: 0,
    selectedPowerSupply:{name: 'Select The Power Supply...'},

    display:0 
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
    this.selectedSt= [],
    this.selectedMports = []
    this.mPortId = [],
    this.mPorts = [],
    this.totalVoltage = 0,
    this.totalMolex = 0,
    this.selectedPowerSupply ={name: 'Select The Power Supply...'}
    this.display = 0 

    this.currentlySelectedMotherboard = mobo;

    this.processors = await ProcApi.getProcessors(
      this.currentlySelectedMotherboard.processorSocket.id);
      

    var apiMem = await MemApi.getMemory(
      this.currentlySelectedMotherboard.memoryType.id)
    for (var i = 0; i < apiMem.length; i++) {
      apiMem[i].quantity = 1;
    }
    this.memory = apiMem;

    var apiSto = await StorageApi.getStorageDrive()
    for (var i = 0; i < apiSto.length; i++) {
      apiSto[i].quantity = 1;
    }
    this.storage = apiSto;

    this.getMportsId()
    for(var i =0 ; i < this.mPortId.length ; i++){
      var temp = await MporteApi.getMports(this.mPortId[i])
        for (var j = 0; j < temp.length; j++) {
          temp[j].quantity = 1;
          this.mPorts.push(temp[j])
        }
    }
    this.Case = await CaseApi.getCase(this.currentlySelectedMotherboard.caseSize.size)
    
    this.getPciLaneId()
    
    
    for (var i = 0; i < this.PciLaneId.length; i++) {

     var gCards = await GcardApi.getGrCard(this.PciLaneId[i])
      for(var j = 0 ; j < gCards.length; j++ ){
        this.graphicsCard.push(gCards[j])
      }
    }

    this.getOnBoardMonitors()

    this.totalMolex = this.currentlySelectedMotherboard.molexConnectors.id
    

  },
  async handleProcClick(proc){
    this.currentlySelectedProcessor = proc;
    this.totalVoltage = this.currentlySelectedProcessor.voltage
    this.powerSpplies = await PowerSApi.getPowerSupplies(this.totalMolex,this.totalVoltage);
  }, 
  handleMemClick(mem) {
    this.selectedMemory = []
    
    this.totalQuantity++;
    this.selectedMemory.push(mem);
    this.memory = []
    
  },
  async removeSelectedMem(mem) {
    
    this.totalQuantity = this.totalQuantity - mem.quantity
    this.selectedMemory = []
     var apiMem = await MemApi.getMemory(
      this.currentlySelectedMotherboard.memoryType.id)
    for (var i = 0; i < apiMem.length; i++) {
      apiMem[i].quantity = 1;
    }
    this.memory = apiMem;
   
   
  },
  increaseMemQuantity(mem) {
    if ((this.totalMem + mem.capacity) > this.currentlySelectedMotherboard.maxMemory ||
        this.totalQuantity >= this.currentlySelectedMotherboard.noMemoryPorts) {
      
        this.$notify({
        group: 'error',
        type: 'warn',
        text: 'No more memory allowed'});
      
    }
    else {
      mem.quantity++;
      this.totalQuantity++;
      
    }
  },
  decreaseMemQuantity(mem) {
    if (mem.quantity == 1) {
      
      this.$notify({
        group: 'error',
        type: 'warn',
        text: 'QUANTITY CANNOT BE LESS THAN 1!'});
    }
    else {
      mem.quantity--;
      this.totalQuantity--;
    }
  },
  handleStClick(st){
    if(this.currentlySelectedMotherboard.noSataPorts > this.selectedSt.length){
      this.selectedSt.push(st)
      this.totalStorage++
      this.storage = this.storage.filter((storage) => {
        return st.id != storage.id
      });
    }
    else{
      
      this.$notify({
        group: 'error',
        type: 'warn',
        text: 'Maximum storage drives'});
    }
  },
  increaseStQuantity(st){
     if(this.currentlySelectedMotherboard.noSataPorts > this.totalStorage){
      this.totalStorage++
      st.quantity++
     }
    else{
      this.$notify({
        group: 'error',
        type: 'warn',
        text: 'Maximum storage drives'});
    
    }
  },
  decreaseStQuantity(st){
    if(st.quantity ==1){
     this.$notify({
        group: 'error',
        type: 'warn',
        text: 'QUANTITY CANNOT BE LESS THAN 1!'});
    }
    else{
      st.quantity--
      this.totalStorage--
    }
  },
  removeSelectedSt(st){
    this.storage.push(st);
    this.totalStorage = this.totalStorage - st.quantity
    this.selectedSt = this.selectedSt.filter((storage) => {
      return st.id != storage.id
   });
  },
  getMportsId(){
    var temp = this.currentlySelectedMotherboard.portM
    for(var i = 0; i < temp.length ; i++){
      this.mPortId.push(temp[i].id.portMId)
    }
  }, 
  handleMportClick(mp){
     
     var temp = this.currentlySelectedMotherboard.portM
     var portId= null
     for(var i =0 ; i < temp.length ; i++){
       if(temp[i].id.portMId == mp.portsM.id){
        portId = temp[i] 
       }
     }
      
      if( portId.quantity >= mp.quantity ){
          
        this.selectedMports.push(mp)
        this.totalMports++

        this.mPorts = this.mPorts.filter((mPorts) => {
          return mp.portsM.id != mPorts.portsM.id
        });
      }
  },
  increaseMportQuantity(sMports){
    var temp = this.currentlySelectedMotherboard.portM
    var portId= null
    for(var i =0 ; i < temp.length ; i++){
      if(temp[i].id.portMId == sMports.portsM.id){
        portId = temp[i]
       }
      }
    
      if(portId.quantity > sMports.quantity){
        this.totalMports++
        sMports.quantity++
      }
      else{
        this.$notify({
        group: 'error',
        type: 'warn',
        text: 'Maximum M.2 ports allowed'});
      }   
  },

  decreaseMportQuantity(sMports){
    if(sMports.quantity ==1){
      this.$notify({
        group: 'error',
        type: 'warn',
        text: 'QUANTITY CANNOT BE LESS THAN 1!'});
    }
    else{
      sMports.quantity--
      
    }
  },
  async removeSelectedMport(sMports){
 
    var temp = await MporteApi.getMports(sMports.portsM.id)
    for(var i = 0; i < temp.length; i++){
      temp[i].quantity = 1;
      this.mPorts.push(temp[i])
    }
    this.selectedMports = this.selectedMports.filter((mPorts) => {
      return sMports.id != mPorts.id
    });
   
  },

  handleCaseClick(c){
    this.currentlySelectedCase= c ;
  },
  async handleGcardClick(gCard){
    this.totalGcardQuantity = 0;
    this.selectedGraphicsCard= null
    this.totalGcardQuantity++;
    this.selectedGraphicsCard = gCard;
    this.powerSpplies=[]
  
    this.getGraphicsCardMonitors();
    this.totalVoltage = parseInt(this.totalVoltage) + parseInt(this.selectedGraphicsCard.voltage)
    this.totalMolex = parseInt(this.totalMolex) + parseInt(this.selectedGraphicsCard.molexConnectors.id)

    this.powerSpplies = await PowerSApi.getPowerSupplies(this.totalMolex,this.totalVoltage);


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
              this.$notify({
        group: 'error',
        type: 'warn',
        text: 'quantity exceeded'});
            }          
        }  
    }
  },
  decreasegCardQuantity(selectedGraphicsCard){
    if (this.totalGcardQuantity == 1) {
      this.$notify({
        group: 'error',
        type: 'warn',
        text: 'QUANTITY CANNOT BE LESS THAN 1!'});
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
        mon[j].quantity = 1;
        if(this.monitors.length < 1){
            this.monitors.push(mon[j])
            this.monitorId.push(mon[j].id)
            
        }
        else{ 
          if( !this.monitorId.includes(mon[j].id) ){
          this.monitors.push(mon[j])
          this.monitorId.push(mon[j].id)
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
        mon[j].quantity = 1;
        if(this.monitors.length < 1){
            this.monitors.push(mon[j])
            this.monitorId.push(mon[j].id)
            
        }
        else{ 
          if( !this.monitorId.includes(mon[j].id) ){
          this.monitors.push(mon[j])
          this.monitorId.push(mon[j].id)
          }   
        }
      }
    }
  },
  handleMonClick(mon){
    
    if(this.motherboardVideoPorts.length > 1 && 
      this.totalMotherboardVideoPorts > this.totalMonitors){
        this.totalMonitors++;
        
        this.selectedMonitors.push(mon)
        this.monitors = this.monitors.filter((monitors) => {
          return mon.id != monitors.id
        });
      
    }
      else if(this.graphicsVideoPorts.length > 1 && 
          this.totalGraphicsCardVideoPorts > this.totalMonitors){
            this.totalMonitors++;
            
            this.selectedMonitors.push(mon)
            this.monitors = this.monitors.filter((monitors) => {
              return mon.id != monitors.id
            });
      }
      else{
        
        this.$notify({
        group: 'error',
        type: 'warn',
        text: 'Cannot add more monitors, the maximum allowed quantity exceeded'});
      }

   },
   removeSelectedMon(mon) {
    this.monitors.push(mon);
    this.totalMonitors = this.totalMonitors - mon.quantity 
    mon.quantity = 1
    this.selectedMonitors = this.selectedMonitors.filter((monitors) => {
      return mon.id != monitors.id
      });
   },
   increaseMonQuantity(mon){
     var mbTemp = this.currentlySelectedMotherboard.videoPorts //motherboard video ports
     var mTemp = mon.videoPort //monitor video ports
     var gTemp = this.selectedGraphicsCard.videoPorts
      
    if (this.motherboardVideoPorts.length > 1 && 
      this.totalMotherboardVideoPorts > this.totalMonitors){
      outerloop: for(var i = 0; i < mbTemp.length; i ++){
        for(var j = 0; j < mTemp.length; j++ ){
          if(mbTemp[i].id.videoPortsId == mTemp[j].id &&
            mbTemp[i].quantity >= mon.quantity){  
              mon.quantity++
              this.totalMonitors++; 
  
              break outerloop;
            }
          }
      }
    }  
     
    else if (this.graphicsVideoPorts.length > 1 && 
      this.totalGraphicsCardVideoPorts > this.totalMonitors){
      outerloop: for(var i = 0; i < gTemp.length; i ++){
        for(var j = 0; j < mTemp.length; j++ ){
          if(gTemp[i].id.videoPortsId == mTemp[j].id &&
            gTemp[i].quantity >= mon.quantity){
            
              mon.quantity++
              this.totalMonitors++; 
  
              break outerloop;
  
            }
          }
      }
    }
      else {
            this.$notify({
        group: 'error',
        type: 'warn',
        text: 'Cannot add more monitors, the maximum allowed quantity exceeded'});
      }

          

    },
    
    decreaseMonQuantity(mon){
      if(mon.quantity == 1 ){
      
        this.$notify({
        group: 'error',
        type: 'warn',
        text: 'QUANTITY CANNOT BE LESS THAN 1!'}); 
      }
      else { 
        mon.quantity--;
        this.totalMonitors--; 
      }  
    },
    handlePowerSupplyClick(ps){
      this.selectedPowerSupply = ps;
    },
    submit(hh){
      console.log(hh)
          if (hh == 1){
            this.display =1}
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
    },
  } 
}

</script>

<style >

#builder{
  position: relative;
  width: 50%;
  float: left;
  height: 100%;
  z-index: 1010101010;
  overflow: auto;
  min-height: 90vh;
  max-height: 90vh;
}

</style>
