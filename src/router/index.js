import store from '../store'
import Vue from 'vue'
import Router from 'vue-router'
import InitApp from '@/components/initApp'
import LoginPage from '@/components/loginPage'
import error404 from '@/components/404'
import ListGuru from '@/components/guru.vue'
import ListStudent from '@/components/student.vue'
import Kelas from '@/components/kelas.vue'
import Subject from '@/components/matapelajaran.vue'
import Dashboard from '@/components/dashboard.vue'
import Settings from '@/components/settings.vue'
import JenisPenilaian from '@/components/jenisPenilaian.vue'
import Penilaian from '@/components/penilaian.vue'
import Laporan from '@/components/laporan.vue'


Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      meta: {
        public: true
      }
    },
    {
      path: '/init',
      name: 'Init App',
      component: InitApp,
      meta: {
        public: true
      },
      // beforeEnter (to, from, next) {
      //   if (store.getters['school/schoolData']) {
      //     router.push('login')
      //   }
      // }
    },
    {
      path: '/admin/guru',
      name: 'List Guru',
      component: ListGuru
    },
    {
      path: '/admin/guru/mapel/:id',
      component: ListGuru
    },
    {
      path: '/admin/kelas',
      name: 'List Kelas',
      component: Kelas
    },
    {
      path: '/admin/matapelajaran',
      name: 'List Mata Pelajaran',
      component: Subject
    },
    {
      path: '/admin',
      component: LoginPage,
      redirect: {
        path: '/admin/guru'
      }
    },
    {
      path: '/admin/siswa',
      component: ListStudent
    },
    {
      path: '/admin/siswa/kelas/:id',
      component: ListStudent
    },
    {
      path: '/admin/penilaian',
      component: Penilaian
    },
    {
      path: '/admin/laporan',
      component: Laporan
    },
    {
      path: '/admin/jenispenilaian',
      component: JenisPenilaian
    },
    {
      path: '/admin/settings',
      component: Settings
    },
    {
      path: '/admin/*',
      redirect: {
        path: '/admin/guru'
      }
    },
    {
      path: '*',
      meta: {
        public: true
      },
      redirect: {
        path: '/404'
      }
    },
    {
      path: '/404',
      meta: {
        public: true,
        title: 'page404'
      },
      name: 'NotFound',
      component: error404
    }
  ]
})



export default router
