import { Component, OnInit } from '@angular/core';
import { Category, product } from '../data-type';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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
  sortOrder: 'asc' | 'desc' = 'asc';
  searchResult:undefined|product[];
  query:any;
  listCategory: any;
  searchCategory: Category | any;
  p:any;
  pageSize: string | number | undefined ;
  popularProducts:undefined|product[];
  trendyProducts:any | product[];
  itemPerpage: any;

  constructor(private product: ProductService, private http: HttpClient, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.product.productList().subscribe(data =>{
      this.productList = data;
    });
    this.product.categoryList().subscribe(data=>{
      this.categoryList = data;
    });
    // this.product.getProduct().subscribe(data =>{
    //   this.products = data;
    // })
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.warn(query);
    query && this.product.searchProduct(query).subscribe((result)=>{
      this.searchResult=result;

    })
    this.activeRoute.params.subscribe(data => {
      this.searchCategory = data['id'];
      this.product.getProductById(this.searchCategory).subscribe(categoryData =>{
        this.productList = categoryData;
      })
    });
    this.product.categoryList().subscribe(data =>{
      this.listCategory = data;
  }
  );
  this.product.popularProducts().subscribe((data)=>{
    this.popularProducts=data;
  })

  this.product.trendyProducts().subscribe((data)=>{
    this.trendyProducts=data;
  });

  }
  sortByName(): void {
    this.product.getProducts().subscribe(trendyProducts => {
      this.trendyProducts = trendyProducts.sort((a, b) => (a.name > b.name) ? 1 : -1);
    });
  }
  convertToStars(rating: number): string {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      if (i < Math.round(rating)) {
        stars += '<span class="fa fa-star checked"></span>';
      } else {
        stars += '<span class="fa fa-star"></span>';
      }
    }
    return stars;
  }
  sortByName1():void{
    this.product.getProducts().subscribe(trendyProducts=>{
      this.trendyProducts = this.trendyProducts.sort((a: { name: string; }, b: { name: string; }) => {
        if (this.sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });

      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    });
    }






  sortByPrice():void{
    this.product.getProducts().subscribe(trendyProducts => {
      this.trendyProducts = trendyProducts.sort((a, b) => a.price - b.price);
    });
  }

  sortByRating():void{
    this.product.getProducts().subscribe(trendyProducts =>{
      this.trendyProducts = trendyProducts.sort((a,b) => a.rating - b.rating);
    })
  }
  list() {
    this.product.productList().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    });
  }

}
