import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import UserList from '@/components/user/list'

import DataSourceList from '@/components/data-source/list'
import DataSourceAdd from '@/components/data-source/add'

import MenuList from '@/components/menu/list'
import Component from '@/components/component/component'
import Preview from '@/components/preview/preview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main
    },
    {
      path: '/main',
      component: Main,
      children: [
        {
          path: 'user-list',
          component: UserList,
        },
        {
          path: '',
          component: DataSourceList,
        },
        {
          path: 'data-source',
          component: DataSourceList,
        },
        {
          path: 'data-source/list',
          component: DataSourceList,
        },
        {
          path: 'data-source/add',
          component: DataSourceAdd,
        },
        {
          path: "menu",
          component: MenuList
        },
        {
          path: "component",
          component: Component
        },
        {
          path: "preview",
          component: Preview
        },
      ]
    }
  ]
})
