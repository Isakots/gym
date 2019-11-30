import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from 'app/public-pages/about-us/about-us.component';
import { TheGymRoomComponent } from 'app/public-pages/the-gym-room/the-gym-room.component';
import { NutritionComponent } from 'app/public-pages/nutrition/nutrition.component';
import { HomeComponent } from 'app/public-pages/home/home.component';

const routes: Routes = [
  {
    path: '',
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicPagesRoutingModule {}
