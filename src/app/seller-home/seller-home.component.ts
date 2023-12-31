import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  p:any;
  pageSize: string | number | undefined ;
  productList: any | product[];
  productMessage: undefined | string;
  icon = faTrash;
  iconEdit=faEdit;
  products = [];
  trendyProducts:any| product[];
  itemPerpage: any;
  currencyCode = 'VND';
  currencyFormat = 'symbol-narrow';


  constructor(private product: ProductService ) {}

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';

        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  list() {
    this.product.productList().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    });
  }
  // loadPage(page: number) {
  //   this.product.getProduct(page, this.pageSize).subscribe((response: any) => {
  //     this.products = response.products;
  //     this.currentPage = response.currentPage;
  //     this.totalItems = response.totalItems;
  //   });
  // }
}
