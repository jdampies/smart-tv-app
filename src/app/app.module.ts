import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FieldSelectorComponent, FieldComponent } from './field-selector/field-selector.component';
import { DisplayGridComponent } from './display-grid/display-grid.component';
import { StateAndDispatcher } from './state-and-dispatcher';
import { HttpClientModule } from '@angular/common/http';
import { DisplayControlComponent } from './display-control/display-control.component';

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    FieldSelectorComponent,
    DisplayGridComponent,
    DisplayControlComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [StateAndDispatcher],
  bootstrap: [AppComponent]
})
export class AppModule { }
``
