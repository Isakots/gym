import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITool, Tool } from 'app/shared/model/tool.model';
import { ToolService } from './tool.service';

@Component({
  selector: 'jhi-tool-update',
  templateUrl: './tool-update.component.html'
})
export class ToolUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    quantity: [null, [Validators.required, Validators.min(1)]]
  });

  constructor(protected toolService: ToolService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tool }) => {
      this.updateForm(tool);
    });
  }

  updateForm(tool: ITool) {
    this.editForm.patchValue({
      id: tool.id,
      name: tool.name,
      quantity: tool.quantity
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tool = this.createFromForm();
    if (tool.id !== undefined) {
      this.subscribeToSaveResponse(this.toolService.update(tool));
    } else {
      this.subscribeToSaveResponse(this.toolService.create(tool));
    }
  }

  private createFromForm(): ITool {
    return {
      ...new Tool(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      quantity: this.editForm.get(['quantity']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITool>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
