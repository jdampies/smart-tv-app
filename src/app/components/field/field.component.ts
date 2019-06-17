import { Component, OnInit, Input } from '@angular/core';
import { Field } from 'src/app/interfaces/field.interface';
import { StateAndDispatcher } from 'src/app/state-and-dispatcher';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
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
