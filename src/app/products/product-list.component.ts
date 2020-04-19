import {Component, OnInit} from '@angular/core';
import {IProduct} from './product';
import {ProductsService} from '../shared/products.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

    constructor(private productService: ProductsService) {
    }

    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    private _listFilter: string;

    private filteredProducts: IProduct[];
    products: IProduct[];

    toggleImage(): void {
        this.showImage = !this.showImage;
}

    ngOnInit(): void {
        this.productService.getProducts().subscribe({
            next: (products) => {
                this.products = products;
                this.filteredProducts = products;
            },
            error: (err) => console.error(`Error fetching products: ${err}`)
        });
    }

    performFilter(filterBy: string = ''): IProduct[] {
        const x = this.products.filter(
            (product: IProduct) => product.productName.toLowerCase().indexOf(filterBy.toLowerCase()) > -1);
        console.log('x is: ', x);
        return x;
    }

    onNotify(value) {
        this.pageTitle = `Product List: ${value}`;
    }
}
