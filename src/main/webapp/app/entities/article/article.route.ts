import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Article, IArticle } from 'app/shared/model/article.model';
import { ArticleService } from './article.service';
import { ArticleComponent } from './article.component';
import { ArticleDetailComponent } from './article-detail.component';
import { ArticleUpdateComponent } from './article-update.component';
import { ArticleDeletePopupComponent } from './article-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class ArticleResolve implements Resolve<IArticle> {
  constructor(private service: ArticleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArticle> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Article>) => response.ok),
        map((article: HttpResponse<Article>) => article.body)
      );
    }
    return of(new Article());
  }
}

export const articleRoute: Routes = [
  {
    path: '',
    component: ArticleComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gymApp.article.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'articles'
  },
  {
    path: ':id/view',
    component: ArticleDetailComponent,
    resolve: {
      article: ArticleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gymApp.article.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ArticleUpdateComponent,
    resolve: {
      article: ArticleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gymApp.article.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ArticleUpdateComponent,
    resolve: {
      article: ArticleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gymApp.article.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const articlePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ArticleDeletePopupComponent,
    resolve: {
      article: ArticleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gymApp.article.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
