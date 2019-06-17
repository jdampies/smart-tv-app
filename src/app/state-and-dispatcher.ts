import { Injectable } from '@angular/core';
import { Store } from './store';
import { BaseService } from './services/base.service';
import { Field } from './interfaces/field.interface';
import { Project } from './interfaces/project.interface';

export class ModelState {
  client_id: string = "jVW6FSzwGV33StOvuK96k8D9ZV71embF";
  projects: Project[];
  fields: Field[];
  selectedField: string;
  ui = {
    counter: 0,
    loading: true,
    fullScreen: false
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
          },
          (err) => console.error(err)
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

        this.dispatch("RESET_COUNTER");

        break;

      case "FETCH_PROJECTS":
        this.dispatch("SHOW_LOADER", true);

        this.baseService.getProjects(this.state.client_id, this.state.selectedField).subscribe(
          (data:any) => {
            if(data.http_code === 200){
              this.dispatch("SHOW_LOADER", false);

              this.dispatch("SAVE_PROJECTS", data.projects);
            }
          },
          (err) => console.error(err)
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

        this.dispatch("SET_FULL_SCREEN");

        break;

      case "SLIDE_RIGHT":
        this.setState({
          ...this.state,
          ui: {
            ...this.state.ui,
            counter: this.state.ui.counter + 1
          }
        })

        this.dispatch("SET_FULL_SCREEN");

        break;

      case "RESET_COUNTER":
        this.setState({
          ...this.state,
          ui: {
            ...this.state.ui,
            counter: 0
          }
        })

        break;

      case "SET_FULL_SCREEN":
        if(!this.state.ui.fullScreen) {
          this.setState({
            ...this.state,
            ui: {
              ...this.state.ui,
              fullScreen: true
            }
          })

        }

        break;

      case "EXIT_FULL_SCREEN":
        this.setState({
          ...this.state,
          ui: {
            ...this.state.ui,
            fullScreen: false
          }
        })

        break;

      case "SHOW_LOADER":
        this.setState({
          ...this.state,
          ui: {
            ...this.state.ui,
            loading: payload
          }
        })

        break;
    }
  }
}
