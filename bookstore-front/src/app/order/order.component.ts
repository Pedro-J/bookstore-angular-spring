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
import {PaymentService} from '../user-payment/user-payment.service';
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
  private _payment: UserPayment = new UserPayment();

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
    private paymentService: PaymentService,
    private checkoutService: CheckoutService
  ) { }

  public onSelect(book: Book): void {
    this._selectedBook = book;
    this.router.navigate(['/bookDetail', this.selectedBook.id]);
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

  public setShippingAddress(shipping: UserShipping) {
    this._orderShipping.name = shipping.name;
    this._orderShipping.street1 = shipping.street1;
    this._orderShipping.street2 = shipping.street2;
    this._orderShipping.city = shipping.city;
    this._orderShipping.state = shipping.state;
    this._orderShipping.country = shipping.country;
    this._orderShipping.zipcode = shipping.zipcode;
  }

  public setPaymentMethod(payment: UserPayment) {
    this.payment.type = payment.type;
    this.payment.cardNumber = payment.cardNumber;
    this.payment.expiryMonth = payment.expiryMonth;
    this.payment.expiryYear = payment.expiryYear;
    this.payment.cvc = payment.cvc;
    this.payment.holderName = payment.holderName;
    this.payment.default = payment.default;
    this.orderBilling.name = payment.userBilling.name;
    this.orderBilling.street1 = payment.userBilling.street1;
    this.orderBilling.street2 = payment.userBilling.street2;
    this.orderBilling.city = payment.userBilling.city;
    this.orderBilling.state = payment.userBilling.state;
    this.orderBilling.country = payment.userBilling.country;
    this.orderBilling.zipcode = payment.userBilling.zipcode;
  }

  public setBillingAsShipping(checked: boolean): void {
    console.log('same as userShipping');

    if (checked) {
      this.orderBilling.name = this.orderShipping.name;
      this.orderBilling.street1 = this.orderShipping.street1;
      this.orderBilling.street2 = this.orderShipping.street2;
      this.orderBilling.city = this.orderShipping.city;
      this.orderBilling.state = this.orderShipping.state;
      this.orderBilling.country = this.orderShipping.country;
      this.orderBilling.zipcode = this.orderShipping.zipcode;
    } else {
      this.orderBilling.name = '';
      this.orderBilling.street1 = '';
      this.orderBilling.street2 = '';
      this.orderBilling.city = '';
      this.orderBilling.state = '';
      this.orderBilling.country = '';
      this.orderBilling.zipcode = '';
    }
  }

  public onSubmit() {

    this.checkoutService.checkout(
      this.orderShipping,
      this.orderBilling,
      this.payment,
      this.shippingMethod
    ).subscribe(
      res => {
        this.order = res.json();
        console.log(this.order);

        const navigationExtras: NavigationExtras = {
          queryParams: {
            'order': JSON.stringify(this.order)
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
        this.shoppingCart = res.json();
      },
      error => {
        console.log(error.text());
      }
    );

    this.shippingService.getUserShippingList().subscribe(
      res => {
        console.log(res.json());
        this.userShippingList = res.json();
        if (this.userShippingList.length) {
          this.emptyShippingList = false;

          for (const shipping of this.userShippingList) {
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

    this.paymentService.getUserPaymentList().subscribe(
      res => {
        console.log(res.json());
        this.userPaymentList = res.json();
        this.emptyPaymentList = false;

        if (this.userPaymentList.length) {
          this.emptyPaymentList = false;

          for (const payment of this.userPaymentList) {
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
      this.stateList.push(s);
    }

    this.payment.type = '';
    this.payment.expiryMonth = '';
    this.payment.expiryYear = '';
    this.orderBilling.state = '';
    this.orderShipping.state = '';
    this.shippingMethod = 'groundShipping';
  }

}
