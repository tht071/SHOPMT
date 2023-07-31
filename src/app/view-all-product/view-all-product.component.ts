import { Component, OnInit } from '@angular/core';
import { Category, product } from '../data-type';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-view-all-product',
  templateUrl: './view-all-product.component.html',
  styleUrls: ['./view-all-product.component.css']
})
export class ViewAllProductComponent implements OnInit {
  productList : product | any;
  categoryList: Category | any;
  products: product[] = [];
  trendyProducts: product[] | any;

  constructor(private productsService: ProductService, private http: HttpClient) { }

  ngOnInit(): void {
    this.productsService.productList().subscribe(data =>{
      this.productList = data;
    });
    this.productsService.getCategories().subscribe(data=>{
      this.categoryList = data;
    });
    this.http.get<product[]>('http://localhost:3000/products')
    .subscribe(products => {
      this.products = products;
    });
  }
  sortByName(): void {
   
  }
}
