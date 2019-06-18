import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { StateAndDispatcher } from './state-and-dispatcher';
import { map } from 'rxjs/operators';
import { Field } from './interfaces/field.interface';
import { Project } from './interfaces/project.interface';
import { Observable, Subscription } from 'rxjs';

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

  sub1:Subscription;
  sub2:Subscription;
  sub3:Subscription;
  sub4:Subscription;

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

    this.sub1 = this.fields$.subscribe(fields => {
      if(!Array.isArray(fields) || !fields.length){
        this.store.dispatch("FETCH_FIELDS");
      }

      this.fields = this.store.state.fields;
    })

    this.projects$ = this.store.observe()
      .pipe(map(state => state.projects))

    this.sub2 = this.projects$.subscribe(() => {
      if(!this.arrayCompare(this.projects, this.store.state.projects)){
        this.projects = this.store.state.projects;
      }
    })

    this.fullScreen$ = this.store.observe()
      .pipe(map(state => state.ui.fullScreen))

    this.sub3 = this.fullScreen$.subscribe(() => {
      this.fullScreen = this.store.state.ui.fullScreen;

      this.enterExitFullScreen();
    })

    this.loading$ = this.store.observe()
      .pipe(map(state => state.ui.loading))

    this.sub4 = this.loading$.subscribe(() => {
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

  arrayCompare(arr1, arr2){
    if(!arr1  || !arr2) return;

    let result: boolean;

    arr1.forEach((e1,i:number) => arr2.forEach((e2) =>{
        if(e1.length > 1 && e2.length){
          result = this.arrayCompare(e1,e2);
        }else if(e1 !== e2 ){
          result = false;
        }else{
          result = true;
        }
      })
    )

    return result;
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
      this._renderer.addClass(this.menu.nativeElement, 'off-page');
      this._renderer.addClass(this.grid.nativeElement, 'full-width');
    }
    else {
      this._renderer.removeClass(this.menu.nativeElement, 'off-page');
      this._renderer.removeClass(this.grid.nativeElement, 'full-width');
    }
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
  }
}
