import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GymSharedModule } from 'app/shared';
import { HOME_ROUTE } from 'app/public-pages/home/home.route';
import { HomeComponent } from 'app/public-pages/home/home.component';
import { TimelineComponent } from 'app/public-pages/home/timeline/timeline.component';

@NgModule({
  imports: [GymSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent, TimelineComponent],
  exports: [HomeComponent, TimelineComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GymHomeModule {}
