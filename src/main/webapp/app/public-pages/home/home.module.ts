import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GymSharedModule } from 'app/shared';
import { GymArticleModule } from 'app/entities/article/article.module';
import { TimelineComponent } from 'app/public-pages/home/timeline/timeline.component';
import { HOME_ROUTE } from 'app/public-pages/home/home.route';
import { HomeComponent } from 'app/public-pages/home/home.component';

@NgModule({
  imports: [GymSharedModule, RouterModule.forChild([HOME_ROUTE]), GymArticleModule],
  exports: [HomeComponent, TimelineComponent],
  declarations: [HomeComponent, TimelineComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GymHomeModule {}
