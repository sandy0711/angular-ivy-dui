import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTemplateComponent } from './dynamic-form-builder.component';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { COMPILER_OPTIONS, CompilerFactory } from '@angular/core';
import { FieldGeneratorModule } from './field-generator/field-generator.module';
@NgModule({
  imports: [CommonModule, FieldGeneratorModule],
  declarations: [DynamicTemplateComponent],
  exports: [DynamicTemplateComponent],
  // bootstrap:[DynamicTemplateComponent],
  providers: [
    { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
    {
      provide: CompilerFactory,
      useClass: JitCompilerFactory,
      deps: [COMPILER_OPTIONS],
    },
  ],
})
export class DynamicFormBuilderModule {}
