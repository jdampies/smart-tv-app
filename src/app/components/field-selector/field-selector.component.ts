import { Component, Input, OnInit } from '@angular/core';
import { StateAndDispatcher } from 'src/app/state-and-dispatcher';
import { Field } from 'src/app/interfaces/field.interface';

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
export class FieldComponent implements OnInit{
  @Input() field: Field;

  @Input() firstIndex: number;

  public selected: string = '';

  constructor(
    private store: StateAndDispatcher
  ) {}

  ngOnInit(){
    if(this.firstIndex === 0){
      this.selectField();
    }
  }

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
