<template>

 <div id="GraphicsCardDropdown">
      <b-dropdown variant="outline-success" v-if="this.currentlySelectedCase.id != null "
                id="dropdown-2" :text="selectedGraphicsCard.name" class="m-md-2">
      <b-dropdown-item v-for=" gCard in graphicsCard" v-bind:key="gCard.id"
                       v-on:click="handleGcardClick(gCard)">
        {{ gCard.name}}
      </b-dropdown-item>
    </b-dropdown>

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
    
</template>

<script>
export default {
    name: 'GraphicsCard',

    props:{
        graphicsCard: Array,
        selectedGraphicsCard: Object,
        currentlySelectedCase: Object,
        totalGcardQuantity: Number
    },

    methods:{
        handleGcardClick(gCard){
            this.$emit('handle-gcard-click',gCard)
        },

        increasegCardQuantity(selectedGraphicsCard){
            this.$emit('increase-gcard-quantity',selectedGraphicsCard)
        },

        decreasegCardQuantity(selectedGraphicsCard){
            this.$emit('decrease-gcard-quantity',selectedGraphicsCard)
        },

        removeSelectedgCard(selectedGraphicsCard){
            this.$emit('remove-selected-gcard',selectedGraphicsCard)
        }
    }
}
</script>

<style scoped>

#GraphicsCardDropdown{
  margin: 20px 0px 0px 0px;
  cursor: pointer;
}
.selected-GraphicsCard-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
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

</style>

