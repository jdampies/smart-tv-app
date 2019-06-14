import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { StateAndDispatcher } from '../state-and-dispatcher';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-display-control',
  templateUrl: './display-control.component.html',
  styleUrls: ['./display-control.component.scss']
})
export class DisplayControlComponent implements OnInit {

  @ViewChild('left') leftBtn: ElementRef;
  @ViewChild('right') rightBtn: ElementRef;

  counter$: Observable<number>;
  counter: number;

  imageWidth$: Observable<number>;
  imageWidth: number;

  constructor(
    private store: StateAndDispatcher,
    private _renderer: Renderer2
  ) { }

  ngOnInit() {
    this.counter$ = this.store.observe()
      .pipe(map(state => state.ui.counter))

    this.imageWidth$ = this.store.observe()
      .pipe(map(state => state.ui.imageWidth))

    this.counter$.subscribe(() => {
      this.counter = this.store.state.ui.counter;

      this.showHideLeftButton();

      this.showHideRightButton();
    })
  }

  showHideLeftButton() {
    if(this.counter === 0){
      this._renderer.setStyle(this.leftBtn.nativeElement, 'left', '-80px');
    }
    else {
      this._renderer.setStyle(this.leftBtn.nativeElement, 'left', '0');
    }
  }

  showHideRightButton() {
    if(Math.abs(this.counter) === ( (this.store.state.projects.length / 2) - 3) ){
      this._renderer.setStyle(this.rightBtn.nativeElement, 'right', '-80px');
    }
    else {
      this._renderer.setStyle(this.rightBtn.nativeElement, 'right', '0');
    }
  }

  slideGridLeft(){
    this.store.dispatch("SLIDE_LEFT");
  }

  slideGridRight() {
    this.store.dispatch("SLIDE_RIGHT");
  }
}
