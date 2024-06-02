import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { PathConstants } from '@/core/constants/path.constants.ts';
import Home from '@/features/homepage/pages/Home.vue';
import Doctors from '@/features/doctors/pages/Doctors.vue';
import Login from '@/features/auth/login/pages/Login.vue';
import MyAppointments from '@/features/my-appointments/pages/MyAppointments.vue';
import { authGuard } from '@/core/authentication/authGuard.ts';
import Registration from '@/features/auth/registration/pages/Registration.vue';
import ManageUsers from '@/features/manage-users/pages/ManageUsers.vue';
import { UserRole } from '@/core/enums/UserRole.ts';
import ManageAppointments from '@/features/manage-appointments/pages/ManageAppointments.vue';
import DoctorDetails from '@/features/doctors/pages/DoctorDetails.vue';

export type RouteMeta = {
  requiresAuth: boolean;
  roles: UserRole[];
};

const routes: RouteRecordRaw[] = [
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
    path: PathConstants.REGISTER_PATH,
    name: 'Register',
    component: Registration,
  },
  {
    path: PathConstants.DOCTORS_PATH,
    name: 'Doctors',
    component: Doctors,
  },
  {
    path: PathConstants.DOCTOR_DETAILS_PATH,
    name: 'Doctor Details',
    component: DoctorDetails,
  },
  {
    path: PathConstants.MY_APPOINTMENTS_PATH,
    name: 'My Appointments',
    component: MyAppointments,
    beforeEnter: authGuard,
    meta: <RouteMeta>{ requiresAuth: true },
  },
  {
    path: PathConstants.MANAGE_APPOINTMENTS_PATH,
    name: 'Manage Appointments',
    component: ManageAppointments,
    beforeEnter: authGuard,
    meta: <RouteMeta>{
      requiresAuth: true,
      roles: [UserRole.DOCTOR, UserRole.REGISTRAR],
    },
  },
  {
    path: PathConstants.MANAGE_USERS_PATH,
    name: 'Manage Users',
    component: ManageUsers,
    beforeEnter: authGuard,
    meta: <RouteMeta>{
      requiresAuth: true,
      roles: [UserRole.DOCTOR, UserRole.ADMIN, UserRole.REGISTRAR],
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
