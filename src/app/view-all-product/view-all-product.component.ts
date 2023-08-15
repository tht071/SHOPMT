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
  currencyCode = 'VND';
  currencyFormat = 'symbol-narrow';
  productList : product | any;
  categoryList:any |Category[];
  products: product[] = [];
  trendyProducts:any | product[];
  popularProducts:any|product[];
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private product: ProductService, private http: HttpClient) { }

  ngOnInit(): void {
    this.product.productList().subscribe(data =>{
      this.productList = data;
    });
    this.product.getCategories().subscribe(data=>{
      this.categoryList = data;
    });
    this.http.get<product[]>('http://localhost:3000/products')
    .subscribe(products => {
      this.products = products;
    });
  }


}
