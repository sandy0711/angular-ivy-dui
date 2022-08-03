import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DuiButtonComponent } from './button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@NgModule({
  declarations: [DuiButtonComponent],
  imports: [ReactiveFormsModule, CommonModule, ButtonsModule],
  exports: [DuiButtonComponent],
})
export class DuiButtonModule {}
