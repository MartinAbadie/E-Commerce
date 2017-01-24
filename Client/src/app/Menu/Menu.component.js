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
var MenuComponent = (function () {
    function MenuComponent() {
        this.titre = 'Produits trouvés...';
        this.footer = 'Abadie - Bressand 2017 | All rights reserved ©';
        this.marque = '';
        this.type = '';
        this.prixMin = 0;
        this.prixMax = 100000;
    }
    MenuComponent.prototype.ngOnInit = function () { console.log('Le module menu a été chargé...'); };
    ;
    MenuComponent.prototype.setMarque = function (value) {
        this.marque = value;
    };
    MenuComponent.prototype.setType = function (value) {
        this.type = value;
    };
    MenuComponent.prototype.setPrixMax = function (value) {
        this.prixMax = value;
    };
    MenuComponent.prototype.setPrixMin = function (value) {
        this.prixMin = value;
    };
    MenuComponent = __decorate([
        core_1.Component({
            selector: 'menu',
            templateUrl: 'template/menu.html',
            styleUrls: ['styles/menu.css']
        }), 
        __metadata('design:paramtypes', [])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=Menu.component.js.map