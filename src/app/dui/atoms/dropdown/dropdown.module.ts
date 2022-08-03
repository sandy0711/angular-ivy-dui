import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsModule } from '@progress/kendo-angular-inputs';
import {
  DropDownsModule,
  AutoCompleteModule,
  ComboBoxModule,
} from '@progress/kendo-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  declarations: [DropdownComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputsModule,
    DropDownsModule,
    AutoCompleteModule,
    ComboBoxModule,
    PipesModule,
  ],
  exports: [DropdownComponent],
  providers: [],
})
export class DropdownModule {}
