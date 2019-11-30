import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { IArticle } from 'app/shared/model/article.model';
import { AccountService } from 'app/core';
import { ArticleService } from 'app/entities/article';
import { ArticleType } from 'app/shared/enums/article-type.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  articles: IArticle[];
  currentAccount: any;
  eventSubscriber: Subscription;
  content: string;

  // TODO I should create ng-templates separately for AboutUs, Gym, Nutrition
  //  and other pages which contain articles... the problem is the routing..

  constructor(
    protected articleService: ArticleService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    private activatedRoute: ActivatedRoute
  ) {}

  loadAll() {
    console.log('Actual route is: ', this.activatedRoute.snapshot.url);
    this.articleService
      .query({ type: ArticleType.NEWS })
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
