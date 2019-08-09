/* tslint:disable max-line-length */
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GymTestModule } from '../../../test.module';
import { ToolUpdateComponent } from 'app/entities/tool/tool-update.component';
import { ToolService } from 'app/entities/tool/tool.service';
import { Tool } from 'app/shared/model/tool.model';

describe('Component Tests', () => {
  describe('Tool Management Update Component', () => {
    let comp: ToolUpdateComponent;
    let fixture: ComponentFixture<ToolUpdateComponent>;
    let service: ToolService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GymTestModule],
        declarations: [ToolUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ToolUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ToolUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ToolService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tool(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tool();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
