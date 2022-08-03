import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent } from '../validation/validation-message.component';
import { PipesModule } from '../pipes/pipes.module';
@NgModule({
  declarations: [ValidationMessageComponent],
  imports: [ReactiveFormsModule, CommonModule, PipesModule],
  exports: [ValidationMessageComponent],
  providers: [],
})
export class ValidationMessageModule {}
