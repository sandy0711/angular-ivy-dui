import {
  Input,
  OnInit,
  Component,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilderLibService } from '../../../form-builder-lib.service';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { DisplayTypes } from '../../json-schema/form-builder-config';
import { FORMCONFIG } from '../../utils';
@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent implements OnInit {
  @Input() field: any;
  @Input() form: FormGroup;

  @Output() fieldchange = new EventEmitter();

  constructor(public _dynamicLibService: FormBuilderLibService) {}
  get DisplayType() {
    return DisplayTypes;
  }

  ngOnInit() {
    if (this.field.Options instanceof Observable) {
      this.field.Options.subscribe((data) => {
        this.field.Options = data;
        this.field.copyofOptions = data;
      });
    }
    if (!this.field.DataTextField) {
      this.field.DataTextField = FORMCONFIG.VALUE;
    }
    if (!this.field.DataValueField) {
      this.field.DataValueField = FORMCONFIG.KEY;
    }
    if (!this.field.copyofOptions) {
      this.field.copyofOptions = this.field.Options;
    }
  }
  handleFilter(value, fieldValue) {
    this.field.Options = fieldValue.copyofOptions.filter(
      (s) =>
        s[fieldValue.DataTextField]
          .toLowerCase()
          .indexOf(value.toLowerCase()) !== -1
    );
  }
  handleDropdownChange(selectedValue, fieldData) {
    this._dynamicLibService.dropdownCascading.emit({
      selectedValue: selectedValue,
      fieldData: fieldData,
    });
    this.fieldchange.emit(selectedValue);
  }
  handleAutoCompleteChange(selectedValue, fieldData) {
    this._dynamicLibService.dropdownCascading.emit({
      selectedValue: selectedValue,
      fieldData: fieldData,
    });
    this.fieldchange.emit(selectedValue);
  }
  handleComboBoxChange(selectedValue, fieldData) {
    this._dynamicLibService.dropdownCascading.emit({
      selectedValue: selectedValue,
      fieldData: fieldData,
    });
    this.fieldchange.emit(selectedValue);
  }
}
