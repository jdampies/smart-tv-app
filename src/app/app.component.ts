import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { StateAndDispatcher } from './state-and-dispatcher';
import { map } from 'rxjs/operators';
import { Field } from './field';
import { Project } from './project';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app-smart-tv';

  fields$: Observable<Field[]>;
  fields: Field[];

  projects$: Observable<Project[]>;
  projects: Project[];

  constructor(
    private store: StateAndDispatcher
  ) {
    this.fields
    this.projects = [];
  }

  ngOnInit() {
    this.fields$ = this.store.observe()
      .pipe(map(state => state.fields))

    this.fields$.subscribe(fields => {
      if(!Array.isArray(fields) || !fields.length){
        this.store.dispatch("FETCH_FIELDS");
      }

      this.fields = this.store.state.fields;
    })

    this.projects$ = this.store.observe()
      .pipe(map(state => state.projects))

    this.projects$.subscribe(() => {
      this.projects = this.store.state.projects;
    })
  }
}
