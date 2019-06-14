import { Observable, BehaviorSubject } from 'rxjs';

export class Store<T> {
  state$: Observable<T>;
  private _state$: BehaviorSubject<T>;

  protected constructor (initialState: T) {
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable();
  }

  get state (): T {
    return this._state$.getValue();
  }

  observe(): Observable<T> {
    return this.state$;
  }

  get (prop?: any): T {
    const state = this._state$.getValue();
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  setState (nextState: T):void {
    this._state$.next(nextState);
  }
}
