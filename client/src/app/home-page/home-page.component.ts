import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../shared/interfaces';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  products: Product[]
  productSub: Subscription 
  deleteSub: Subscription  
  searchStr = ''
  product:Product

  constructor(
    private productsService: ProductsService
    ) { }

  ngOnInit() {
    this.productSub = this.productsService.getAll().subscribe( products => {
      this.products = products
      console.log(this.products[0].image_url)
    })
  }

  remove(id: any) {
    this.deleteSub = this.productsService.remove(id).subscribe( () => {
      this.products = this.products.filter(products => products.id !==id)
    })
  }

  ngOnDestroy() {
    if (this.productSub) {
      this.productSub.unsubscribe()
    }

    if (this.deleteSub) {
      this.deleteSub.unsubscribe()
    }
  }

}