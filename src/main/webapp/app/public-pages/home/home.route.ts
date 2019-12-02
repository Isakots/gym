import { Route } from '@angular/router';
import { HomeComponent } from 'app/public-pages/home/home.component';

export const HOME_ROUTE: Route = {
  path: '',
  component: HomeComponent,
  data: {
    authorities: [],
    pageTitle: 'home.title'
  }
};
