import {Component} from '@angular/core';

@Component({
    selector: 'menu',
    templateUrl: '../../template/menu.html',
    styleUrls: ['../../styles/menu.css']
})

export class MenuComponent {
    titre = 'Produits trouvés...';
    footer = 'Abadie - Bressand 2017 | All rights reserved ©';
    marque :string = '';
    type :string = '';
    prixMin :number = 0;
    prixMax :number = 100000;

    ngOnInit(){console.log('Le module menu a été chargé...')};

    setMarque(value :string){
        this.marque = value;
    }
    setType(value :string){
        this.type = value;
    }
    setPrixMax(value :number){
        this.prixMax = value;
    }
    setPrixMin(value :number){
        this.prixMin = value;
    }
}