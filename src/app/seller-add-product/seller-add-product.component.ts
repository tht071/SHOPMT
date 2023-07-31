import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  constructor(private product: ProductService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  submit(data: product) {
    this.product.addProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        // this.addProductMessage = 'Product is added successfully';
        this.showSuccess();
      }
    });

    setTimeout(() => {
      this.addProductMessage=undefined
    }, 3000);
  }
  showSuccess() {
    this.toastr.success('Product is added successfully');
  }
}
