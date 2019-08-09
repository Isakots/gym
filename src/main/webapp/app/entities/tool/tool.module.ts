import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GymSharedModule } from 'app/shared';
import {
  ToolComponent,
  ToolDeleteDialogComponent,
  ToolDeletePopupComponent,
  ToolDetailComponent,
  toolPopupRoute,
  toolRoute,
  ToolUpdateComponent
} from './';

const ENTITY_STATES = [...toolRoute, ...toolPopupRoute];

@NgModule({
  imports: [GymSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ToolComponent, ToolDetailComponent, ToolUpdateComponent, ToolDeleteDialogComponent, ToolDeletePopupComponent],
  entryComponents: [ToolComponent, ToolUpdateComponent, ToolDeleteDialogComponent, ToolDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GymToolModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
