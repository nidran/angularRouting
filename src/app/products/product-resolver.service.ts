import {Injectable} from '@angular/core';
import {Resolve,ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';
import { Observable, of } from 'rxjs';
import {Product, ProductResolved} from './product';
import {ProductService} from './product.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})

export class ProductResolver implements Resolve<ProductResolved>{
    // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product | Observable<Product> | Promise<Product> {
    //     throw new Error("Method not implemented.");
    // }
    constructor(private productService : ProductService){

    }
    resolve(route : ActivatedRouteSnapshot, 
         state:RouterStateSnapshot ): 
          Observable<ProductResolved>{
        const id = route.paramMap.get('id');
        if (isNaN(+id)){
            const msg = `Id not a number : ${id}`;
            console.error(msg);
            return of ({product: null, error: msg}  );
        }
        return this.productService.getProduct(+id)
        .pipe (
            map( product => ({product : product})),
            catchError( error => {
                const message = `Retrieval error : ${error}`;
                console.error(message);
                return of({product : null, error : message});

            }));
    }
    
}