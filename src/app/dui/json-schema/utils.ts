export const VALIDATOR_CONFIG = [
  'Required',
  'MaxLength',
  'MinLength',
  'min',
  'max',
  'email',
  'pattern',
];
export const VALIDATORS = {
  REQUIRED: 'Required',
  MAX_LENGTH: 'MaxLength',
  MIN_LENGTH: 'MinLength',
  MIN: 'MinValue',
  MAX: 'MaxValue',
  EMAIL: 'email',
  PATTERN: 'Pattern',
};
export const OptionType = {
  STATIC: 'static',
  DYNAMIC: 'dynamic',
};

export const FORMCONFIG = {
  KEY: 'Key',
  VALUE: 'Value',
  SELECTALL: 'Select All',
  UNSELECTALL: 'Unselect All',
  STARTDATE: 'Start Date',
  ENDDATE: 'End Date',
};

export const MESSAGES = {
  DOCUMENTMAXLIMIT: 'You have reached max limit ',
  DOCUMENTERROR: 'Please provide proper document link , Error',
  ERROR: 'Error',
};
export function assignFieldValue(field: any, value: any, model: any) {
  field.value = value;
  assignModelValue(field, value, model);
}
export function assignModelValue(field: any, value: any, model: any) {
  model[field.Name] = value;
  field.model = model;
}

export function getKeyPath(field: any): string[] {
  if (!field.key) {
    return [];
  }

  /* We store the keyPath in the field for performance reasons. This function will be called frequently. */
  if (!field._keyPath || field._keyPath.key !== field.key) {
    let path: string[] = [];
    if (typeof field.key === 'string') {
      const key =
        field.key.indexOf('[') === -1
          ? field.key
          : field.key.replace(/\[(\w+)\]/g, '.$1');
      path = key.indexOf('.') !== -1 ? key.split('.') : [key];
    } else if (Array.isArray(field.key)) {
      path = field.key.slice(0);
    } else {
      path = [`${field.key}`];
    }

    field._keyPath = { key: field.key, path };
  }

  return field._keyPath.path.slice(0);
}
