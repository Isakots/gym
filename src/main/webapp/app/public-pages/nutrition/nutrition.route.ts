import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { NutritionComponent } from 'app/public-pages/nutrition/nutrition.component';

export const nutritionRoutes: Routes = [
  {
    path: '',
    component: NutritionComponent,
    data: {
      authorities: [],
      pageTitle: 'gymApp.tool.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
