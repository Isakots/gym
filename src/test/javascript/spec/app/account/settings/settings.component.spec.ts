import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder} from '@angular/forms';
import {throwError} from 'rxjs';

import {GymTestModule} from '../../../test.module';
import {AccountService} from 'app/core';
import {ProfileComponent} from '../../../../../../main/webapp/app/account/settings/profile.component';

describe('Component Tests', () => {
  describe('SettingsComponent', () => {
    let comp: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;
    let mockAuth: any;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [GymTestModule],
        declarations: [ProfileComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProfileComponent, '')
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ProfileComponent);
      comp = fixture.componentInstance;
      mockAuth = fixture.debugElement.injector.get(AccountService);
    });

    // it('should send the current identity upon save', () => {
    //   // GIVEN
    //   const accountValues = {
    //     firstName: 'John',
    //     lastName: 'Doe',
    //
    //     activated: true,
    //     email: 'john.doe@mail.com',
    //     langKey: 'hu'
    //   };
    //   mockAuth.setIdentityResponse(accountValues);
    //
    //   // WHEN
    //   comp.updateForm(accountValues);
    //   comp.save();
    //
    //   // THEN
    //   expect(mockAuth.identitySpy).toHaveBeenCalled();
    //   expect(mockAuth.saveSpy).toHaveBeenCalledWith(accountValues);
    //   expect(comp.settingsForm.value).toEqual(accountValues);
    // });

    it('should notify of success upon successful save', () => {
      // GIVEN
      const accountValues = {
        firstName: 'John',
        lastName: 'Doe'
      };
      comp.settingsForm.patchValue({
        firstName: 'John',
        lastName: 'Doe'
      });
      mockAuth.setIdentityResponse(accountValues);
      // WHEN
      comp.save();

      // THEN
      expect(comp.error).toBeNull();
      expect(comp.success).toBe('OK');
    });

    it('should notify of error upon failed save', () => {
      // GIVEN
      mockAuth.saveSpy.and.returnValue(throwError('ERROR'));
      // WHEN
      comp.save();

      // THEN
      expect(comp.error).toEqual('ERROR');
      expect(comp.success).toBeNull();
    });
  });
});
