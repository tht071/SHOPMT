import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { Category } from '../data-type';

@Component({
  selector: 'app-seller-add-category',
  templateUrl: './seller-add-category.component.html',
  styleUrls: ['./seller-add-category.component.css']
})
export class SellerAddCategoryComponent implements OnInit {
  addProductMessage: string | undefined;
  constructor(private api:CategoryService,private router: Router) { }

  ngOnInit(): void {
  }
  submit(data: Category) {
    this.api.addCategory(data).subscribe((result) => {
      console.warn(result);
      if (result) {

        alert('Thêm danh mục thành công');
        this.router.navigate(['/seller-category'])
      }
    });

    setTimeout(() => {
      this.addProductMessage=undefined
    }, 3000);
  }

}
