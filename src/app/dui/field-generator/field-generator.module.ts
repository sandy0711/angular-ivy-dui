import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldGeneratorComponent } from './field-generator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldBuilderModule } from '../field-builder/field-builder.module';
import { CustomFieldBuilderModule } from '../custom-field-builder/custom-field-builder.module';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { FieldLabelModule } from '../field-label/label.module';

@NgModule({
  declarations: [FieldGeneratorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FieldBuilderModule,
    CustomFieldBuilderModule,
    FieldLabelModule,
    TooltipModule,
    LayoutModule
  ],
  exports: [FieldGeneratorComponent],
  providers: [],
})
export class FieldGeneratorModule { }
