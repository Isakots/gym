import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tool',
    loadChildren: () => import('./tool/tool.module').then(m => m.GymToolModule)
  },
  {
    path: 'article',
    loadChildren: () => import('./article/article.module').then(m => m.GymArticleModule)
  }
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GymEntityModule {}
