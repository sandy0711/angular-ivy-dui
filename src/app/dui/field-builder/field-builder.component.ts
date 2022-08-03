import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ElementRef,
  Renderer2,
  OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig, FieldType } from '../json-schema/form-builder-config';

@Component({
  selector: 'field-builder',
  templateUrl: './field-builder.component.html',
})
export class FieldBuilderComponent implements OnInit, OnDestroy {
  @Input() field: FieldConfig;
  @Input() form: FormGroup;
  @Input() model: any;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}
  ngOnDestroy(): void {
    this.uiEvents.listeners.forEach((listener) => listener());
  }
  get FieldType() {
    return FieldType;
  }
  private uiEvents = {
    listeners: [],
    events: ['click', 'keyup', 'keydown', 'keypress', 'change'],
  };
  ngOnInit() {
    this.field.templateOptions != undefined
      ? this.field.templateOptions.ClassName
      : '';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.field) {
      this.uiEvents.listeners.forEach((listener) => listener());

      this.uiEvents.events.forEach((eventName) => {
        if (this.field.events && this.field.events[eventName]) {
          this.uiEvents.listeners.push(
            this.renderer.listen(
              this.elementRef.nativeElement,
              eventName,
              (e) => this.field.events[eventName](this.field, e)
            )
          );
        }
      });
    }
  }
  onFocus($event: any) {
    this.field['___$focus'] = true;
    if (this.field.events.focus) {
      this.field.events.focus(this.field, $event);
    }
  }

  onBlur($event: any) {
    this.field['___$focus'] = false;
    if (this.field.events.blur) {
      this.field.events.blur(this.field, $event);
    }
  }

  onChange($event: any) {
    if (this.field.events && this.field.events.change) {
      this.field.events.change(this.field, $event);
    }
  }
}
