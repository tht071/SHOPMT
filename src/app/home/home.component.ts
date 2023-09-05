import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  p:any;
  pageSize: string | number | undefined ;
  currencyCode = 'VND';
  currencyFormat = 'symbol-narrow';
 popularProducts:undefined|product[];
 trendyProducts:undefined | product[];
 url: string = "../assets/img1.jpg";
 test: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: true,
  navSpeed: 700,
  navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 1
    }
  },
  nav: true
}
  constructor(private product:ProductService, ) {}

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      this.popularProducts=data;
    })

    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    });


  }
  imageChange(event: any){
    this.url = event.target.src;
}

}
