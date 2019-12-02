import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GymSharedModule } from 'app/shared';

import {
  accountState,
  ActivateComponent,
  PasswordComponent,
  PasswordResetFinishComponent,
  PasswordResetInitComponent,
  PasswordStrengthBarComponent,
  RegisterComponent,
  SettingsComponent
} from './';
import { FileUploadComponent } from 'app/account/settings/file-upload/file-upload.component';
import { FormUploadComponent } from 'app/account/settings/form-upload/form-upload.component';

@NgModule({
  imports: [GymSharedModule, RouterModule.forChild(accountState)],
  declarations: [
    ActivateComponent,
    RegisterComponent,
    PasswordComponent,
    PasswordStrengthBarComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
    FileUploadComponent,
    FormUploadComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GymAccountModule {}
