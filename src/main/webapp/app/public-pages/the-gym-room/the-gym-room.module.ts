import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GymSharedModule } from 'app/shared';
import { TheGymRoomComponent } from 'app/public-pages/the-gym-room/the-gym-room.component';
import { theGymRoomRoute } from 'app/public-pages/the-gym-room/the-gym-room.route';

const ENTITY_STATES = [...theGymRoomRoute];

@NgModule({
  imports: [GymSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [TheGymRoomComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TheGymRoomModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
