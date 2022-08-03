import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`],
})
export class HelloComponent {
  @Input() name: string;
}

// {
//   "name": "@sandeep/form-builder-lib",
//   "version": "6.0.0",
//   "peerDependencies": {
//       "@angular/common": "12.2.4",
//       "@angular/core": "12.2.4"
//   }
// }
