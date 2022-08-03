import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DisplayTypes } from '../../json-schema/form-builder-config';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
})
export class CheckboxComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  @Input() field: any = {};
  @Input() form: FormGroup;
  get isValid() {
    return this.form.controls[this.field.Name].valid;
  }
  get isDirty() {
    return this.form.controls[this.field.Name].dirty;
  }
  get DisplayType() {
    return DisplayTypes;
  }
}
