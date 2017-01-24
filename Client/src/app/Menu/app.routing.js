"use strict";
var router_1 = require('@angular/router');
var RechercheParMarque_component_1 = require('./RechercheParMarque/RechercheParMarque.component');
var RechercheParPrix_component_1 = require('./RechercheParPrix/RechercheParPrix.component');
var RechercheParType_component_1 = require('./RechercheParType/RechercheParType.component');
var appRoutes = [
    { path: 'rechercheParMarque/:marque', component: RechercheParMarque_component_1.RechercheParMarqueComponent, outlet: 'vueR' },
    { path: 'rechercheParPrix/:prixMin/:prixMax', component: RechercheParPrix_component_1.RechercheParPrixComponent, outlet: 'vueR' },
    { path: 'rechercheParType/:type', component: RechercheParType_component_1.RechercheParTypeComponent, outlet: 'vueR' }
];
exports.appRoutingProviders = [];
exports.routingR = router_1.RouterModule.forChild(appRoutes);
//# sourceMappingURL=app.routing.js.map