import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/index",
    redirect: "/"
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/detailed/:id',
    name: 'DetailedId',
    component: () => import('../views/Detailed.vue')
  }, {
    path: '/detailed',
    name: 'Detailed',
    component: () => import('../views/About.vue')
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    // beforeEnter: (to, from, next) => {
    //   let token2 = JSON.stringify(sessionStorage.getItem('userTokenLong'))
    //   // console.log(to, from, next)
    //   if (token2 == 'null' || token2 == '') {
    //   let token = localStorage.getItem('userToken');

    //     console.log(token)
    //     // if (token != 'null' || token != '' ) {
    //     //   next()
    //     // }else{
    //     //   next('/')
    //     // }
    //     next()
    //   } else {
    //     next('/')
    //     // console.log(123);
    //   }
    // }
  }, {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  }, {
    path: '/resetsPass',
    name: 'resetsPass',
    component: () => import('../views/PasswordResets.vue')
  },
  {
    path: '/resets/:id/:url',
    name: 'Resets',
    component: () => import('../views/Resets.vue')
  },
  {path:'/user',
  name:'UserInfo',
  component:()=>import('../views/UserInfo.vue')
}
]





const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//导航守卫,验证是否登录
router.beforeEach((to, from, next) => {
  // console.log(token)
  if (to.path === '/login' || to.path === '/register') {
    // let token = localStorage.getItem('userToken');
    // if (token == 'null' || token == '') {
    next();
    // } else {
    // next('/')
    // }

  } else {
    let token = localStorage.getItem('userToken')?localStorage.getItem('userToken'):sessionStorage.getItem('userTokenLong');
    if (token == 'null' || token == '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router