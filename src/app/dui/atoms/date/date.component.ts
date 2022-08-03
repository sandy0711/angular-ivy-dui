import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DisplayTypes } from '../../json-schema/form-builder-config';
import { FORMCONFIG } from '../../utils';
@Component({
  selector: 'date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
})
export class DateComponent implements OnInit {
  @Input() field: any = {};
  @Input() form: FormGroup;
  startDate = FORMCONFIG.STARTDATE;
  endDate = FORMCONFIG.ENDDATE;
  constructor() {}
  ngOnInit() {}
  get DisplayType() {
    return DisplayTypes;
  }
}
