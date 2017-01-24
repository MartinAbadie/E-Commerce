import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';


import {routing} from './app.routing';
import {routingR} from './Menu/app.routing';
import {routingP} from './Panier/app.routing';

import {AppModuleMenu} from './Menu/app.module';
import {AppModulePanier} from './Panier/app.module';

import {AppComponent} from './app.component';

@NgModule({
  imports:      [BrowserModule, HttpModule, AppModuleMenu, AppModulePanier, routing, routingR, routingP],
  declarations: [AppComponent],
  bootstrap:    [AppComponent]
})
export class AppModule { }
