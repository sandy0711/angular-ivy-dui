import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css'],
})
export class RadioComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  @Input() field: any = {};
  @Input() form: FormGroup;
}
