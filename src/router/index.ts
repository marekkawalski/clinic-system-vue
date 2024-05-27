import { createRouter, createWebHistory } from 'vue-router';
import { PathConstants } from '@/core/constants/path.constants.ts';
import Home from '@/features/homepage/pages/Home.vue';

const routes = [
  {
    path: PathConstants.HOME_PATH,
    name: 'Home',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
