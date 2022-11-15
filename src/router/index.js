import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    children: [
      {
        path: '/',
        name: 'Step1Page',
        component: () => import(/* webpackChunkName: "Step1Page" */ '../views/Step1Page.vue'),
      },
    ],
  },
  {
    path: '/history',
    name: 'History',
    component: () => import(/* webpackChunkName: "HistoryPage" */ '../views/HistoryPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
