import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RechercheService} from '../Recherche.service.component';
import * as d3 from 'd3';
import * as $ from 'jquery';

@Component({
    templateUrl: '../../../template/recherche.html',
})

export class RechercheParMarqueComponent {
    public items :any;
    public arbre :any;

    public constructor(private recherche :RechercheService, private route: ActivatedRoute) {}

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
        console.log('Je suis dans le composant RechercheParMarqueComponent');
        this.route.params.subscribe(params => {
            this.recherche.getJSON("marques/"+params['marque']).subscribe(
		res1 => this.items = res1,
                err1 => console.error(err1),
                () => this.recherche.getJSON("arbre/marques/"+params['marque']).subscribe(
			res2 => this.arbre = res2, 
			err2 => console.error(err2), 
			()=> this.afficherArbre()
		)
	    );
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

    public afficherArbre = function(){

	if(!$("#arbre-result div").length){
		console.log("Arbre :", this.arbre);
		$('<div></div>').html(JSON.stringify(this.arbre)).appendTo("#arbre-result");
	}
    }

    ngAfterViewChecked(){
	let height :number = 20;
	for(let item in this.items){
		let modele :string = this.items[item].modele;
		let prix :number = this.items[item].prix;
		let appreciation :number = this.items[item].appreciation;
		let width :number = this.largeurSVG(appreciation)
		let idProduit : string = modele.split(' ').join('_')+prix;
		if(document.getElementById(modele+prix+"svg")==null && document.getElementById(modele+prix)!=null){
			document.getElementById(modele+prix).id = idProduit;

			let svg = d3.select("#"+idProduit).append("svg")
				.attr("width", width)
				.attr("height", height);

			svg.attr("id", modele+prix+"svg");

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
	if(!$("#radio-result").length && this.arbre!=undefined){	
		$().ready(function(){		
			if(!$("#radio-result").length){
				$("#result-container").prepend('<form id="radio-result"></form>');
			}
			if(!$("#block").length && !$("#arbre").length){
				$("#radio-result").html('<label for="block">Block</label><input type="radio" id="block" name="block-arbre" value="block" checked><label for="arbre">Arbre</label><input type="radio" name="block-arbre" id="arbre" value="arbre">');
				$("#block").change(function(){
					$("#block-result").show();
					$("#arbre-result").hide();
				});

				$("#arbre").change(function(){
					$("#block-result").hide();
					$("#arbre-result").show();
				});

				$("#arbre-result").hide();
			}
		});
	}
    }
}
