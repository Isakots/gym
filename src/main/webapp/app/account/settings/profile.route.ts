import {Route} from '@angular/router';

import {UserRouteAccessService} from 'app/core';
import {ProfileComponent} from 'app/account';

export const profileRoute: Route = {
  path: 'settings',
  component: ProfileComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'global.menu.account.settings'
  },
  canActivate: [UserRouteAccessService]
};
