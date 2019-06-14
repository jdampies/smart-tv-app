import { Component, Input } from '@angular/core';
import { StateAndDispatcher } from '../state-and-dispatcher';
import { Field } from '../field';

@Component({
  selector: 'app-field-selector',
  templateUrl: './field-selector.component.html',
  styleUrls: ['./field-selector.component.scss']
})
export class FieldSelectorComponent {
  @Input() fields: Field[];
  constructor() {}
}

@Component({
  selector: 'app-field',
  styleUrls: ['./field.component.scss'],
  template: `
  <li
    [attr.id]="field.encoded_name"
    (click)="selectField()"
    [class]="setSelected()">
      <span>{{ field.name }}</span>
  </li>`
})
export class FieldComponent{
  @Input() field: Field;

  public selected: string = '';

  constructor(
    private store: StateAndDispatcher
  ) {}

  selectField() {
    if(this.selected !== this.store.state.selectedField){
      this.store.dispatch("SET_SELECTED_FIELD", this.field.encoded_name);
      this.selected = this.store.state.selectedField;
    }

    this.setSelected();
  }

  setSelected() {
    return this.selected === this.store.state.selectedField ? 'selected' : '';
  }
}
