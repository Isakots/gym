import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { IArticle } from 'app/shared/model/article.model';
import { AccountService } from 'app/core';
import { ArticleService } from './article.service';

@Component({
  selector: 'jhi-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  articles: IArticle[];
  currentAccount: any;
  eventSubscriber: Subscription;
  content: string;

  constructor(
    protected articleService: ArticleService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.articleService
      .query()
      .pipe(
        filter((res: HttpResponse<IArticle[]>) => res.ok),
        map((res: HttpResponse<IArticle[]>) => res.body)
      )
      .subscribe(
        (res: IArticle[]) => {
          this.articles = res;
          this.articles.sort((a, b) => {
            if (a.createdDate === b.createdDate) {
              return 0;
            }
            return a.createdDate > b.createdDate ? -1 : 1;
          });
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInArticles();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IArticle) {
    return item.id;
  }

  registerChangeInArticles() {
    this.eventSubscriber = this.eventManager.subscribe('articleListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
