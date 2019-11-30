import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GymSharedModule } from 'app/shared';
import { NutritionComponent } from 'app/public-pages/nutrition/nutrition.component';
import { nutritionRoutes } from 'app/public-pages/nutrition/nutrition.route';

const ENTITY_STATES = [...nutritionRoutes];

@NgModule({
  imports: [GymSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [NutritionComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NutritionModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
