import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './../data-type';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  deleteCategory(id: number) {
    return this.http.delete<Category[]>(`http://localhost:3000/category/${id}`);
  }
  updateCategory(category: Category) {
    return this.http.put<Category>(`http://localhost:3000/category/${category.id}`,category);
   }

   getCategory(id:number){
    return this.http.get<Category[]>(`http://localhost:3000/category/${id}`)
  }

  constructor(private http:HttpClient) { }
  categoryList(){
    return this.http.get<Category[]>('http://localhost:3000/category')
  }

  addCategory(data: Category) {
    return this.http.post('http://localhost:3000/category', data);
  }
}
