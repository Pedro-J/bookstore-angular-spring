import { Component, OnInit } from '@angular/core';
import {AppConst} from '../constants/app-const';
import {Book} from '../book/book.model';
import {ShoppingCartItem} from '../shopping-cart/shopping-cart-item.model';
import {ShoppingCart} from '../shopping-cart/shopping-cart.model';
import {UserBilling} from '../user-payment/user-billing.model';
import {UserShipping} from '../user-shipping/user-shipping.model';
import {UserPayment} from '../user-payment/user-payment.model';
import {OrderShipping} from './order-shipping.model';
import {OrderBilling} from './order-billing.model';
import {Order} from './order.model';
import {NavigationExtras, Router} from '@angular/router';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {UserShippingService} from '../user-shipping/user-shipping.service';
import {UserPaymentService} from '../user-payment/user-payment.service';
import {CheckoutService} from '../checkout/checkout.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private _serverPath = AppConst.FULL_API_BASE_PATH;
  private _selectedBook: Book;

  // Cart variables
  private _cartItemList: ShoppingCartItem[] = [];
  private _cartItemNumber: number;
  private _cart: ShoppingCart = new ShoppingCart();
  private _cartItemUpdated: boolean;

  // UserBilling and userShipping variables
  private _orderShipping: OrderShipping = new OrderShipping();
  private _orderBilling: OrderBilling = new OrderBilling();
  private _userShippingList: UserShipping[] = [];
  private _userShipping: UserShipping = new UserShipping();
  private _userBilling: UserBilling = new UserBilling();

  // UserPayment variables
  private _userPaymentList: UserPayment[] = [];
  private _userPayment: UserPayment = new UserPayment();

  // Order variable
  private _order: Order = new Order();

  // Aux variables
  private _selectedTab: number;
  private _emptyShippingList = true;
  private _emptyPaymentList = true;
  private _stateList: string[] = [];
  private _shippingMethod: string;


  constructor(
    private router: Router,
    private cartService: ShoppingCartService,
    private shippingService: UserShippingService,
    private userPaymentService: UserPaymentService,
    private checkoutService: CheckoutService
  ) { }

  public onSelect(book: Book): void {
    this._selectedBook = book;
    this.router.navigate(['/bookDetail', this._selectedBook.id]);
  }

  public selectedChange(val: number): void {
    this._selectedTab = val;
  }

  public goToPayment(): void {
    this._selectedTab = 1;
  }

  public goToReview(): void {
    this._selectedTab = 2;
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

  public setShippingAddress(shipping: UserShipping): void {
    this._orderShipping.name = shipping.name;
    this._orderShipping.street1 = shipping.street1;
    this._orderShipping.street2 = shipping.street2;
    this._orderShipping.city = shipping.city;
    this._orderShipping.state = shipping.state;
    this._orderShipping.country = shipping.country;
    this._orderShipping.zipcode = shipping.zipcode;
  }

  public setPaymentMethod(payment: UserPayment): void {
    this._userPayment.type = payment.type;
    this._userPayment.cardNumber = payment.cardNumber;
    this._userPayment.expiryMonth = payment.expiryMonth;
    this._userPayment.expiryYear = payment.expiryYear;
    this._userPayment.cvc = payment.cvc;
    this._userPayment.holderName = payment.holderName;
    this._userPayment.default = payment.default;
    this._orderBilling.name = payment.userBilling.name;
    this._orderBilling.street1 = payment.userBilling.street1;
    this._orderBilling.street2 = payment.userBilling.street2;
    this._orderBilling.city = payment.userBilling.city;
    this._orderBilling.state = payment.userBilling.state;
    this._orderBilling.country = payment.userBilling.country;
    this._orderBilling.zipcode = payment.userBilling.zipcode;
  }

  public setBillingAsShipping(checked: boolean): void {
    console.log('same as userShipping');

    if (checked) {
      this._orderBilling.name = this._orderShipping.name;
      this._orderBilling.street1 = this._orderShipping.street1;
      this._orderBilling.street2 = this._orderShipping.street2;
      this._orderBilling.city = this._orderShipping.city;
      this._orderBilling.state = this._orderShipping.state;
      this._orderBilling.country = this._orderShipping.country;
      this._orderBilling.zipcode = this._orderShipping.zipcode;
    } else {
      this._orderBilling.name = '';
      this._orderBilling.street1 = '';
      this._orderBilling.street2 = '';
      this._orderBilling.city = '';
      this._orderBilling.state = '';
      this._orderBilling.country = '';
      this._orderBilling.zipcode = '';
    }
  }

  public onSubmit(): void {

    this.checkoutService.checkout(
      this._orderShipping,
      this._orderBilling,
      this._userPayment,
      this._shippingMethod
    ).subscribe(
      res => {
        this._order = res.json();
        console.log(this._order);

        const navigationExtras: NavigationExtras = {
          queryParams: {
            'order': JSON.stringify(this._order)
          }
        };

        this.router.navigate(['/orderSummary'], navigationExtras);
      },
      error => {
        console.log(error.text());
      }
    );
  }

  ngOnInit(): void {
    this.getCartItemList();

    this.cartService.getShoppingCart().subscribe(
      res => {
        console.log(res.json());
        this._cart = res.json();
      },
      error => {
        console.log(error.text());
      }
    );

    this.shippingService.getUserShippingList().subscribe(
      res => {
        console.log(res.json());
        this._userShippingList = res.json();
        if (this._userShippingList.length) {
          this._emptyShippingList = false;

          for (const shipping of this._userShippingList) {
            if (shipping.default) {
              this.setShippingAddress(shipping);
              return;
            }
          }
        }
      },
      error => {
        console.log(error.text());
      }
    );

    this.userPaymentService.getUserPaymentList().subscribe(
      res => {
        console.log(res.json());
        this._userPaymentList = res.json();
        this._emptyPaymentList = false;

        if (this._userPaymentList.length) {
          this._emptyPaymentList = false;

          for (const payment of this._userPaymentList) {
            if (payment.default) {
              this.setPaymentMethod(payment);
              return;
            }
          }
        }
      },
      error => {
        console.log(error.text());
      }
    );

    for (const s in AppConst.states) {
      this._stateList.push(s);
    }

    this._userPayment.type = '';
    this._userPayment.expiryMonth = '';
    this._userPayment.expiryYear = '';
    this._orderBilling.state = '';
    this._orderShipping.state = '';
    this._shippingMethod = 'groundShipping';
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

  get cart(): ShoppingCart {
    return this._cart;
  }

  set cart(value: ShoppingCart) {
    this._cart = value;
  }

  get cartItemUpdated(): boolean {
    return this._cartItemUpdated;
  }

  set cartItemUpdated(value: boolean) {
    this._cartItemUpdated = value;
  }

  get orderShipping(): OrderShipping {
    return this._orderShipping;
  }

  set orderShipping(value: OrderShipping) {
    this._orderShipping = value;
  }

  get orderBilling(): OrderBilling {
    return this._orderBilling;
  }

  set orderBilling(value: OrderBilling) {
    this._orderBilling = value;
  }

  get userShippingList(): UserShipping[] {
    return this._userShippingList;
  }

  set userShippingList(value: UserShipping[]) {
    this._userShippingList = value;
  }

  get userShipping(): UserShipping {
    return this._userShipping;
  }

  set userShipping(value: UserShipping) {
    this._userShipping = value;
  }

  get userBilling(): UserBilling {
    return this._userBilling;
  }

  set userBilling(value: UserBilling) {
    this._userBilling = value;
  }

  get userPaymentList(): UserPayment[] {
    return this._userPaymentList;
  }

  set userPaymentList(value: UserPayment[]) {
    this._userPaymentList = value;
  }

  get userPayment(): UserPayment {
    return this._userPayment;
  }

  set userPayment(value: UserPayment) {
    this._userPayment = value;
  }

  get order(): Order {
    return this._order;
  }

  set order(value: Order) {
    this._order = value;
  }

  get selectedTab(): number {
    return this._selectedTab;
  }

  set selectedTab(value: number) {
    this._selectedTab = value;
  }

  get emptyShippingList(): boolean {
    return this._emptyShippingList;
  }

  set emptyShippingList(value: boolean) {
    this._emptyShippingList = value;
  }

  get emptyPaymentList(): boolean {
    return this._emptyPaymentList;
  }

  set emptyPaymentList(value: boolean) {
    this._emptyPaymentList = value;
  }

  get stateList(): string[] {
    return this._stateList;
  }

  set stateList(value: string[]) {
    this._stateList = value;
  }

  get shippingMethod(): string {
    return this._shippingMethod;
  }

  set shippingMethod(value: string) {
    this._shippingMethod = value;
  }
}
