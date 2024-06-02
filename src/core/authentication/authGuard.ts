import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuth } from '@/core/authentication/composables/useAuth';
import { UserRole } from '@/core/enums/UserRole';
import { PathConstants } from '@/core/constants/path.constants';
import { snackBarEventBus } from '@/shared/snackbar/snackBarEventBus.ts';

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const { authData, redirectUrl, checkAccess } = useAuth();

  const user = authData.value;
  const expectedRoles: UserRole[] = to.meta.expectedRoles as UserRole[];

  if (!to.meta.requiresAuth) {
    next();
  } else if (to.meta.requiresAuth && !user) {
    snackBarEventBus.showSnackbar({
      message: 'Login to access this page.',
      type: 'error',
    });
    redirectUrl.value = to.fullPath;
    next(PathConstants.LOGIN_PATH);
  } else if (expectedRoles && !checkAccess(expectedRoles)) {
    snackBarEventBus.showSnackbar({
      message: 'You are not authorized to enter this route!',
      type: 'error',
    });
    next(PathConstants.LOGIN_PATH);
  } else {
    next();
  }
};
