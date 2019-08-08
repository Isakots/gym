import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GymSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [GymSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [GymSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GymSharedModule {
  static forRoot() {
    return {
      ngModule: GymSharedModule
    };
  }
}
