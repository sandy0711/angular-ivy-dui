import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldLabelComponent } from './label.component';
import { MessageModule } from '../atoms/message/message.module';
import { PipesModule } from '../pipes/pipes.module';
@NgModule({
  declarations: [FieldLabelComponent],
  imports: [CommonModule, MessageModule, PipesModule],
  exports: [FieldLabelComponent],
  providers: [],
})
export class FieldLabelModule {}
