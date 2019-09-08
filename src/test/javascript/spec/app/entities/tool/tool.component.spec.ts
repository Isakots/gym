/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GymTestModule } from '../../../test.module';
import { ToolComponent } from 'app/entities/tool/tool.component';
import { ToolService } from 'app/entities/tool/tool.service';
import { Tool } from 'app/shared/model/tool.model';

describe('Component Tests', () => {
  describe('Tool Management Component', () => {
    let comp: ToolComponent;
    let fixture: ComponentFixture<ToolComponent>;
    let service: ToolService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GymTestModule],
        declarations: [ToolComponent],
        providers: []
      })
        .overrideTemplate(ToolComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ToolComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ToolService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Tool(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tools[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
