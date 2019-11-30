import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'nutrition',
          loadChildren: () => import('./public-pages/nutrition/nutrition.module').then(m => m.NutritionModule)
        },
        {
          path: 'gym',
          loadChildren: () => import('./public-pages/the-gym-room/the-gym-room.module').then(m => m.TheGymRoomModule)
        },
        {
          path: 'about-us',
          loadChildren: () => import('./public-pages/about-us/about-us.module').then(m => m.AboutUsModule)
        },
        {
          path: 'admin',
          loadChildren: () => import('./admin/admin.module').then(m => m.GymAdminModule)
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class GymAppRoutingModule {}
