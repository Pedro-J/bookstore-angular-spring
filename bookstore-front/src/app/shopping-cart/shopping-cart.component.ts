import { Component, OnInit } from '@angular/core';
import {AppConst} from '../constants/app-const';
import {Book} from '../book/book.model';
import {ShoppingCart} from './shopping-cart.model';
import {ShoppingCartItem} from './shopping-cart-item.model';
import {Router} from '@angular/router';
import {ShoppingCartService} from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private serverPath = AppConst.FULL_API_BASE_PATH;
  private selectedBook: Book;
  private cartItemList: ShoppingCartItem[] = [];
  private cartItemNumber: number;
  private shoppingCart: ShoppingCart = new ShoppingCart();
  private cartItemUpdated: boolean;
  private emptyCart: boolean;
  private notEnoughStock: boolean;

  constructor(
    private router: Router,
    private cartService: ShoppingCartService
  ) { }

  public onSelect(book: Book): void {
    this.selectedBook = book;
    this.router.navigate(['/bookDetail', this.selectedBook.id]);
  }

  public onRemoveCartItem(cartItem: ShoppingCartItem): void {
    this.cartService.removeCartItem(cartItem.id).subscribe(
      res => {
        console.log(res.text());
        this.getCartItemList();
        this.getShoppingCart();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  public onUpdateCartItem(cartItem: ShoppingCartItem): void {
    this.cartService.updateCartItem(cartItem.id, cartItem.qty).subscribe(
      res => {
        console.log(res.text());
        this.cartItemUpdated = true;
        this.getShoppingCart();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  public getCartItemList(): void {
    this.cartService.getCartItemList().subscribe(
      res => {
        this.cartItemList = res.json();
        this.cartItemNumber = this.cartItemList.length;
      },
      error => {
        console.log(error.text());
      }
    );
  }

  public getShoppingCart(): void {
    this.cartService.getShoppingCart().subscribe(
      res => {
        console.log(res.json());
        this.shoppingCart = res.json();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  public onCheckout(): void {
    if (this.cartItemNumber === 0) {
      this.emptyCart = true;
    } else {
      for (const item of this.cartItemList) {
        if (item.qty > item.book.inStockNumber) {
          console.log('not enough stock on some item');
          this.notEnoughStock = true;
          return;
        }
      }

      // this.router.navigate('[/order]');
    }
  }

  ngOnInit() {
    this.getCartItemList();
    this.getShoppingCart();
  }
}
