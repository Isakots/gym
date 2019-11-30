import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

const routes: Routes = [
  {
    path: '',
    loadChildren: './public-pages/public-pages.module#PublicPagesModule'
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.GymAdminModule)
  },
  ...LAYOUT_ROUTES
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: DEBUG_INFO_ENABLED,
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class GymAppRoutingModule {}
