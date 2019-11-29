import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GymSharedModule } from 'app/shared';
import { ArticleDeleteDialogComponent, ArticleDeletePopupComponent, ArticleDetailComponent, ArticleUpdateComponent } from './';
import { QuillModule } from 'ngx-quill';
import { articlePopupRoute, articleRoute } from 'app/entities/article/article.route';

const ENTITY_STATES = [...articleRoute, ...articlePopupRoute];

@NgModule({
  imports: [GymSharedModule, RouterModule.forChild(ENTITY_STATES), QuillModule],
  declarations: [ArticleDetailComponent, ArticleUpdateComponent, ArticleDeleteDialogComponent, ArticleDeletePopupComponent],
  entryComponents: [ArticleUpdateComponent, ArticleDeleteDialogComponent, ArticleDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
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
