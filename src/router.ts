import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path:'/manage',
      name:'manage',
      redirect:'/manage/about',
      component:()=>import('@/views/manage.vue'),
      children:[ {
        path: 'about',
        name: 'about',
        meta:['ma','ab'],
        component: () => require.ensure([],()=>require('@/views/About.vue'))
      },
      {
        path: 'input',
        name: 'input',
        meta:['ma','ip'],
        component: () => require.ensure([],()=>require('@/views/input.vue'))
      },
      {
        path: 'call',
        name: 'call',
        meta:['ca','ip'],
        component: () => require.ensure([],()=>require('@/views/call.vue'))
      },
    ]
    },
   
  ]
})
