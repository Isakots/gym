import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITool } from 'app/shared/model/tool.model';
import { ToolService } from './tool.service';

@Component({
  selector: 'jhi-tool-delete-dialog',
  templateUrl: './tool-delete-dialog.component.html'
})
export class ToolDeleteDialogComponent {
  tool: ITool;

  constructor(protected toolService: ToolService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.toolService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'toolListModification',
        content: 'Deleted an tool'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tool-delete-popup',
  template: ''
})
export class ToolDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tool }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ToolDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tool = tool;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tool', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tool', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
