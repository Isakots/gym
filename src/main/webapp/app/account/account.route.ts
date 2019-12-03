import {Routes} from '@angular/router';

import {
    activateRoute,
    passwordResetFinishRoute,
    passwordResetInitRoute,
    passwordRoute,
    profileRoute,
    registerRoute
} from './';

const ACCOUNT_ROUTES = [activateRoute, passwordRoute, passwordResetFinishRoute, passwordResetInitRoute, registerRoute, profileRoute];

export const accountState: Routes = [
  {
    path: '',
    children: ACCOUNT_ROUTES
  }
];
