"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var PanierComponent = (function () {
    function PanierComponent() {
        this.modele = '';
    }
    PanierComponent.prototype.ngOnInit = function () {
        console.log('Le module panier a été chargé...');
    };
    ;
    PanierComponent.prototype.setModele = function (value) {
        this.modele = value;
    };
    PanierComponent.prototype.setPrix = function (value) {
        this.prix = value;
    };
    PanierComponent.prototype.ajouterArticle = function (modele, prix) {
        this.modele = modele;
        this.prix = parseInt(prix);
    };
    PanierComponent = __decorate([
        core_1.Component({
            selector: 'panier',
            templateUrl: 'template/panier.html',
            styleUrls: ['styles/panier.css']
        }), 
        __metadata('design:paramtypes', [])
    ], PanierComponent);
    return PanierComponent;
}());
exports.PanierComponent = PanierComponent;
//# sourceMappingURL=Panier.component.js.map