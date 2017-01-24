import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import {routingP} from './app.routing';

import {GestionService} from './Gestion.service.component'

import {PanierComponent} from './Panier.component';
import {SuppressionArticleComponent} from './Suppression/SuppressionArticle.component';
import {AjoutArticleComponent} from './Ajout/AjoutArticle.component';
import {InitPanierComponent} from './Initialisation/InitPanier.component';
import {ViderPanierComponent} from './Vider/ViderPanier.component';

@NgModule({
  imports:      [BrowserModule, HttpModule, routingP],
  declarations: [PanierComponent, SuppressionArticleComponent, AjoutArticleComponent, InitPanierComponent, ViderPanierComponent],
  providers:    [GestionService],
  bootstrap:    [PanierComponent],
  exports:      [PanierComponent]
})
export class AppModulePanier { }
