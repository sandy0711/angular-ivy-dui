import { Component, OnInit, Input } from '@angular/core';
import { FieldConfig } from '../json-schema/form-builder-config';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'error-message',
  templateUrl: './validation-message.component.html',
})
export class ValidationMessageComponent implements OnInit {
  @Input() field: FieldConfig;
  @Input() form: FormGroup;

  get isValid() {
    return this.form.controls[this.field.Name].valid;
  }
  get isDirty() {
    return this.form.controls[this.field.Name].dirty;
  }
  get isTouched() {
    return this.form.controls[this.field.Name].touched;
  }
  get isDisabled() {
    return this.form.controls[this.field.Name].disabled;
  }
  get isRequired() {
    return this.form.controls[this.field.Name].errors
      ? this.form.controls[this.field.Name].errors.required
      : false;
  }
  get isValidMaxLength() {
    return this.form.controls[this.field.Name].errors
      ? this.form.controls[this.field.Name].errors.maxlength
      : false;
  }
  get isValidMinLength() {
    return this.form.controls[this.field.Name].errors
      ? this.form.controls[this.field.Name].errors.minlength
      : false;
  }
  get isValidMinValue() {
    return this.form.controls[this.field.Name].errors
      ? this.form.controls[this.field.Name].errors.min
      : false;
  }
  get isValidMaxValue() {
    return this.form.controls[this.field.Name].errors
      ? this.form.controls[this.field.Name].errors.max
      : false;
  }
  get isValidPattern() {
    return this.form.controls[this.field.Name].errors
      ? this.form.controls[this.field.Name].errors.pattern
      : false;
  }
  get isValidEmail() {
    return this.form.controls[this.field.Name].errors
      ? this.form.controls[this.field.Name].errors.email
      : false;
  }
  get errors() {
    return this.form.controls[this.field.Name].errors
      ? this.form.controls[this.field.Name].errors
      : null;
  }
  constructor() {}
  ngOnInit() {}
  ngOnChanges() {}
}
