import { Component, OnInit } from '@angular/core';
import { Category } from '../data-type';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-category',
  templateUrl: './seller-category.component.html',
  styleUrls: ['./seller-category.component.css']
})
export class SellerCategoryComponent implements OnInit {
  p:any;
  pageSize: string | number | undefined ;
  icon = faTrash;
  iconEdit=faEdit;
  productMessage: undefined | string;
  categoryList:Category[]=[];
  constructor(private api: CategoryService,private router: Router) { }

  ngOnInit(): void {
    this.api.categoryList().subscribe(data=>{
      this.categoryList = data;
    })
  }
  deleteCategory(id: number) {
    this.api.deleteCategory(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Xoá sản phẩm thành công';
        alert('Xoá sản phẩm thành công');
        this.list();
        this.router.navigate(["/seller-category"])
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;

    }, 500);
  }


  list() {
    this.api.categoryList().subscribe((result) => {
      if (result) {
        this.categoryList = result;

      }
    });
  }

}
