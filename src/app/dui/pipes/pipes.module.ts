import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmldecoderPipe } from './htmldecoder.pipe';
import { HtmltextcontentPipe } from './htmltextcontent.pipe';

@NgModule({
  declarations: [HtmldecoderPipe, HtmltextcontentPipe],
  imports: [CommonModule],
  exports: [HtmldecoderPipe, HtmltextcontentPipe],
})
export class PipesModule {}
