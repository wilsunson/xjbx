import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueSignaturePad from 'vue-signature-pad'
import EventProxy from 'vue-event-proxy'
import CKEditor from '@ckeditor/ckeditor5-vue'
import './styles.scss'
import './plugins/element.js'


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueSignaturePad);
Vue.use(EventProxy);
Vue.use(CKEditor);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
