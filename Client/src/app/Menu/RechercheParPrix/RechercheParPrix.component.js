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
var router_1 = require('@angular/router');
var Recherche_service_component_1 = require('../Recherche.service.component');
var d3 = require('d3');
var RechercheParPrixComponent = (function () {
    function RechercheParPrixComponent(recherche, route) {
        this.recherche = recherche;
        this.route = route;
        this.largeurSVG = function (nb) {
            return nb * 20;
        };
        this.creerEtoiles = function (nb) {
            var width = this.largeurSVG(nb);
            var pasWidth = 20;
            var height = 20;
            var etoiles = new Array();
            for (var i = 0; i < nb; i++) {
                var etoile = new Array();
                var cy = height / 2;
                var cx = i * pasWidth + pasWidth / 2;
                for (var j = 0; j < 10; j++) {
                    var point = new Array();
                    var angle = Math.PI / 10 + j * (Math.PI / 5);
                    var rayon = 5 + j % 2 * 5;
                    var x = Math.round(cx + rayon * Math.cos(angle));
                    var y = Math.round(cy + rayon * Math.sin(angle));
                    point.push(x);
                    point.push(y);
                    etoile.push(point);
                }
                etoiles.push(etoile);
            }
            return etoiles;
        };
        this.lineFunction = function (etoile) {
            var path = "";
            for (var i in etoile) {
                if (parseInt(i) == 0) {
                    path += "M";
                }
                else if (parseInt(i) == 1) {
                    path += "L";
                }
                path += etoile[i][0] + "," + etoile[i][1];
                if (parseInt(i) != 9) {
                    path += " ";
                }
            }
            path += "Z";
            return path;
        };
    }
    RechercheParPrixComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('Je suis dans le composant RechercheParPrixComponent');
        this.route.params.subscribe(function (params) {
            _this.recherche.getJSON("prix/" + params['prixMin'] + "/" + params['prixMax']).subscribe(function (res) { return _this.items = res; }, function (err) { return console.error(err); }, function () { return console.log('done'); });
        });
    };
    RechercheParPrixComponent.prototype.ngAfterViewChecked = function () {
        var height = 20;
        for (var item in this.items) {
            var modele = this.items[item].modele;
            var prix = this.items[item].prix;
            var appreciation = this.items[item].appreciation;
            var width = this.largeurSVG(appreciation);
            var idProduit = modele.split(' ').join('_') + prix;
            if (document.getElementById(modele + prix + "svg") == null) {
                document.getElementById(modele + prix).id = idProduit;
                var svg = d3.select("#" + idProduit).append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("id", modele + prix + "svg");
                var etoiles = this.creerEtoiles(this.items[item]['appreciation']);
                for (var etoile in etoiles) {
                    var path = this.lineFunction(etoiles[etoile]);
                    svg.append("path")
                        .attr("d", path)
                        .attr("stroke", "grey")
                        .attr("fill", "yellow");
                }
            }
        }
    };
    RechercheParPrixComponent = __decorate([
        core_1.Component({
            templateUrl: 'template/recherche.html',
        }), 
        __metadata('design:paramtypes', [Recherche_service_component_1.RechercheService, router_1.ActivatedRoute])
    ], RechercheParPrixComponent);
    return RechercheParPrixComponent;
}());
exports.RechercheParPrixComponent = RechercheParPrixComponent;
//# sourceMappingURL=RechercheParPrix.component.js.map