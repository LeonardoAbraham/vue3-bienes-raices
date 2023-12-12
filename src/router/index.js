import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path:'/admin/propiedades',
          name:'admin-propiedades',
          component: () => import('../views/admin/AdminView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path:'/admin/nueva',
          name:'nueva-propiedad',
          component: () => import('../views/admin/NuevaPropiedadView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path:'/admin/editar/:id',
          name:'editar-propiedad',
          component: () => import('../views/admin/EditarPropiedadView.vue'),
          meta: { requiresAuth: true },
        }
      ]
    }
  ]
})

//Guard de navegación
router.beforeEach((to, from, next)=> {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if(requiresAuth){
    //Comprobar que el usuario este autenticado
    
  }
  else {
    //No esta protegido, mostramos la vista
    next()
  }
})


export default router
