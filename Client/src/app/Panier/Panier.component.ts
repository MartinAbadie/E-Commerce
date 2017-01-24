import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'panier',
    templateUrl: '../../template/panier.html',
    styleUrls: ['../../styles/panier.css']
})

export class PanierComponent {
    modele: string = '';
    prix: number;

    ngOnInit() {
        console.log('Le module panier a été chargé...');
    };

    setModele(value: string) {
        this.modele = value;
    }
    setPrix(value: number) {
        this.prix = value;
    }

    ajouterArticle(modele: string, prix: string) {
        this.modele = modele;
        this.prix = parseInt(prix);
    }
}