import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GymSharedModule } from 'app/shared';
import {
  ArticleComponent,
  ArticleDeleteDialogComponent,
  ArticleDeletePopupComponent,
  ArticleDetailComponent,
  articlePopupRoute,
  articleRoute,
  ArticleUpdateComponent
} from './';
import { QuillModule } from 'ngx-quill';

const ENTITY_STATES = [...articleRoute, ...articlePopupRoute];

@NgModule({
  imports: [GymSharedModule, RouterModule.forChild(ENTITY_STATES), QuillModule],
  declarations: [
    ArticleComponent,
    ArticleDetailComponent,
    ArticleUpdateComponent,
    ArticleDeleteDialogComponent,
    ArticleDeletePopupComponent
  ],
  entryComponents: [ArticleComponent, ArticleUpdateComponent, ArticleDeleteDialogComponent, ArticleDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  exports: [ArticleComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GymArticleModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
