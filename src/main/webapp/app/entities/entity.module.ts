import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'tool',
        loadChildren: () => import('./tool/tool.module').then(m => m.GymToolModule)
      },
      {
        path: 'article',
        loadChildren: () => import('./article/article.module').then(m => m.GymArticleModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GymEntityModule {}
