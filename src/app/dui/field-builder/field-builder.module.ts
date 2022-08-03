import { AdhocModule } from './../atoms/adhoc/adhoc.module';
import { NgModule } from '@angular/core';
import { FieldBuilderComponent } from './field-builder.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from '../atoms/checkbox/checkbox.module';
import { TextboxModule } from '../atoms/textbox/textbox.module';
import { NumberModule } from '../atoms/number/number.module';
import { DropdownModule } from '../atoms/dropdown/dropdown.module';
import { RadioModule } from '../atoms/radio/radio.module';
import { SliderModule } from '../atoms/slider/slider.module';
import { FileModule } from '../atoms/file/file.module';
import { DateModule } from '../atoms/date/date.module';
import { MultiselectDropdownModule } from '../atoms/multiselectdropdown/multiselect-dropdown.module';
import { ValidationMessageModule } from '../validation/validation-message.module';
import { DocumentModule } from '../atoms/document/document.module';
import { MessageModule } from '../atoms/message/message.module';
import { PipesModule } from '../pipes/pipes.module';
import { DuiButtonModule } from '../atoms/button/button.module';
import { HtmlTextEditorModule } from '../atoms/html-text-editor/html-text-editor.module';
import { HiddenModule } from '../atoms/hidden/hidden.module';
import { SurveyNotesModule } from '../atoms/survey-notes/survey-notes.module';
import { ExcelViewerModule } from '../atoms/excel-viewer/excel-viewer.module';
import { ActionButtonModule } from '../atoms/action-button/action-button.module';

@NgModule({
  declarations: [FieldBuilderComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CheckboxModule,
    TextboxModule,
    DropdownModule,
    DateModule,
    RadioModule,
    SliderModule,
    FileModule,
    MultiselectDropdownModule,
    NumberModule,
    DocumentModule,
    ValidationMessageModule,
    MessageModule,
    PipesModule,
    DuiButtonModule,
    HtmlTextEditorModule,
    AdhocModule,
    HiddenModule,
    SurveyNotesModule,
    ExcelViewerModule,
    ActionButtonModule,
  ],
  exports: [FieldBuilderComponent],
  providers: [],
})
export class FieldBuilderModule {}
