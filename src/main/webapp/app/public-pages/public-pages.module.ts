import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.GymHomeModule)
      },
      {
        path: 'about-us',
        loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule)
      },
      {
        path: 'gym',
        loadChildren: () => import('./the-gym-room/the-gym-room.module').then(m => m.TheGymRoomModule)
      },
      {
        path: 'nutrition',
        loadChildren: () => import('./nutrition/nutrition.module').then(m => m.NutritionModule)
      }
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PublicPagesModule {}
