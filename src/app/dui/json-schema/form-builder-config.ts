import { observable, Observable } from 'rxjs';

export interface FormBuilderConfig {
  fields?: Array<
    SingleLine | Decimal | SingleSelectDDL | MultiSelectList | DateField
  >;
  DataSources?: DataSource[];
}

export interface DataSource {
  Name: string;
  Type: string;
  List?: [];
  Options?: [] | Observable<any>;
  DataValueField?: string;
  DataTextField?: string;
}

export interface List {
  Key: string;
  Value: string;
}

export enum DisplayTypes {
  TextBox = 1,
  TextArea = 2,
  Slider = 3,
  DropDownList = 4,
  AutoComplete = 5,
  ComboBox = 6,
  RadioButton = 7,
  CheckBox = 8,
  DatePicker = 9,
  DateInput = 10,
  DatetimePicker = 11,
  DateRange = 12,
  ListBox = 13,
  HtmlTextEditor = 16,
  AdhocReport = 1027,
  Label = 1028,
  Hidden = 1029,
  SurveyNotes = 1031,
  ExcelViewer = 1032,
  ActionButton = 1033,
}

export enum FieldType {
  SingleLine = 1,
  SingleSelect = 2,
  MultiSelect = 3,
  Date = 4,
  SingleFileUpload = 5,
  MultipleFileUpload = 6,
  Decimal = 7,
  History = 8,
  Document = 9,
  Custom = 10,
  Message = 11,
  CheckBox = 12,
  Button = 20,
  HtmlTextEditor = 16,
  AdhocReport = 1027,
  Hidden = 1029,
  SurveyNotes = 1031,
  ExcelViewer = 1032,
  ActionButton = 1033,
}
export class FieldConfig {
  Type:
    | FieldType.SingleLine
    | FieldType.SingleSelect
    | FieldType.Date
    | FieldType.Decimal
    | FieldType.MultiSelect
    | FieldType.MultipleFileUpload
    | FieldType.SingleFileUpload
    | FieldType.Document
    | FieldType.Message
    | FieldType.HtmlTextEditor
    | FieldType.AdhocReport
    | FieldType.ActionButton;
  Name: string;
  Label?: string;
  errors?: any;
  value?: any;
  Required: boolean;
  Id: string;
  updateOn?: string;
  DisplayType: any;
  templateOptions?: any;
  events?: any;
  Code?: any;
  QuestionId?: any;
  UniqueId?: any;
  MValChildUniqueId?: any;
  ParentUniqueId?: any;
  Comment?: any;
  Responses?: any;
  ResponsesFromUi?: any;
  AdditionalInstructions?: any;
}

export interface Option {
  Key: string;
  Value: string;
}
export interface TemplateOptions {
  ClassName: string;
}

export interface ISingleLine extends FieldConfig {
  MinLength?: number;
  MaxLength?: number;

  placeholder?: string;
  Masking?: string;
  pattern?: string;
  email?: true;
}
export interface IDecimal extends FieldConfig {
  MinValue?: number;
  MaxValue?: number;

  placeholder?: string;
  format?: string;
  autoCorrect?: boolean;

  decimals?: number;
}
export interface ISingleSelectDDL extends FieldConfig {
  Filterable?: boolean;
  parent?: string;
  child?: string;
  Options?: [] | Observable<any>;
  defaultItem?: any;
  selectedValue?: string | {};
  isDisabled?: boolean;
  Title?: string;
  DataValueField?: string;
  DataTextField?: string;
  OptionsDataSource: string;
}

export interface IMultiSelectList extends FieldConfig {
  minItems?: number;
  maxItems?: number;

  Filterable?: boolean;
  Options?: [] | Observable<any>;
  defaultItem?: any;
  selectedValue?: string | {};
  isDisabled?: boolean;
  Title?: string;
  DataValueField?: string;
  DataTextField?: string;
  OptionsDataSource: string;
}
export interface ISingleFileUpload extends FieldConfig {
  acceptedExtension?: any;
  maxFileSize: number;
  displayText?: string;
  allowComments: boolean;
  autoUpload: boolean;
  infoMessage?: string;
}
export interface IMultipleFileUpload extends FieldConfig {
  multipleFiles: boolean;
  acceptedExtension?: any;
  maxFileSize: number;
  displayText?: string;
  allowComments: boolean;
  autoUpload: boolean;
  infoMessage: string;
  maxFileCount: number;
}
export interface IDateField extends FieldConfig {
  MaxDate?: Date;
  MinDate?: Date;

  Navigation?: string;
  focusedDate1?: string;
  Title?: string;
  isDisabled?: boolean;

  format?: string;
  increamentby?: number;
  placeholder?: string;
  range?: any;
}

export interface IDocument extends FieldConfig {
  maxFileCount: number;
  minFileCount: number;
  isDisabled?: boolean;
}

export interface IAdhocReport extends FieldConfig {
  AdhocReportCode: string;
  AdditionalParameters?: AdditionalParameter[];
}

export class AdditionalParameter {
  Name?: string;
  Value?: string;
}

export class AdhocReport implements IAdhocReport {
  Type: FieldType.AdhocReport;
  AdhocReportCode: string;
  AdditionalParameters?: AdditionalParameter[];

  Name: string;
  Label?: string;
  errors?: any;
  value?: any;
  Required: boolean;
  Id: string;
  updateOn?: string;
  DisplayType: any;
  templateOptions?: any;
  events?: any;
  Code?: any;
  QuestionId?: any;
  UniqueId?: any;
  MValChildUniqueId?: any;
  ParentUniqueId?: any;
  Comment?: any;
  Responses?: any;
  ResponsesFromUi?: any;
}

export class SingleLine implements ISingleLine {
  Type:
    | FieldType.SingleLine
    | FieldType.SingleSelect
    | FieldType.Date
    | FieldType.Decimal
    | FieldType.MultiSelect
    | FieldType.MultipleFileUpload
    | FieldType.SingleFileUpload
    | FieldType.Document
    | FieldType.HtmlTextEditor;
  MinLength?: number;
  MaxLength?: number;
  placeholder?: string;
  Masking?: string;
  pattern?: string;
  email?: true;

  Name: string;
  Label?: string;
  errors?: any;
  value?: any;
  Required: boolean;
  Id: string;
  updateOn?: string;
  DisplayType: any;
  templateOptions?: any;
  events?: any;
  Code?: any;
  QuestionId?: any;
  UniqueId?: any;
  MValChildUniqueId?: any;
  ParentUniqueId?: any;
  Comment?: any;
  Responses?: any;
  ResponsesFromUi?: any;
}
export class Decimal implements IDecimal {
  Type:
    | FieldType.SingleLine
    | FieldType.SingleSelect
    | FieldType.Date
    | FieldType.Decimal
    | FieldType.MultiSelect
    | FieldType.MultipleFileUpload
    | FieldType.SingleFileUpload
    | FieldType.Document;
  MinValue?: number;
  MaxValue?: number;
  placeholder?: string;
  format?: string;
  autoCorrect?: boolean;
  decimals?: number;

  Name: string;
  Label?: string;
  errors?: any;
  value?: any;
  Required: boolean;
  Id: string;
  updateOn?: string;
  DisplayType: any;
  templateOptions?: any;
  events?: any;
  Code?: any;
  QuestionId?: any;
  UniqueId?: any;
  MValChildUniqueId?: any;
  ParentUniqueId?: any;
  Comment?: any;
  Responses?: any;
  ResponsesFromUi?: any;
}
export class SingleSelectDDL implements ISingleSelectDDL {
  Type:
    | FieldType.SingleLine
    | FieldType.SingleSelect
    | FieldType.Date
    | FieldType.Decimal
    | FieldType.MultiSelect
    | FieldType.MultipleFileUpload
    | FieldType.SingleFileUpload
    | FieldType.Document;
  OptionsDataSource: string;
  Filterable?: boolean;
  parent?: string;
  child?: string;
  Options?;
  defaultItem?: any;
  selectedValue?: string | {};
  isDisabled?: boolean;
  Title?: string;
  DataValueField?: string;
  DataTextField?: string;

  Name: string;
  Label?: string;
  errors?: any;
  value?: any;
  Required: boolean;
  Id: string;
  updateOn?: string;
  DisplayType: any;
  templateOptions?: any;
  events?: any;
  Code?: any;
  QuestionId?: any;
  UniqueId?: any;
  MValChildUniqueId?: any;
  ParentUniqueId?: any;
  Comment?: any;
  Responses?: any;
  ResponsesFromUi?: any;
}
export class DateField implements IDateField {
  Type:
    | FieldType.SingleLine
    | FieldType.SingleSelect
    | FieldType.Date
    | FieldType.Decimal
    | FieldType.MultiSelect
    | FieldType.MultipleFileUpload
    | FieldType.SingleFileUpload
    | FieldType.Document;
  MaxDate?: Date;
  MinDate?: Date;
  Navigation?: string;
  focusedDate1?: string;
  Title?: string;
  isDisabled?: boolean;
  format?: string;
  increamentby?: number;
  placeholder?: string;
  range?: any;

  Name: string;
  Label?: string;
  errors?: any;
  value?: any;
  Required: boolean;
  Id: string;
  updateOn?: string;
  DisplayType: any;
  templateOptions?: any;
  events?: any;
  Code?: any;
  QuestionId?: any;
  UniqueId?: any;
  MValChildUniqueId?: any;
  ParentUniqueId?: any;
  Comment?: any;
  Responses?: any;
  ResponsesFromUi?: any;
}
export class MultiSelectList implements IMultiSelectList {
  Type:
    | FieldType.SingleLine
    | FieldType.SingleSelect
    | FieldType.Date
    | FieldType.Decimal
    | FieldType.MultiSelect
    | FieldType.MultipleFileUpload
    | FieldType.SingleFileUpload
    | FieldType.Document;
  OptionsDataSource: string;
  minItems?: number;
  maxItems?: number;
  Filterable?: boolean;
  Options?;
  defaultItem?: any;
  selectedValue?: string | {};
  isDisabled?: boolean;
  Title?: string;
  DataValueField?: string;
  DataTextField?: string;

  Name: string;
  Label?: string;
  errors?: any;
  value?: any;
  Required: boolean;
  Id: string;
  updateOn?: string;
  DisplayType: any;
  templateOptions?: any;
  events?: any;
  Code?: any;
  QuestionId?: any;
  UniqueId?: any;
  MValChildUniqueId?: any;
  ParentUniqueId?: any;
  Comment?: any;
  Responses?: any;
  ResponsesFromUi?: any;
}
export class SingleFileUpload implements ISingleFileUpload {
  Type:
    | FieldType.SingleLine
    | FieldType.SingleSelect
    | FieldType.Date
    | FieldType.Decimal
    | FieldType.MultiSelect
    | FieldType.MultipleFileUpload
    | FieldType.SingleFileUpload
    | FieldType.Document;
  OptionsDataSource: string;
  minItems?: number;
  maxItems?: number;
  Filterable?: boolean;
  Options?;
  defaultItem?: any;
  selectedValue?: string | {};
  isDisabled?: boolean;
  Title?: string;
  DataValueField?: string;
  DataTextField?: string;

  Name: string;
  Label?: string;
  errors?: any;
  value?: any;
  Required: boolean;
  Id: string;
  updateOn?: string;
  DisplayType: any;
  templateOptions?: any;
  events?: any;
  Code?: any;
  QuestionId?: any;
  UniqueId?: any;
  MValChildUniqueId?: any;
  ParentUniqueId?: any;
  Comment?: any;
  Responses?: any;
  ResponsesFromUi?: any;
  acceptedExtension?: any;
  maxFileSize: number;
  displayText?: string;
  allowComments: boolean;
  autoUpload: boolean;
  infoMessage?: string;
}

export class MultipleFileUpload implements IMultipleFileUpload {
  Type:
    | FieldType.SingleLine
    | FieldType.SingleSelect
    | FieldType.Date
    | FieldType.Decimal
    | FieldType.MultiSelect
    | FieldType.MultipleFileUpload
    | FieldType.SingleFileUpload
    | FieldType.Document;
  OptionsDataSource: string;
  minItems?: number;
  maxItems?: number;
  Filterable?: boolean;
  Options?;
  defaultItem?: any;
  selectedValue?: string | {};
  isDisabled?: boolean;
  Title?: string;
  DataValueField?: string;
  DataTextField?: string;

  Name: string;
  Label?: string;
  errors?: any;
  value?: any;
  Required: boolean;
  Id: string;
  updateOn?: string;
  DisplayType: any;
  templateOptions?: any;
  events?: any;
  Code?: any;
  QuestionId?: any;
  UniqueId?: any;
  MValChildUniqueId?: any;
  ParentUniqueId?: any;
  Comment?: any;
  Responses?: any;
  ResponsesFromUi?: any;
  multipleFiles: boolean;
  acceptedExtension?: any;
  maxFileSize: number;
  displayText?: string;
  allowComments: boolean;
  autoUpload: boolean;
  infoMessage: string;
  maxFileCount: number;
}

export class Document implements IDocument {
  Type:
    | FieldType.SingleLine
    | FieldType.SingleSelect
    | FieldType.Date
    | FieldType.Decimal
    | FieldType.MultiSelect
    | FieldType.MultipleFileUpload
    | FieldType.SingleFileUpload
    | FieldType.Document;
  OptionsDataSource: string;
  minItems?: number;
  maxItems?: number;
  Filterable?: boolean;
  Options?;
  defaultItem?: any;
  selectedValue?: string | {};
  isDisabled?: boolean;
  Title?: string;
  DataValueField?: string;
  DataTextField?: string;
  Name: string;
  Label?: string;
  errors?: any;
  value?: any;
  Required: boolean;
  Id: string;
  updateOn?: string;
  DisplayType: any;
  templateOptions?: any;
  events?: any;
  Code?: any;
  QuestionId?: any;
  UniqueId?: any;
  MValChildUniqueId?: any;
  ParentUniqueId?: any;
  Comment?: any;
  Responses?: any;
  ResponsesFromUi?: any;
  maxFileCount: number;
  minFileCount: number;
}
