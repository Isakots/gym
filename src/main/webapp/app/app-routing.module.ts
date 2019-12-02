import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { AboutUsComponent } from 'app/public-pages/about-us/about-us.component';
import { TheGymRoomComponent } from 'app/public-pages/the-gym-room/the-gym-room.component';
import { NutritionComponent } from 'app/public-pages/nutrition/nutrition.component';
import { HomeComponent } from 'app/public-pages/home/home.component';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'gym',
    component: TheGymRoomComponent
  },
  {
    path: 'nutrition',
    component: NutritionComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.GymAdminModule)
  },
  ...LAYOUT_ROUTES
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GymAppRoutingModule {}
