import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'htmldecoder',
})
export class HtmldecoderPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value) {
    if (value && value != '' && value.includes("'")) {
      value = value.replace("'", '&#39;');
    }

    let isEncoded = false;
    const specialChars = ['&quot;', '&amp;quot;'];
    const decodedTags = {
      '&quot;': "'",
      '&amp;quot;': "'",
    };
    if (value) {
      specialChars.forEach((sc) => {
        if (value.indexOf(sc) > -1 || value.indexOf('&lt;') > -1) {
          isEncoded = true;
        }
        value = value
          .replaceAll(sc, decodedTags[sc])
          .replace(/&lt;/gi, '<')
          .replace(/&gt;/gi, '>')
          .replace(/\\\"/g, '"');
      });
    }
    return this.sanitizer.bypassSecurityTrustHtml(value) as string;
  }
}
