import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/* fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faMinus, faPlus)

Vue.component('fa-icon', FontAwesomeIcon)
/*   */

Vue.use(BootstrapVue)
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
