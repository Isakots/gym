import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {GymSharedModule} from 'app/shared';

import {
    accountState,
    ActivateComponent,
    PasswordComponent,
    PasswordResetFinishComponent,
    PasswordResetInitComponent,
    PasswordStrengthBarComponent,
    ProfileComponent,
    RegisterComponent
} from './';
import {ImageViewComponent} from 'app/account/settings/file-upload/image-view.component';
import {FormUploadComponent} from 'app/account/settings/form-upload/form-upload.component';

@NgModule({
  imports: [GymSharedModule, RouterModule.forChild(accountState)],
  declarations: [
    ActivateComponent,
    RegisterComponent,
    PasswordComponent,
    PasswordStrengthBarComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    ProfileComponent,
    ImageViewComponent,
    FormUploadComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GymAccountModule {}
