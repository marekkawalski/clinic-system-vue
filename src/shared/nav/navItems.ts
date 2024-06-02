import { PathConstants } from '@/core/constants/path.constants.ts';
import { UserRole } from '@/core/enums/UserRole.ts';
import { NavItemModel } from '@/shared/nav/models/NavItemModel.ts';

export const navItems: NavItemModel[] = [
  {
    listItemText: 'Home',
    listItemPath: PathConstants.HOME_PATH,
    requireLogin: false,
  },
  {
    listItemText: 'Doctors',
    listItemPath: PathConstants.DOCTORS_PATH,
    requireLogin: false,
  },
  {
    listItemText: 'My appointments',
    listItemPath: PathConstants.MY_APPOINTMENTS_PATH,
    requireLogin: true,
  },
  {
    listItemText: 'Manage users',
    listItemPath: PathConstants.MANAGE_USERS_PATH,
    requireLogin: true,
    allowedRoles: [UserRole.ADMIN, UserRole.REGISTRAR, UserRole.DOCTOR],
  },
  {
    listItemText: 'Manage appointments',
    listItemPath: PathConstants.MANAGE_APPOINTMENTS_PATH,
    requireLogin: true,
    allowedRoles: [UserRole.DOCTOR],
  },
];
