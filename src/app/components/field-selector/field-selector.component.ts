import { Component, Input } from '@angular/core';
import { Field } from 'src/app/interfaces/field.interface';

@Component({
  selector: 'app-field-selector',
  templateUrl: './field-selector.component.html',
  styleUrls: ['./field-selector.component.scss']
})
export class FieldSelectorComponent {
  @Input() fields: Field[];
  constructor() {}

  trackField(index, field) {
    // console.log(field);
    return field ? field.id : undefined;
  }
}
