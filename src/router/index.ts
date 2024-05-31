import { createRouter, createWebHistory } from 'vue-router';
import { PathConstants } from '@/core/constants/path.constants.ts';
import Home from '@/features/homepage/pages/Home.vue';
import Doctors from '@/features/doctors/pages/Doctors.vue';
import Login from '@/features/auth/login/pages/Login.vue';
import MyAppointments from '@/features/my-appointments/pages/MyAppointments.vue';
import { authGuard } from '@/core/authentication/authGuard.ts';

const routes = [
  {
    path: PathConstants.HOME_PATH,
    name: 'Home',
    component: Home,
  },
  {
    path: PathConstants.LOGIN_PATH,
    name: 'Login',
    component: Login,
  },
  {
    path: PathConstants.DOCTORS_PATH,
    name: 'Doctors',
    component: Doctors,
  },
  {
    path: PathConstants.MY_APPOINTMENTS_PATH,
    name: 'My Appointments',
    component: MyAppointments,
    beforeEnter: authGuard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
