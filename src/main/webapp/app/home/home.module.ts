import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GymSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { GymArticleModule } from 'app/entities/article/article.module';

@NgModule({
  imports: [GymSharedModule, RouterModule.forChild([HOME_ROUTE]), GymArticleModule],
  declarations: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GymHomeModule {}
