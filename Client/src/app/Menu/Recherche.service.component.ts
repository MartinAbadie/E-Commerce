import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class RechercheService {
    constructor(private http :Http) {}

    getJSON(parametres :string) :Observable<any> {
        let url :string = "http://martin-abadie.fr:8888/produits/"+parametres;
        let observable :Observable<any> = this.http.get(url).map((res:Response) => res.json());
        return observable;
    }
}