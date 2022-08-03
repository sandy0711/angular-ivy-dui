import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../json-schema/form-builder-config';

@Component({
  selector: 'field-generator',
  templateUrl: './field-generator.component.html',
  styleUrls: ['./field-generator.component.css'],
})
export class FieldGeneratorComponent implements OnInit {
  @Input() element: any;
  @Input() field: FieldConfig;
  @Input() form: FormGroup;

  childElements: any[];
  hasChildElements: boolean = false;
  elementClassName: string = '';
  elementStyle: string = '';

  constructor() {}

  ngOnInit() {
    if (
      this.element.children != undefined &&
      this.element.children.length > 0
    ) {
      this.childElements = this.element.children;
      this.hasChildElements = true;
    }
  }

  getChildElementHref(childElement: any) {
    let childElementClassName = '';
    if (
      childElement.attrs != undefined &&
      childElement.attrs.find((a) => a.name == 'href') != undefined
    ) {
      childElementClassName = childElement.attrs.find(
        (a) => a.name == 'href'
      ).value;
    }
    return childElementClassName;
  }

  getChildElementClassName(childElement: any) {
    let childElementClassName = '';
    if (
      childElement.attrs != undefined &&
      childElement.attrs.find((a) => a.name == 'class') != undefined
    ) {
      childElementClassName = childElement.attrs.find(
        (a) => a.name == 'class'
      ).value;
    }
    return childElementClassName;
  }

  getChildElementStyle(childElement: any) {
    let childElementStyle = '';
    if (
      childElement.attrs != undefined &&
      childElement.attrs.find((a) => a.name == 'style') != undefined
    ) {
      childElementStyle = childElement.attrs.find(
        (a) => a.name == 'style'
      ).value;
    }
    let convertedStyle = this.parseCSSText(childElementStyle).style;
    return convertedStyle;
  }

  getChildElementId(childElement: any) {
    let childElementId = '';
    if (
      childElement.attrs != undefined &&
      childElement.attrs.find((a) => a.name == 'id') != undefined
    ) {
      childElementId = childElement.attrs.find((a) => a.name == 'id').value;
    }
    return childElementId;
  }

  getChildElementSize(childElement: any) {
    let childElementSize = '';
    if (
      childElement.attrs != undefined &&
      childElement.attrs.find((a) => a.name == 'size') != undefined
    ) {
      childElementSize = childElement.attrs.find((a) => a.name == 'size').value;
    }
    return childElementSize;
  }

  getChildElementTitle(childElement: any) {
    let childElementTitle = '';
    if (
      childElement.attrs != undefined &&
      childElement.attrs.find((a) => a.name == 'title') != undefined
    ) {
      childElementTitle = childElement.attrs.find(
        (a) => a.name == 'title'
      ).value;
    }
    return childElementTitle;
  }

  getChildElementType(childElement: any) {
    let childElementType = '';
    if (
      childElement.attrs != undefined &&
      childElement.attrs.find((a) => a.name == 'type') != undefined
    ) {
      childElementType = childElement.attrs.find((a) => a.name == 'type').value;
    }
    return childElementType;
  }

  getChildElementName(childElement: any) {
    let childElementName = '';
    if (
      childElement.attrs != undefined &&
      childElement.attrs.find((a) => a.name == 'name') != undefined
    ) {
      childElementName = childElement.attrs.find((a) => a.name == 'name').value;
    }
    return childElementName;
  }

  getChildElementValue(childElement: any) {
    let childElementValue = '';
    if (
      childElement.attrs != undefined &&
      childElement.attrs.find((a) => a.name == 'value') != undefined
    ) {
      childElementValue = childElement.attrs.find(
        (a) => a.name == 'value'
      ).value;
    }
    return childElementValue;
  }

  getChildElementFor(childElement: any) {
    let childElementFor = '';
    if (
      childElement.attrs != undefined &&
      childElement.attrs.find((a) => a.name == 'for') != undefined
    ) {
      childElementFor = childElement.attrs.find((a) => a.name == 'for').value;
    }
    return childElementFor;
  }

  getChildElementOnInput(childElement: any) {
    let childElementOnInput = '';
    if (
      childElement.attrs != undefined &&
      childElement.attrs.find((a) => a.name == 'oninput') != undefined
    ) {
      childElementOnInput = childElement.attrs.find(
        (a) => a.name == 'oninput'
      ).value;
    }
    return childElementOnInput;
  }

  getChildElementImgSrc(childElement: any) {
    let childElementSrc = '';
    if (
      childElement.attrs != undefined &&
      childElement.attrs.find((a) => a.name == 'src') != undefined
    ) {
      childElementSrc = childElement.attrs.find((a) => a.name == 'src').value;
    }
    return childElementSrc;
  }

  getChildElementFontColor(childElement: any) {
    let color = '';
    if (
      childElement.attrs != undefined &&
      childElement.attrs.find((a) => a.name == 'color') != undefined
    ) {
      color = childElement.attrs.find((a) => a.name == 'color').value;
    }
    return color;
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
