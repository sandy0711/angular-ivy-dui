import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DisplayTypes } from '../../json-schema/form-builder-config';

@Component({
  selector: 'dui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DuiButtonComponent implements OnInit {
  constructor() {}

  @Input() field: any = {};
  @Input() model: any;
  @Input() form: FormGroup;

  get DisplayType() {
    return DisplayTypes;
  }
  ngOnInit() {}
  ngOnChanges(change: any) {}
}
