import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { AboutUsComponent } from 'app/public-pages/about-us/about-us.component';

export const aboutUsRoute: Routes = [
  {
    path: '',
    component: AboutUsComponent,
    data: {
      authorities: [],
      pageTitle: 'gymApp.tool.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
