import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import {routingR} from './app.routing';

import {RechercheService} from './Recherche.service.component'

import {MenuComponent} from './Menu.component';
import {RechercheParMarqueComponent} from './RechercheParMarque/RechercheParMarque.component';
import {RechercheParPrixComponent} from './RechercheParPrix/RechercheParPrix.component';
import {RechercheParTypeComponent} from './RechercheParType/RechercheParType.component';

@NgModule({
  imports:      [BrowserModule, HttpModule, routingR],
  declarations: [MenuComponent, RechercheParMarqueComponent, RechercheParPrixComponent, RechercheParTypeComponent],
  providers:    [RechercheService],
  bootstrap:    [MenuComponent],
  exports:      [MenuComponent]
})
export class AppModuleMenu { }
