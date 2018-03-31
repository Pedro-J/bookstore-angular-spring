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
  private _serverPath = AppConst.FULL_API_BASE_PATH;
  private _selectedBook: Book;
  private _cartItemList: ShoppingCartItem[] = [];
  private _cartItemNumber: number;
  private _shoppingCart: ShoppingCart = new ShoppingCart();
  private _cartItemUpdated: boolean;
  private _emptyCart: boolean;
  private _notEnoughStock: boolean;

  constructor(
    private router: Router,
    private cartService: ShoppingCartService
  ) { }

  public onSelect(book: Book): void {
    this._selectedBook = book;
    this.router.navigate(['/bookDetail', this._selectedBook.id]);
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
        this._cartItemUpdated = true;
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
        this._cartItemList = res.json();
        this._cartItemNumber = this._cartItemList.length;
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
        this._shoppingCart = res.json();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  public onCheckout(): void {
    if (this._cartItemNumber === 0) {
      this._emptyCart = true;
    } else {
      for (const item of this._cartItemList) {
        if (item.qty > item.book.inStockNumber) {
          console.log('not enough stock on some item');
          this._notEnoughStock = true;
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

  get serverPath(): string {
    return this._serverPath;
  }

  set serverPath(value: string) {
    this._serverPath = value;
  }

  get selectedBook(): Book {
    return this._selectedBook;
  }

  set selectedBook(value: Book) {
    this._selectedBook = value;
  }

  get cartItemList(): ShoppingCartItem[] {
    return this._cartItemList;
  }

  set cartItemList(value: ShoppingCartItem[]) {
    this._cartItemList = value;
  }

  get cartItemNumber(): number {
    return this._cartItemNumber;
  }

  set cartItemNumber(value: number) {
    this._cartItemNumber = value;
  }

  get shoppingCart(): ShoppingCart {
    return this._shoppingCart;
  }

  set shoppingCart(value: ShoppingCart) {
    this._shoppingCart = value;
  }

  get cartItemUpdated(): boolean {
    return this._cartItemUpdated;
  }

  set cartItemUpdated(value: boolean) {
    this._cartItemUpdated = value;
  }

  get emptyCart(): boolean {
    return this._emptyCart;
  }

  set emptyCart(value: boolean) {
    this._emptyCart = value;
  }

  get notEnoughStock(): boolean {
    return this._notEnoughStock;
  }

  set notEnoughStock(value: boolean) {
    this._notEnoughStock = value;
  }
}
