import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData:undefined | product;
  currencyCode = 'VND';
  currencyFormat = 'symbol-narrow';
  productQuantity:number=1;
  removeCart=false;
  cartData:product|undefined;
  constructor(private activeRoute:ActivatedRoute, private product:ProductService) { }

  ngOnInit(): void {
    let productId= this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productData= result;
      let cartData= localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product)=>productId=== item.id.toString());
        if(items.length){
          this.removeCart=true
        }else{
          this.removeCart=false
        }
      }

      let user = localStorage.getItem('user');
      if(user){
        let userId= user && JSON.parse(user).id;
        this.product.getCartList(userId);

        this.product.cartData.subscribe((result)=>{
          let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())
       if(item.length){
        this.cartData=item[0];
        this.removeCart=true;
       }
        })
      }



    })
  }
  handleQuantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1;
    }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity-=1;
    }
  }

  addToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        this.product.localAddToCart(this.productData);
        this.removeCart=true
      }else{
        let user = localStorage.getItem('user');
        let userId= user && JSON.parse(user).id;
        let cartData:cart={
          ...this.productData,
          productId:this.productData.id,
          userId
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
           this.product.getCartList(userId);
           this.removeCart=true
          }
        })
      }

    }
  }
  removeToCart(productId:number){
    if(!localStorage.getItem('user')){
this.product.removeItemFromCart(productId)
    }else{
      console.warn("cartData", this.cartData);

      this.cartData && this.product.removeToCart(this.cartData.id)
      .subscribe((result)=>{
        let user = localStorage.getItem('user');
        let userId= user && JSON.parse(user).id;
        this.product.getCartList(userId)
      })
    }
    this.removeCart=false
  }
days:any = 194;
hours:number = 22;
mins:number = 14;
secs:number = 2;

x = setInterval(() =>{
  var futureDate:any = new Date("Dec 30, 2023 08:47:31").getTime();
  var today:any = new Date().getTime();
  var distance = futureDate - today;
  this.days = Math.floor(distance/(1000 * 60 * 60 *24));
  this.hours = Math.floor((distance % (1000 * 60 * 60 *24)) / (1000 * 60 * 60));
  this.mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  this.secs = Math.floor((distance % (1000 * 60)) / (1000));

  if(distance < 0) {
    clearInterval(this.x);
    this.days = "Sản phẩm không còn giảm giá";
  }
}, 1000)

}
