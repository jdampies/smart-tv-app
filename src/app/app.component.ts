import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { StateAndDispatcher } from './state-and-dispatcher';
import { map } from 'rxjs/operators';
import { Field } from './interfaces/field.interface';
import { Project } from './interfaces/project.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app-smart-tv';

  @ViewChild('menu') menu: ElementRef;
  @ViewChild('grid') grid: ElementRef;
  @ViewChild('loader') loader: ElementRef;

  fields$: Observable<Field[]>;
  fields: Field[];

  projects$: Observable<Project[]>;
  projects: Project[];

  fullScreen$: Observable<boolean>;
  fullScreen: boolean;

  loading$: Observable<boolean>;
  loading: boolean;

  initLoad: boolean = false;

  constructor(
    private store: StateAndDispatcher,
    private _renderer: Renderer2
  ) {
    this.fields,
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

    this.fullScreen$ = this.store.observe()
      .pipe(map(state => state.ui.fullScreen))

    this.fullScreen$.subscribe(() => {
      this.fullScreen = this.store.state.ui.fullScreen;

      this.enterExitFullScreen();
    })

    this.loading$ = this.store.observe()
      .pipe(map(state => state.ui.loading))

    this.loading$.subscribe(() => {
      this.loading = this.store.state.ui.loading;

      if(this.loading && !this.initLoad){
        this.initLoad = true;
        this.addRemoveActiveLoaderCssClass(true);
      }
      else if(this.loading && this.initLoad){
        this.removeFixedLoaderCssClass();
        this.addRemoveActiveLoaderCssClass(true);
      }
      else {
        this.addRemoveActiveLoaderCssClass(false);
      }
    })
  }

  addRemoveActiveLoaderCssClass(show:boolean) {
    if(show) {
      this._renderer.addClass(this.loader.nativeElement, 'active');
    }
    else {
      this._renderer.removeClass(this.loader.nativeElement, 'active');
    }
  }

  removeFixedLoaderCssClass() {
    this._renderer.removeClass(this.loader.nativeElement, 'fixed');
  }

  enterExitFullScreen() {
    if(this.fullScreen){
      this._renderer.setStyle(this.menu.nativeElement, 'margin-left', '-100%');
      this._renderer.addClass(this.grid.nativeElement, 'full-width');
    }
    else {
      this._renderer.removeStyle(this.menu.nativeElement, 'margin-left');
      this._renderer.removeClass(this.grid.nativeElement, 'full-width');
    }
  }
}
