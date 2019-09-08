import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ITool, Tool } from 'app/shared/model/tool.model';
import { ToolService } from './tool.service';
import { ToolComponent } from './tool.component';
import { ToolDetailComponent } from './tool-detail.component';
import { ToolUpdateComponent } from './tool-update.component';
import { ToolDeletePopupComponent } from './tool-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class ToolResolve implements Resolve<ITool> {
  constructor(private service: ToolService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITool> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Tool>) => response.ok),
        map((tool: HttpResponse<Tool>) => tool.body)
      );
    }
    return of(new Tool());
  }
}

export const toolRoute: Routes = [
  {
    path: '',
    component: ToolComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gymApp.tool.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ToolDetailComponent,
    resolve: {
      tool: ToolResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gymApp.tool.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ToolUpdateComponent,
    resolve: {
      tool: ToolResolve
    },
    data: {
      authorities: ['ROLE_MEMBER'],
      pageTitle: 'gymApp.tool.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ToolUpdateComponent,
    resolve: {
      tool: ToolResolve
    },
    data: {
      authorities: ['ROLE_MEMBER'],
      pageTitle: 'gymApp.tool.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const toolPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ToolDeletePopupComponent,
    resolve: {
      tool: ToolResolve
    },
    data: {
      authorities: ['ROLE_MEMBER'],
      pageTitle: 'gymApp.tool.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
