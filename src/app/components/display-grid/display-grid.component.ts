import { Component, Input, OnInit, OnChanges, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
import { Observable, Subscription } from 'rxjs';
import { StateAndDispatcher } from 'src/app/state-and-dispatcher';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-display-grid',
  templateUrl: './display-grid.component.html',
  styleUrls: ['./display-grid.component.scss']
})
export class DisplayGridComponent implements OnInit, OnChanges {
  @Input() projects: Project[];

  counter$: Observable<number>;
  counter: number = 0;

  count: Subscription;

  @ViewChild('elRef') _host: ElementRef;

  constructor(
    private store: StateAndDispatcher,
    private _renderer: Renderer2
  ) {}

  ngOnChanges() {
    this.placeImages();
  }

  ngOnInit(){
    this.counter$ = this.store.observe()
      .pipe(map(state => state.ui.counter))

    this.count = this.counter$.subscribe(() => {
      this.counter = this.store.state.ui.counter;

      this._renderer.setStyle(this._host.nativeElement, 'left', this.counter * 33.3 + '%');
    })
  }

  placeImages() {
    if(this.projects.length) {
      let xPos = 0,
          yPos = 0;

      for(let i = 0; i < this.projects.length; i++){
        if (i > 0) {
          if(i % 2 === 0) {
            xPos += 33.3;
            yPos = 0;
          }
          else {
            yPos = 50;
          }
        }

        this.projects[i]["xPos"] = xPos;
        this.projects[i]["yPos"] = yPos;
      }
    }
  }

  getKeys(obj:any){
    return Object.keys(obj)
  }

  trackProject(index, project){
    // console.log(project);
    return project ? project.id : undefined;
  }

  ngOnDestroy() {
    this.count.unsubscribe();
  }
}
