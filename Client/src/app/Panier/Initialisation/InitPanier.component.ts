import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GestionService} from '../Gestion.service.component';

@Component({
    selector: 'panier',
    templateUrl: '../../../template/gestionArticle.html'
})

export class InitPanierComponent implements OnInit{
    public items :any;

    public constructor(private article :GestionService, private route: ActivatedRoute) {}

    ngOnInit() {
        console.log('Initialisation du panier...');
        this.route.params.subscribe(params => {
            this.article.getJSON("initialisation").subscribe(res => this.items = res,
                                                                         err => console.error(err),
                                                                         () => console.log('done'));
        });
    }
}