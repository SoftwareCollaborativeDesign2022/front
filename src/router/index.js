import Vue from 'vue'
import VueRouter from 'vue-router'
import userLogin from '../components/userLogin.vue'
import Home from '../components/userHome.vue'
import Welcome from '../components/userWelcome.vue'
import allActivity from '../components/allActivity.vue'
import userModify from '../components/userModify.vue'
import userRegister from '../components/userRegister.vue'
import teacherActivityList from '../components/teacher/teacherActivityList.vue'
import activityInfo from '../components/teacher/activityInfo.vue'
import toBeTeacher from '../components/student/toBeTeacher.vue'
import activityInfoForSignUp from '../components/activityInfoForSignUp.vue'
import activityInfoForTeacher from '../components/teacher/activityInfo.vue'
import createAct from '../components/organization/createAct.vue'
Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/login' },
  { path: '/login', component: userLogin },
  { path: '/register', component: userRegister },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/allActivity', component: allActivity },
      { path: '/userModify', component: userModify },
      { path: '/teacherActivityList', component: teacherActivityList },
      { path: '/toActivityInfo', component: activityInfo },
      { path: '/toBeTeacher', component: toBeTeacher},
      { path: '/activityInfoForSignUp', component: activityInfoForSignUp},
      { path: '/activityInfoForTeacher', component: activityInfoForTeacher},
      { path: '/createAct', component: createAct}
    ]
  },
]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login' || to.path === '/register') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
