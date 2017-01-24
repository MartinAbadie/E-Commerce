import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RechercheService } from '../Recherche.service.component';
import * as d3 from 'd3';

@Component({
    templateUrl: '../../../template/recherche.html',
})

export class RechercheParTypeComponent {
    public items: any;

    public constructor(private recherche: RechercheService, private route: ActivatedRoute) { }

    public largeurSVG = function(nb : number) :number{
        return nb*20;
    };

    public creerEtoiles = function(nb : number) :Array<Array<Array<number>>>{
        let width = this.largeurSVG(nb);
        let pasWidth = 20;
        let height = 20;

        let etoiles :Array<Array<Array<number>>> = new Array();

        for (let i =0; i < nb; i++){
                let etoile :Array<Array<number>> = new Array();
                let cy :number = height/2;
                let cx :number = i*pasWidth+pasWidth/2;

                for(let j=0; j < 10; j++){
                        let point : Array<number> = new Array();

                        let angle :any = Math.PI/10 + j*(Math.PI/5);
                        let rayon :number = 5 + j%2*5;

                        let x :number = Math.round(cx + rayon*Math.cos(angle));
                        let y :number = Math.round(cy + rayon*Math.sin(angle));

                        point.push(x);
                        point.push(y);
                        etoile.push(point);
                }

                etoiles.push(etoile);
        }
        return etoiles;
    };

    ngOnInit() {
        console.log('Je suis dans le composant RechercheParTypeComponent');
        this.route.params.subscribe(params => {
            this.recherche.getJSON("types/" + params['type']).subscribe(res => this.items = res,
                err => console.error(err),
                () => console.log('done'));
        });
    }

    public lineFunction = function(etoile : Array<Array<number>>) :string{
        let path :string = "";

        for (let i in etoile){
                if(parseInt(i)==0){
                        path += "M";
                }
                else if(parseInt(i)==1){
                        path += "L";
                }

                path += etoile[i][0]+","+etoile[i][1];

                if(parseInt(i) != 9){
                        path += " ";
                }
        }
        path += "Z";
        return path;
    };

    ngAfterViewChecked(){
        let height :number = 20;
        for(let item in this.items){
                let modele :string = this.items[item].modele;
                let prix :number = this.items[item].prix;
                let appreciation :number = this.items[item].appreciation;
                let width :number = this.largeurSVG(appreciation)
                let idProduit : string = modele.split(' ').join('_')+prix;
                if(document.getElementById(modele+prix+"svg") == null){
                        document.getElementById(modele+prix).id = idProduit;

                        let svg = d3.select("#"+idProduit).append("svg")
                                .attr("width", width)
                                .attr("height", height)
				.attr("id", modele+prix+"svg");

                        let etoiles :Array<Array<Array<number>>> = this.creerEtoiles(this.items[item]['appreciation']);


                        for(let etoile in etoiles){
                                let path :string = this.lineFunction(etoiles[etoile]);
                                svg.append("path")
                                        .attr("d", path)
                                        .attr("stroke", "grey")
                                        .attr("fill", "yellow");
			}
		}
	}
   }	
}
