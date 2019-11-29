import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { AboutUsComponent } from 'app/about-us/about-us.component';

// @Injectable({ providedIn: 'root' })
// export class AboutUsResolve implements Resolve<IArticle> {
//   constructor(private service: ArticleService) {}
//
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArticle> {
//     const id = route.params['id'];
//     if (id) {
//       return this.service.find(id).pipe(
//         filter((response: HttpResponse<Article>) => response.ok),
//         map((article: HttpResponse<Article>) => article.body)
//       );
//     }
//     return of(new Article());
//   }
// }

export const aboutUsRoute: Routes = [
  {
    path: '',
    component: AboutUsComponent,
    data: {
      authorities: [],
      pageTitle: 'gymApp.tool.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
