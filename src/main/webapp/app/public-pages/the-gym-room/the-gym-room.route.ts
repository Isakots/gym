import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { TheGymRoomComponent } from 'app/public-pages/the-gym-room/the-gym-room.component';

export const theGymRoomRoute: Routes = [
  {
    path: '',
    component: TheGymRoomComponent,
    data: {
      authorities: [],
      pageTitle: 'gymApp.tool.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
