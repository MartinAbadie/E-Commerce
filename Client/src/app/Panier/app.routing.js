"use strict";
var router_1 = require('@angular/router');
var SuppressionArticle_component_1 = require('./Suppression/SuppressionArticle.component');
var AjoutArticle_component_1 = require('./Ajout/AjoutArticle.component');
var InitPanier_component_1 = require('./Initialisation/InitPanier.component');
var ViderPanier_component_1 = require('./Vider/ViderPanier.component');
var appRoutes = [
    { path: 'suppressionArticle/:modele/:prix', component: SuppressionArticle_component_1.SuppressionArticleComponent, outlet: 'vueP' },
    { path: 'ajoutArticle/:modele/:prix', component: AjoutArticle_component_1.AjoutArticleComponent, outlet: 'vueP' },
    { path: '', component: InitPanier_component_1.InitPanierComponent, outlet: 'vueP' },
    { path: 'vider', component: ViderPanier_component_1.ViderPanierComponent, outlet: 'vueP' }
];
exports.routingP = router_1.RouterModule.forChild(appRoutes);
//# sourceMappingURL=app.routing.js.map