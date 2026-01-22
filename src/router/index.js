import { createRouter, createWebHistory } from 'vue-router'

const PublicLayout = () => import('../layouts/PublicLayout.vue')

const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: '', component: () => import('../views/public/Home.vue') },
      { path: 'products', component: () => import('../views/public/products/ProductList.vue') },
      { path: 'products/:id', component: () => import('../views/public/products/ProductDetail.vue') },

      { path: 'news', component: () => import('../views/public/news/NewsList.vue') },
      { path: 'news/:id', component: () => import('../views/public/news/NewsDetail.vue') },

      { path: 'videos', component: () => import('../views/public/videos/VideoList.vue') },
      { path: 'videos/:id', component: () => import('../views/public/videos/VideoDetail.vue') },

      { path: 'papers', component: () => import('../views/public/papers/PaperList.vue') },
      { path: 'papers/:id', component: () => import('../views/public/papers/PaperDetail.vue') },

      { path: 'stats', component: () => import('../views/public/Stats.vue') },
      { path: 'support', component: () => import('../views/public/Support.vue') },
    ],
  },

  { path: '/login', component: () => import('../views/auth/Login.vue') },
  { path: '/register', component: () => import('../views/auth/Register.vue') },
  { path: '/me', component: () => import('../views/user/Me.vue') },

  {
    path: '/admin',
    component: () => import('../views/admin/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('../views/admin/Dashboard.vue') },
      { path: 'products', component: () => import('../views/admin/products/AdminProducts.vue') },
      { path: 'news', component: () => import('../views/admin/news/AdminNews.vue') },
      { path: 'videos', component: () => import('../views/admin/videos/AdminVideos.vue') },
      { path: 'papers', component: () => import('../views/admin/papers/AdminPapers.vue') },
    ],
  },

  { path: '/:pathMatch(.*)*', component: () => import('../views/NotFound.vue') },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
