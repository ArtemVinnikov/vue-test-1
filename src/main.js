import Vue from 'vue'

import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue';
import DataPage from './components/DataPage.vue'
import UserPage from './components/UserPage.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/data', component: DataPage },
    { path: '/users/:id', component: UserPage }
  ]
})

new Vue({
	render: h => h(App),
  router
}).$mount('#app')
