import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RechercheParMarqueComponent} from './RechercheParMarque/RechercheParMarque.component';
import {RechercheParPrixComponent} from './RechercheParPrix/RechercheParPrix.component';
import {RechercheParTypeComponent} from './RechercheParType/RechercheParType.component';

const appRoutes: Routes = [
    {path: 'rechercheParMarque/:marque', component: RechercheParMarqueComponent, outlet:'vueR'},
    {path: 'rechercheParPrix/:prixMin/:prixMax', component: RechercheParPrixComponent, outlet:'vueR'},
    {path: 'rechercheParType/:type', component: RechercheParTypeComponent, outlet:'vueR'}
];

export const appRoutingProviders: any[] =[ ];

export const routingR: ModuleWithProviders = RouterModule.forChild(appRoutes);