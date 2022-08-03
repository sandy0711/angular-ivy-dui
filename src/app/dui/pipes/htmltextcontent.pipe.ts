import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmltextcontent',
})
export class HtmltextcontentPipe implements PipeTransform {
  transform(value) {
    var div = document.createElement('div');
    div.innerHTML = value ? value : '';
    let parsedValue = div.textContent || div.innerText || '';
    return parsedValue;
  }
}
