import { Component, OnInit } from '@angular/core';
import {IProduct} from './product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../shared/products.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: IProduct;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductsService) {
    console.log('product-detail: ', this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    console.log('ngOnInit of product detail');
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProducts().subscribe({
      next: (products) => {
          const product = products.filter(p => p.productId === id);
          if (product.length) {
              this.product = product[0];
          } else {
              this.showInvalidProduct();
          }
      },
      error: (err) => console.error('Error fetching product with id: ', id)
    });
  }

  showInvalidProduct(): void {
    alert('Invalid product id');
    this.goBack();
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
