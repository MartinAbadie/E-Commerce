import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GestionService} from '../Gestion.service.component';

@Component({
    templateUrl: '../../../template/gestionArticle.html',
})

export class SuppressionArticleComponent {
    public items :any;

    public constructor(private article :GestionService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.article.getJSON("suppression/"+params['modele']+"/"+params['prix']).subscribe(res => this.items = res,
                                                                         err => console.error(err),
                                                                         () => console.log('done'));
        });
    }
}