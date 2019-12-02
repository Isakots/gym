import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PublicPagesRoutingModule } from 'app/public-pages/public-pages-routing.module';
import { GymSharedModule } from 'app/shared';
import { PublicPagesComponent } from 'app/public-pages/public-pages.component';
import { NutritionComponent } from 'app/public-pages/nutrition/nutrition.component';

@NgModule({
  imports: [PublicPagesRoutingModule, GymSharedModule],
  declarations: [PublicPagesComponent, NutritionComponent],
  entryComponents: [],
  providers: [],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PublicPagesModule {}
