// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'font-awesome/css/font-awesome.css'
import 'element-ui/lib/theme-chalk/index.css'
import Loading from './plugins/loading.js'
import './plugins/loading.css'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import index from './index'
import store from '../src/components/store'

Vue.use(ElementUI)
Vue.use(iView)
Vue.use(Loading)
Vue.use(index)

Vue.config.productionTip = false

import ContentHeader from "./components/common/content-header";
import SearchForm from "./components/common/search-form";
import ContentBody from "./components/common/content-body";
import Table from "./components/common/table";

Vue.component("ContentHeader", ContentHeader)
Vue.component("SearchForm", SearchForm)
Vue.component("ContentBody", ContentBody)
Vue.component("my-table", Table)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
