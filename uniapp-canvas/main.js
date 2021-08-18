import Vue from 'vue'
import App from './App'


import CanvasDialog from './components/canvas-dialog/canvas-dialog.vue'
import CanvasDialog2 from './components/canvas-dialog2/canvas-dialog2.vue'

Vue.component('canvas-dialog2',CanvasDialog2)
Vue.component('canvas-dialog',CanvasDialog)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
