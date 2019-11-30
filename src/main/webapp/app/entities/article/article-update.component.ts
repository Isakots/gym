import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article, IArticle } from 'app/shared/model/article.model';
import { ArticleService } from './article.service';

@Component({
  selector: 'jhi-article-update',
  templateUrl: './article-update.component.html'
})
export class ArticleUpdateComponent implements OnInit {
  quillContent: string;
  isSaving: boolean;
  editorForm: FormGroup;

  constructor(protected articleService: ArticleService, protected activatedRoute: ActivatedRoute, private _router: Router) {}

  ngOnInit() {
    this._initFormGroup();
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ article }) => {
      this.quillContent = article.content;
      this.updateForm(article);
    });
  }

  private _initFormGroup() {
    this.editorForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(''),
      type: new FormControl(''),
      introduction: new FormControl(''),
      editor: new FormControl('')
    });
  }

  updateForm(article: IArticle) {
    this.editorForm.patchValue({
      id: article.id,
      title: article.title,
      type: article.type,
      introduction: article.introduction
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const article = this.createFromForm();
    if (article.id !== undefined) {
      this.subscribeToSaveResponse(this.articleService.update(article));
    } else {
      this.subscribeToSaveResponse(this.articleService.create(article));
    }
  }

  private createFromForm(): IArticle {
    return {
      ...new Article(),
      id: this.editorForm.get(['id']).value,
      title: this.editorForm.get(['title']).value,
      type: this.editorForm.get(['type']).value,
      introduction: this.editorForm.get(['introduction']).value,
      content: this.editorForm.get(['editor']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticle>>) {
    result.subscribe(answer => this.onSaveSuccess(answer.body.id), () => this.onSaveError());
  }

  protected onSaveSuccess(id: string) {
    this.isSaving = false;
    this._router.navigate(['/article', id, 'view']);
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  onSubmit() {}
}
