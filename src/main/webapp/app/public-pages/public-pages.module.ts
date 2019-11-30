import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PublicPagesRoutingModule } from 'app/public-pages/public-pages-routing.module';
import { GymSharedModule } from 'app/shared';
import { PublicPagesComponent } from 'app/public-pages/public-pages.component';
import { AboutUsComponent } from 'app/public-pages/about-us/about-us.component';
import { TheGymRoomComponent } from 'app/public-pages/the-gym-room/the-gym-room.component';
import { NutritionComponent } from 'app/public-pages/nutrition/nutrition.component';
import { HomeComponent } from 'app/public-pages/home/home.component';
import { TimelineComponent } from 'app/public-pages/home/timeline/timeline.component';

@NgModule({
  imports: [PublicPagesRoutingModule, GymSharedModule],
  declarations: [HomeComponent, TimelineComponent, PublicPagesComponent, AboutUsComponent, TheGymRoomComponent, NutritionComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PublicPagesModule {}
