import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig, FieldType } from '../json-schema/form-builder-config';

@Component({
  selector: 'field-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css'],
})
export class FieldLabelComponent implements OnInit {
  @Input() field: any = {};
  @Input() form: FormGroup;
  constructor() {}

  ngOnInit() {}
  get FieldType() {
    return FieldType;
  }
}
