import { ElementRef, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InterCommunicationService } from '@ey-syndicate/adhoc-report-result';
import {
  IModalConfig,
  MessagingService,
  NavigationService,
} from '@ttdas/core.abstractions';
import { SharedService } from '@ttdas/core.globals';
import { Observable, Subject } from 'rxjs';
import { DefaultEndPoints } from '@ttdas/core.config';
import { ActionParams } from '../models/control-action';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderHelperService {
  public _formgp: FormGroup;
  public fields: any;
  public loader = new Subject();
  public errorService = new Subject();
  public reportDynamicDs = new Subject();
  public _dataRow: any;
  private _modalConfig: IModalConfig;
  private _validationError: string[];
  public _interCommService: InterCommunicationService;
  private el: ElementRef;
  private actionParams: any = [];
  public isRequestProcessingRequired: boolean = false;
  constructor(
    protected sharedService: SharedService,
    private navigationService: NavigationService,
    private messages: MessagingService
  ) {}

  // this method removes undefined properties
  private removeUndefinedProperties(obj: any) {
    Object.keys(obj).forEach((key) =>
      obj[key] === undefined ? delete obj[key] : {}
    );
  }

  // Used to detect changes in a FORM
  private markFormGroupTouched(formGroup: FormGroup): boolean {
    let pending = false;
    (Object as any).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.value !== control._pendingValue) {
        control.markAsDirty();
      }

      control.value = control._pendingValue;
      control.patchValue(control.value);
      pending =
        control._pendingChange != undefined &&
        control._pendingChange &&
        control.value != control._pendingValue
          ? true
          : pending;
      if (control.controls) {
        this.markFormGroupTouched(control);
        pending =
          control._pendingChange != undefined &&
          control._pendingChange &&
          control.value != control._pendingValue
            ? true
            : pending;
      }
    });
    return pending;
  }

  // this method sets the focus on validation failed control
  private setFocusOnInValidInput() {
    if (this._formgp && this.el) {
      for (const key of Object.keys(this._formgp.controls)) {
        if (this._formgp.controls[key].invalid) {
          const invalidControl = this.el.nativeElement
            .querySelector('#dui-form')
            .querySelector('#' + key);
          if (invalidControl) {
            invalidControl.focus();
          }
          break;
        }
      }
    }
  }

  private restCall(method: string, apiUrl: string, request: any) {
    switch (method.toUpperCase()) {
      case 'GET': {
        return this.sharedService.restGet(apiUrl, request);
      }
      case 'POST': {
        return this.sharedService.restPost(apiUrl, request, true);
      }
      case 'PUT': {
        return this.sharedService.restPut(apiUrl, request);
      }
      case 'DELETE': {
        return this.sharedService.restDelete(apiUrl, request);
      }
      case 'PATCH': {
        return this.sharedService.restPatch(apiUrl, request);
      }
      default: {
        break;
      }
    }
  }

  private invokeApi(
    apiConfiguration: string,
    apiController: string,
    actionLink: string,
    httpVerb = 'POST',
    body?: any
  ) {
    let apiUrl = DefaultEndPoints.ApiEndPoints[apiConfiguration];
    let request: any;
    if (apiController) {
      apiUrl = apiUrl + '/' + apiController;
    }
    if (actionLink) {
      apiUrl = apiUrl + '/' + actionLink;
    }
    if (body) {
      request = body || {};
      this.removeUndefinedProperties(request);
      return this.restCall(httpVerb, apiUrl, request);
    } else {
      this.markFormGroupTouched(this._formgp);
      if (this._formgp.valid) {
        request = this._formgp.getRawValue() || {};
        this.removeUndefinedProperties(request);
        return this.restCall(httpVerb, apiUrl, request);
      } else {
        this.setFocusOnInValidInput();
        return new Observable((observer) => {
          observer.next({ isValid: false });
        });
      }
    }
  }

  private navigate(routeNavigation) {
    let navResponse: Promise<boolean>;
    this.navigationService.routeNavigate([routeNavigation]);
    if (routeNavigation) {
      navResponse = this.navigationService.routeNavigate([routeNavigation]);
    }
    // navResponse.then((result) => {
    //   if (!result) {
    //     // this.messages.success(CONFIGS.MESSAGES.NAVIGATION_FAILED, '');
    //   }
    // }, () => {
    //   // this.messages.success(CONFIGS.MESSAGES.NAVIGATION_FAILED, '');
    // });
  }

  private executActionParams(actionParam: ActionParams) {
    this.loader.next({ isLoading: false });
    if (actionParam) {
      if (
        actionParam.refreshGridOnSuccess ||
        actionParam.refreshGridOnFailure
      ) {
        this._interCommService.refreshGrid('');
      }
      if (actionParam.closeFormOnSuccess || actionParam.closeFormOnFailure) {
        this.closeForm();
      }
      if (actionParam.messageOnSuccess) {
        this.messages.success(actionParam.messageOnSuccess, '');
      }
      if (actionParam.messageOnFailure) {
        this.messages.error(actionParam.messageOnFailure, '');
      }

      if (actionParam.navigateRouteOnSuccess) {
        this.navigate(actionParam.navigateRouteOnSuccess);
      }
      if (actionParam.navigateUrlOnSuccess) {
        this.navigate(actionParam.navigateUrlOnSuccess);
      }

      if (actionParam.navigateRouteOnFailure) {
        this.navigate(actionParam.navigateRouteOnFailure);
      }
      if (actionParam.navigateUrlOnFailure) {
        this.navigate(actionParam.navigateUrlOnFailure);
      }
    }
  }

  public processApi(
    apiConfiguration: string,
    apiController: string,
    actionLink: string,
    httpVerb: string = 'POST',
    requestBody?: string
  ) {
    this._validationError = [];
    this.loader.next({ isLoading: true });
    let actionParam = null;
    if (this.actionParams) {
      const actionDictionary = this.actionParams.find(
        (item) => item.ActionLink.toUpperCase() === actionLink.toUpperCase()
      );
      if (actionDictionary) {
        actionParam = actionDictionary.Actions;
      }
    }

    this.invokeApi(
      apiConfiguration,
      apiController,
      actionLink,
      httpVerb,
      requestBody
    ).subscribe(
      (response) => {
        if (response) {
          if (response.hasOwnProperty('isValid') && !response.isValid) {
            this.loader.next({ isLoading: false });
          } else {
            this.executActionParams(actionParam);
          }
        }
      },
      (error) => {
        if (error && error.error) {
          if (error.status === 400) {
            let errorResponse = error.error;
            if (
              Array.isArray(errorResponse.ValidationErrors) &&
              errorResponse.ValidationErrors.length > 0
            ) {
              errorResponse.ValidationErrors.forEach((element) => {
                if (element && element.Description) {
                  this._validationError.push(element.Description as string);
                }
              });
              this.errorService.next(this._validationError);
              this.loader.next({ isLoading: false });
            }
          } else {
            this.executActionParams(actionParam);
          }
        }
      }
    );
  }

  public getData(
    apiConfiguration: string,
    apiEndPoint: string,
    methodVerb = 'GET'
  ): Promise<any> {
    let apimUrl = DefaultEndPoints.ApiEndPoints[apiConfiguration];
    apimUrl = apimUrl + '/' + apiEndPoint;
    return this.restCall(methodVerb, apimUrl, this._dataRow).toPromise();
  }

  // Used to initialize helper service
  public initialize(
    formgrp: FormGroup,
    modalConfig: IModalConfig,
    intercomService: InterCommunicationService,
    dataRow: any,
    elementref: any = null,
    fields: any,
    actionParams: any
  ) {
    this._formgp = formgrp;
    this._modalConfig = modalConfig || this._modalConfig;
    this._interCommService = intercomService;
    this._dataRow = dataRow || {};
    this.el = elementref || this.el;
    this.fields = fields;
    this.actionParams = actionParams || undefined;
    window['fb_helper'] = { service: this, form: formgrp, fields: this.fields };
  }

  public closeForm() {
    if (!this._modalConfig) {
      return this.closeModal();
    }
    return this._modalConfig?.Close();
  }

  // Used to get form configuration
  public getFormConfigurationDetails(formCode: string): Observable<any> {
    let apimUrl =
      DefaultEndPoints.ApiEndPoints['GETCOMMONFORMCONFIGURATIONBYCODE'];
    return this.sharedService.restPost(apimUrl, { code: formCode });
  }

  closeAllModals() {
    const openModals = document.querySelectorAll('.modal');
    if (openModals) {
      for (let i = 0; i < openModals.length; i++) {
        this.closeModal(openModals[i]);
      }
    }
  }

  closeModal(modalElement: any = null) {
    modalElement = modalElement ?? document.querySelector('.modal');
    //Get the modal-footer of the modal
    const modalFooter = modalElement.getElementsByClassName('modal-footer');
    if (modalFooter && modalFooter.length > 0) {
      //Get the close button in the modal header
      let closeButton = modalFooter[0].getElementsByTagName('BUTTON');
      if (closeButton && closeButton.length > 0) {
        //simulate click on close button
        closeButton[0].click();
      }
    }
  }
}
