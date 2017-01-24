import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SuppressionArticleComponent} from './Suppression/SuppressionArticle.component';
import {AjoutArticleComponent} from './Ajout/AjoutArticle.component';
import {InitPanierComponent} from './Initialisation/InitPanier.component';
import {ViderPanierComponent} from './Vider/ViderPanier.component';

const appRoutes: Routes = [
    {path: 'suppressionArticle/:modele/:prix', component: SuppressionArticleComponent, outlet:'vueP'},
    {path: 'ajoutArticle/:modele/:prix', component: AjoutArticleComponent, outlet:'vueP'},
    {path: '', component: InitPanierComponent, outlet:'vueP'},
    {path: 'vider', component: ViderPanierComponent, outlet:'vueP'}
];

export const routingP: ModuleWithProviders = RouterModule.forChild(appRoutes);