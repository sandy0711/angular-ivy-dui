import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {
  Compiler,
  Component,
  ComponentRef,
  EventEmitter,
  Injector,
  Input,
  NgModule,
  NgModuleRef,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
  OnChanges,
  ViewEncapsulation,
  NO_ERRORS_SCHEMA,
  ElementRef,
} from '@angular/core';
import {
  AbstractControlOptions,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FieldBuilderModule } from './field-builder/field-builder.module';
import { CustomFieldBuilderModule } from './custom-field-builder/custom-field-builder.module';
import { VALIDATORS, assignFieldValue, getKeyPath } from './utils';
import { FormBuilderLibService } from '../form-builder-lib.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { DisplayTypes, FieldType } from './json-schema/form-builder-config';

import { OptionType } from './utils';
import { FieldLabelModule } from './field-label/label.module';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { HtmldecoderPipe } from './pipes/htmldecoder.pipe';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { parse } from 'angular-html-parser';
import { FormBuilderHelperService } from './services/form-builder-helper.service';
import { InterCommunicationService } from '@ey-syndicate/adhoc-report-result';
import { ControlActions } from './models/control-action';

export const ngJitMode = true;

@Component({
  selector: 'ttdas-form-builder',
  templateUrl: `./dynamic-form-builder.component.html`,
  styleUrls: ['./dynamic-form-builder.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicTemplateComponent implements OnInit, OnChanges {
  ngZone: any;
  htmlFields: any[];
  checkExpressionChange() {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      this.cmpRef.instance.form = this.form;
      this.formChange.emit(this.form);
    });
    this.form.statusChanges.subscribe(() => {
      this.cmpRef.instance.form = this.form;
      this.formChange.emit(this.form);
    });
    this.formBuilderHelperService.initialize(
      this.form,
      null,
      this.interCommService,
      this.dataRow,
      null,
      this.fields,
      this.formControlActions
    );
  }
  private formmodel: any;
  @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;
  @Output() formChange = new EventEmitter();
  @Output() fieldsChange = new EventEmitter();
  @Output() modelDataLoaded = new EventEmitter();
  @Input() fields: any;
  @Input() dataRow: any;
  @Input()
  set model(model: any) {
    model = this.evaluateFunction(model);
    if (typeof model === 'function') {
      this.modelDataLoaded.emit({ isLoading: true });
      let modelfunc = model() as Promise<any>;

      let modobs = Observable.create((observer) =>
        modelfunc.then((res) => {
          observer.next(res);
          /*Complete the Observable as it won't produce any more event */
          observer.complete();
          this.modelDataLoaded.emit({ isLoading: false });
        })
      );
      this.formmodel = modobs;
    } else if (model) {
      this.formmodel = model;
    }
  }
  get model() {
    return this.formmodel;
  }
  @Input() modelChange = new EventEmitter();

  @Input() template: any;
  @Input() customTemplate: any;

  private immutable = false;
  private _model: any;
  private _modelChangeValue: any = {};
  private _fields: any[];
  private _options: any;
  private modelChangeSubs: Subscription[] = [];
  private modelChange$ = new Subject<void>();
  public formControlActions: any = [];

  private cmpRef: ComponentRef<any>;
  nodeElements: any;
  @Input() form: any;
  fromDuiForm = true;

  constructor(
    private compiler: Compiler,
    private injector: Injector,
    private moduleRef: NgModuleRef<any>,
    private sanitizer: DomSanitizer,
    public _dynamicLibService: FormBuilderLibService,
    public formBuilderHelperService: FormBuilderHelperService,
    private interCommService: InterCommunicationService
  ) {}

  ngOnChanges(changes: any) {
    if (
      changes.fields ||
      changes.form ||
      (changes.model && this._modelChangeValue !== changes.model.currentValue)
    ) {
      this.form = this.form || new FormGroup({});
    }
  }
  ngAfterViewInit() {
    // Here, get your HTML from backend.
    this.LoadComponent();
  }
  private LoadComponent() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
    if (this.formmodel instanceof Observable) {
      this.formmodel.subscribe((res) => {
        this.formmodel = res;
        let fieldcontrols = this.BuildForm();
        this.trackModelChanges(this.fields.fields, fieldcontrols);

        let formtemplate = this.template;
        let customTemplate = this.customTemplate;
        this.createComponentFromRaw(
          this.fields.fields,
          this.form,
          formtemplate,
          customTemplate,
          this.formmodel
        );
      });
    } else {
      let fieldcontrols = this.BuildForm();
      if (this.formmodel) {
        this.trackModelChanges(this.fields.fields, fieldcontrols);
      }
      let formtemplate = this.template;
      let customTemplate = this.customTemplate;
      this.createComponentFromRaw(
        this.fields.fields,
        this.form,
        formtemplate,
        customTemplate,
        this.formmodel
      );
    }
  }
  get DisplayType() {
    return DisplayTypes;
  }
  get FieldType() {
    return FieldType;
  }
  private SetField(field: any, model: any) {
    if (model != null && model.hasOwnProperty(field.Name)) {
      if (field.Type == FieldType.Date) {
        field.value = model[field.Name] ? new Date(model[field.Name]) : null;
      } else {
        field.value = model[field.Name];
      }
    }
  }
  private trackModelChanges(fields: any, rootKey: string[] = []) {
    fields.forEach((field) => {
      const control = field.formControl;
      let valueChanges = control.valueChanges.pipe(distinctUntilChanged());

      this.modelChangeSubs.push(
        valueChanges.subscribe((value) => {
          if (
            control instanceof FormControl &&
            control['_fields'] &&
            control['_fields'].length > 1
          ) {
            control.patchValue(value, { emitEvent: false, onlySelf: true });
          }

          if (field.parsers && field.parsers.length > 0) {
            field.parsers.forEach((parserFn) => (value = parserFn(value)));
          }

          this.changeModel({
            key: [...rootKey, ...getKeyPath(field)].join('.'),
            value,
            field,
          });
        })
      );

      const observers = control.valueChanges['observers'];
      if (observers && observers.length > 1) {
        observers.unshift(observers.pop());
      }

      if (field.fieldGroup && field.fieldGroup.length > 0) {
        this.trackModelChanges(
          field.fieldGroup,
          field.key ? [...rootKey, ...getKeyPath(field)] : rootKey
        );
      }
    });
  }
  changeModel(arg0: { key: string; value: any; field: any }) {
    assignFieldValue(arg0.field, arg0.value, this.formmodel);
    this.modelChange$.next();
  }

  private BuildForm(): any {
    let fieldsCtrls = {};

    for (let f of this.fields.fields) {
      this.SetField(f, this.formmodel);
      if (!f.IsDisabled) {
        f.IsDisabled = false;
      }
      fieldsCtrls[f.Name] = new FormControl(
        { value: f.value, disabled: f.IsDisabled },
        this.composevalidator(f)
      );
      f.formControl = fieldsCtrls[f.Name];
      if (f.DisplayType != this.DisplayType.CheckBox) {
        if (
          !f.Options &&
          !(f.Options instanceof Observable) &&
          (f.Type === this.FieldType.SingleSelect ||
            f.Type === this.FieldType.MultiSelect)
        ) {
          this.BuildDropdown(f);
        } else if (f.Type === this.FieldType.Date) {
          this.BuildDate(f);
        } else if (f.Type === this.FieldType.Button) {
          this.BuildButton(f);
        }
      }
    }

    let ctrls = Object.getOwnPropertyNames(this.form.controls);
    for (const ctrl of ctrls) {
      fieldsCtrls[ctrl] = this.form.controls[ctrl];
    }

    this.form = new FormGroup(fieldsCtrls);
    return fieldsCtrls;
  }
  get OptionType() {
    return OptionType;
  }

  private evaluateFunction(value: any) {
    let evaluatedFunction = value;
    if (
      typeof value === 'string' &&
      value.startsWith('/Function(') &&
      value.endsWith(')/')
    ) {
      this.fromDuiForm = false;
      value = value.substring(10, value.length - 2);
      evaluatedFunction = (0, eval)('(' + value + ')');
    }
    if (`${value}`.indexOf('dui_helper') >= 0) {
      this.fromDuiForm = true;
    } else if (`${value}`.indexOf('fb_helper') >= 0) {
      this.fromDuiForm = false;
    }
    return evaluatedFunction;
  }

  private BuildDropdown(f: any) {
    if (this.fields.DataSources) {
      for (let i of this.fields.DataSources) {
        if (
          i.Name == f.OptionsDataSource &&
          i.Type.trim().toLowerCase() == this.OptionType.STATIC
        ) {
          f.Options = i.List;
          f.copyofOptions = f.Options;
        } else if (
          i.Name === f.OptionsDataSource &&
          i.Type.trim().toLowerCase() === this.OptionType.DYNAMIC
        ) {
          f.DataTextField = i.DataTextField;
          f.DataValueField = i.DataValueField;
          i.Options = this.evaluateFunction(i.Options);
          if (typeof i.Options === 'function') {
            this.modelDataLoaded.emit({ isLoading: true });
            let lookupFunc = i.Options() as Promise<any>;
            let response = Observable.create((observer) =>
              lookupFunc.then((res) => {
                observer.next(res);
                /*Complete the Observable as it won't produce any more event */
                observer.complete();
                this.modelDataLoaded.emit({ isLoading: false });
              })
            );
            if (response instanceof Observable) {
              response.subscribe((res) => {
                f.Options = res;
                f.copyofOptions = f.Options;
                this.SetField(f, this.formmodel);
              });
            } else {
              f.Options = response;
              f.copyofOptions = f.Options;
            }
          } else {
            i.Options.subscribe((response) => {
              i.list = response;
              f.Options = i.list;
              f.copyofOptions = f.Options;
            });
          }
        } else {
        }
      }
    }
  }

  private BuildDate(f: any) {
    if (f.DisplayType !== this.DisplayType.DateRange) {
      f.MinDate = f.MinDate == '' || !f.MinDate ? null : new Date(f.MinDate);
      f.MaxDate = f.MaxDate == '' || !f.MaxDate ? null : new Date(f.MaxDate);
      f.focusedDate =
        f.focusedDate == '' || !f.focusedDate ? null : new Date(f.focusedDate);
      f.value = f.value == '' || !f.value ? null : new Date(f.value);
    } else {
      f.MinDate = f.MinDate == '' || !f.MinDate ? null : new Date(f.MinDate);
      f.MaxDate = f.MaxDate == '' || !f.MaxDate ? null : new Date(f.MaxDate);
      if (!f.value) f.value = { Start: null, End: null };
    }
  }

  private BuildButton(f: any) {
    if (f.events) {
      Object.keys(f.events).forEach((prop) => {
        f.events[prop] = this.evaluateFunction(f.events[prop]);
      });
    }
    if (f.ActionParams) {
      const controlAction = new ControlActions();
      controlAction.Actions = f.ActionParams;
      controlAction.ActionLink = f.ActionParams.actionLink;
      this.formControlActions.push(controlAction);
    }
  }

  private composevalidator(field: any): AbstractControlOptions {
    let validators = [];
    if (field.Type == FieldType.History) {
      const options: AbstractControlOptions = {
        validators: validators,
        updateOn: field.updateOn || 'submit',
      };
      return options;
    }
    if (
      field.hasOwnProperty(VALIDATORS.REQUIRED) &&
      field.Required != null &&
      field.Required != false
    ) {
      validators.push(Validators.required);
    }
    if (
      field.hasOwnProperty(VALIDATORS.MAX_LENGTH) &&
      field.MaxLength != null
    ) {
      validators.push(Validators.maxLength(field.MaxLength));
    }
    if (
      field.hasOwnProperty(VALIDATORS.MIN_LENGTH) &&
      field.MinLength != null
    ) {
      validators.push(Validators.minLength(field.MinLength));
    }
    if (field.hasOwnProperty(VALIDATORS.MIN) && field.MinValue != null) {
      validators.push(Validators.min(field.MinValue));
    }
    if (field.hasOwnProperty(VALIDATORS.MAX) && field.MaxValue != null) {
      validators.push(Validators.max(field.MaxValue));
    }
    if (
      field.hasOwnProperty(VALIDATORS.EMAIL) &&
      field.email != null &&
      field.email != false
    ) {
      validators.push(Validators.email);
    }
    if (field.hasOwnProperty(VALIDATORS.PATTERN) && field.Pattern != null) {
      validators.push(Validators.pattern(field.Pattern));
    }
    const options: AbstractControlOptions = {
      validators: validators,
      updateOn: field.updateOn || 'submit',
    };
    return options;
  }

  //   <hello></hello> line 29
  // Here we create the component.
  private createComponentFromRaw(
    fields2: any,
    form: any,
    template: string,
    customTemplate: string,
    model: any
  ) {
    // Let's say your template looks like `<h2><some-component [data]="data"></some-component>`
    // As you see, it has an (existing) angular component `some-component` and it injects it [data]

    // Now we create a new component. It has that template, and we can even give it data.
    const styles = [];
    let info: any = {};

    if (customTemplate && customTemplate != '') {
      template = customTemplate;
      for (const iterator of fields2) {
        info[iterator.Id] = iterator;

        template = template.replace(
          `[${iterator.Id}.Name]`,
          `<field-label [field]="data.${iterator.Id}" [form]="form"></field-label>`
        );
        template = template.replace(
          `[${iterator.Id}.Response]`,
          `<custom-field-builder [field]="data.${iterator.Id}" [form]="form"></custom-field-builder>`
        );
        if (iterator.AdditionalInstructions) {
          let decodedData = this.decodeAdditionalInstruction(
            iterator.AdditionalInstructions
          );
          template = template.replace(
            `[${iterator.Id}.AdditionalInstructions]`,
            decodedData
          );
        }
      }
    } else {
      if (template && template != '') {
        for (const iterator of fields2) {
          info[iterator.Id] = iterator;

          template = template.replace(
            `[${iterator.Id}]`,
            `<field-builder [model]="data.model" [field]="data.${iterator.Id}" [form]="form"></field-builder>`
          );
        }
      } else {
        for (const iterator of fields2) {
          info[iterator.Id] = iterator;
          template =
            template +
            `
                <div class='row'><div class='col-md-12'>
                <field-builder [field]="data.${iterator.Id}" [form]="form"></field-builder>
                </div></div>
                `;
        }
      }
    }

    this.htmlFields = fields2;
    const { rootNodes, errors } = parse(template);

    this.nodeElements = this.cleanseElements(rootNodes);

    function TmpCmpConstructor() {
      this.data = info;
      this.data.fields = fields2;
      this.data.model = model;
      this.formChange = new EventEmitter();
      this.formChangeed = () => console.debug('select');
      this.formChange.emit(this);
      this.fieldsChange = new EventEmitter();
      this.fieldsChanged = () => console.debug('select');
      this.modelChange = new EventEmitter();
      this.modelChanged = () => console.debug('select');
    }
    const selector = 'dynamic-field-builder';
    const tmpCmp = Component({ selector, template, styles })(
      new TmpCmpConstructor().constructor
    );

    // Now, also create a dynamic module.
    const tmpModule = NgModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FieldBuilderModule,
        CustomFieldBuilderModule,
        FieldLabelModule,
        TooltipModule,
        LayoutModule,
      ],
      declarations: [tmpCmp],
      schemas: [NO_ERRORS_SCHEMA],

      providers: [],
      exports: [tmpCmp],

      // providers: [] - e.g. if your dynamic component needs any service, provide it here.
    })(class {});

    window['dui_form'] = {
      service: this,
      form: this.form,
      fields: this.fields,
    };
    this.formBuilderHelperService.initialize(
      this.form,
      null,
      this.interCommService,
      this.dataRow,
      null,
      this.fields,
      this.formControlActions
    );

    this.formChange.emit(this.form);
    this.fieldsChange.emit(this.fields);
    this.modelChange.emit(this.formmodel);

    let doc = new DOMParser().parseFromString(template, 'text/html');
    if (doc.getElementsByTagName('style').length > 0) {
      document.head.insertAdjacentHTML(
        'beforeend',
        '<style>' + doc.getElementsByTagName('style')[0].innerHTML + '</style>'
      );
    }
    if (doc.getElementsByTagName('script').length > 0) {
      eval(doc.getElementsByTagName('script')[0].innerHTML);
    }
  }

  cleanseElements(nodeElements) {
    let tempElements = nodeElements.filter(
      (rn) =>
        rn.type == 'element' ||
        (rn.type == 'text' &&
          rn.value.indexOf('\n') == -1 &&
          rn.value.trim().length > 0)
    );
    let currentField = null;
    nodeElements.forEach((element) => {
      if (element.attrs != undefined && element.attrs.length > 0) {
        let fieldAttribute = element.attrs.find((a) => a.name == '[field]');
        if (fieldAttribute != undefined) {
          fieldAttribute = fieldAttribute.value.split('.')[1];
          currentField = this.htmlFields.find((f) => f.Id == fieldAttribute);
          element.field = currentField;
        } else {
          element.field = undefined;
        }
      }
      if (element.children != undefined && element.children.length > 0) {
        element.children = this.cleanseElements(element.children);
      }
    });
    return tempElements;
  }

  decodeAdditionalInstruction(questionAdditionalInstructions: string) {
    let instruction = questionAdditionalInstructions;
    const filterPipe = new HtmldecoderPipe(this.sanitizer);
    instruction = filterPipe.transform(instruction);
    return instruction;
  }
  // Cleanup properly. You can add more cleanup-related stuff here.
  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
      this.formChange.unsubscribe();
    }
  }

  getParentClassName(element: any) {
    let parentElementClassName = '';
    if (element.attrs.find((a) => a.name == 'class') != undefined) {
      parentElementClassName = element.attrs.find(
        (a) => a.name == 'class'
      ).value;
    }
    return parentElementClassName;
  }

  getParentStyle(element: any) {
    let parentElementStyle = '';
    if (element.attrs.find((a) => a.name == 'style') != undefined) {
      parentElementStyle = element.attrs.find((a) => a.name == 'style').value;
    }
    let convertedStyle = this.parseCSSText(parentElementStyle).style;
    return convertedStyle;
  }

  getParentElementId(element: any) {
    let parentElementId = '';
    if (element.attrs.find((a) => a.name == 'id') != undefined) {
      parentElementId = element.attrs.find((a) => a.name == 'id').value;
    }
    return parentElementId;
  }

  parseCSSText(cssText) {
    var cssTxt = cssText.replace(/\/\*(.|\s)*?\*\//g, ' ').replace(/\s+/g, ' ');
    var style = {},
      [, ruleName, rule] = cssTxt.match(/ ?(.*?) ?{([^}]*)}/) || [, , cssTxt];
    var cssToJs = (s) =>
      s.replace(/\W+\w/g, (match) => match.slice(-1).toUpperCase());
    var properties = rule
      .split(';')
      .map((o) => o.split(':').map((x) => x && x.trim()));
    for (var [property, value] of properties) style[cssToJs(property)] = value;
    return { cssText, ruleName, style };
  }
}
