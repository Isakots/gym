import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { ITool } from 'app/shared/model/tool.model';
import { AccountService } from 'app/core';
import { ToolService } from './tool.service';

@Component({
  selector: 'jhi-tool',
  templateUrl: './tool.component.html'
})
export class ToolComponent implements OnInit, OnDestroy {
  tools: ITool[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected toolService: ToolService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.toolService
      .query()
      .pipe(
        filter((res: HttpResponse<ITool[]>) => res.ok),
        map((res: HttpResponse<ITool[]>) => res.body)
      )
      .subscribe(
        (res: ITool[]) => {
          this.tools = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTools();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITool) {
    return item.id;
  }

  registerChangeInTools() {
    this.eventSubscriber = this.eventManager.subscribe('toolListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
