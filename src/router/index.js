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
import staffCheck from '../components/staff/staffCheck.vue'
import checkOfStaff from '../components/staff/check.vue'
import managerCheck from '../components/manager/managerCheck.vue'
import managerPassActivityView from '../components/manager/managerPassActivityView.vue'
import addAccount from '../components/manager/addAccount.vue'
import allActivityOfTeacher from '../components/teacher/allActivityOfTeacher.vue'
import activityToBeTeahcer from '../components/teacher/activityToBeTeahcer.vue'
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
      { path: '/createAct', component: createAct},
      { path: '/staffCheck', component: staffCheck},
      { path: '/checkOfStaff', component: checkOfStaff},
      { path: '/managerCheck', component: managerCheck},
      { path: '/managerPassActivityView', component: managerPassActivityView},
      { path: '/addAccount', component: addAccount},
      { path: '/allActivityOfTeacher', component: allActivityOfTeacher},
      { path: '/activityToBeTeahcer', component: activityToBeTeahcer},
    ]
  },
]

const router = new VueRouter({
  routes
})
// ????????????????????????
router.beforeEach((to, from, next) => {
  // to ?????????????????????
  // from ?????????????????????????????????
  // next ??????????????????????????????
  //     next()  ??????    next('/login')  ????????????

  if (to.path === '/login' || to.path === '/register') return next()
  // ??????token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
