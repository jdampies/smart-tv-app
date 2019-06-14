import { Injectable, Output, EventEmitter } from '@angular/core';
import { Store } from './store';
import { BaseService } from './base.service';
import { Field } from './field';
import { Project } from './project';

export class ModelState {
  client_id: string = "jVW6FSzwGV33StOvuK96k8D9ZV71embF";
  projects: Project[];
  fields: Field[];
  selectedField: string;
  ui = {
    counter: 0,
    imageWidth: 0
  }
}

@Injectable()
export class StateAndDispatcher extends Store<ModelState>{
  constructor(
    private baseService: BaseService
  ){
    super(new ModelState());
  }

  dispatch(action: string, payload?: any){
    switch(action){
      case "FETCH_FIELDS":
        this.baseService.getFields(this.state.client_id).subscribe(
          (data:any) => {
            if(data.http_code === 200){
              this.dispatch("SAVE_FIELDS", data.popular);
            }
          }
        )
        break;

      case "SAVE_FIELDS":
        this.setState({
          ...this.state,
          fields: payload
        })
        break;

      case "SET_SELECTED_FIELD":
        this.setState({
          ...this.state,
          selectedField: payload
        })
        this.dispatch("FETCH_PROJECTS");

        break;

      case "FETCH_PROJECTS":
        this.baseService.getProjects(this.state.client_id, this.state.selectedField).subscribe(
          (data:any) => {
            if(data.http_code === 200){
              this.dispatch("SAVE_PROJECTS", data.projects);

              console.log(this.state.projects);
            }
          }
        )
        break;

      case "SAVE_PROJECTS":
        this.setState({
          ...this.state,
          projects: payload
        })
        break;

      case "SLIDE_LEFT":
        this.setState({
          ...this.state,
          ui: {
            ...this.state.ui,
            counter: this.state.ui.counter - 1
          }
        })

        break;

      case "SLIDE_RIGHT":
        this.setState({
          ...this.state,
          ui: {
            ...this.state.ui,
            counter: this.state.ui.counter + 1
          }
        })

        break;
    }
  }
}
