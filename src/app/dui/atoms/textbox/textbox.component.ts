import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DisplayTypes } from '../../json-schema/form-builder-config';

@Component({
  selector: 'textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TextboxComponent implements OnInit {
  @Input() field: any = {};
  @Input() model: any;
  @Input() form: FormGroup;
  get isValid() {
    return this.form.controls[this.field.Name].valid;
  }
  get isDirty() {
    return this.form.controls[this.field.Name].dirty;
  }
  public decimals: number = this.field.decimals;

  public format: string = this.field.Format;
  constructor() {}
  get DisplayType() {
    return DisplayTypes;
  }
  ngOnInit() {
    this.decimals = this.field.decimals;
    this.format = this.field.Format;
  }
  ngOnChanges(change: any) {}
}
