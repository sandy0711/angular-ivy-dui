import { NgModule } from '@angular/core';
import { RadioComponent } from '../radio/radio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RadioComponent],
  imports: [ReactiveFormsModule, CommonModule],
  exports: [RadioComponent],
  providers: [],
})
export class RadioModule {}
