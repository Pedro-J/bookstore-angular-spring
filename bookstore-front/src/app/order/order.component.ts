import { Component, OnInit } from '@angular/core';
import {AppConst} from '../constants/app-const';
import {Book} from '../book/book.model';
import {ShoppingCartItem} from '../shopping-cart/shopping-cart-item.model';
import {ShoppingCart} from '../shopping-cart/shopping-cart.model';
import {Billing} from '../payments/billing.model';
import {Shipping} from '../shipping/shipping.model';
import {Payment} from '../payments/payment.model';
import {OrderShipping} from './order-shipping.model';
import {OrderBilling} from './order-billing.model';
import {Order} from './order.model';
import {NavigationExtras, Router} from '@angular/router';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {ShippingService} from '../shipping/shipping.service';
import {PaymentService} from '../payments/payment.service';
import {CheckoutService} from '../checkout/checkout.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private serverPath = AppConst.FULL_API_BASE_PATH;
  private selectedBook: Book;
  private cartItemList: ShoppingCartItem[] = [];
  private cartItemNumber: number;
  private shoppingCart: ShoppingCart = new ShoppingCart();
  private cartItemUpdated: boolean;
  private orderShipping: OrderShipping = new OrderShipping();
  private orderBilling: OrderBilling = new OrderBilling();
  private userPayment: Payment = new Payment();
  private userShipping: Shipping = new Shipping();
  private userBilling: Billing = new Billing();
  private userShippingList: Shipping[] = [];
  private userPaymentList: Payment[] = [];
  private payment: Payment = new Payment();
  private selectedTab: number;
  private emptyShippingList = true;
  private emptyPaymentList = true;
  private stateList: string[] = [];
  private shippingMethod: string;
  private order: Order = new Order();

  constructor(
    private router: Router,
    private cartService: ShoppingCartService,
    private shippingService: ShippingService,
    private paymentService: PaymentService,
    private checkoutService: CheckoutService
  ) { }

  public onSelect(book: Book): void {
    this.selectedBook = book;
    this.router.navigate(['/bookDetail', this.selectedBook.id]);
  }

  public selectedChange(val: number): void {
    this.selectedTab = val;
  }

  public goToPayment(): void {
    this.selectedTab = 1;
  }

  public goToReview(): void {
    this.selectedTab = 2;
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

  public setShippingAddress(shipping: Shipping) {
    this.orderShipping.name = shipping.name;
    this.orderShipping.street1 = shipping.street1;
    this.orderShipping.street2 = shipping.street2;
    this.orderShipping.city = shipping.city;
    this.orderShipping.state = shipping.state;
    this.orderShipping.country = shipping.country;
    this.orderShipping.zipcode = shipping.zipcode;
  }

  public setPaymentMethod(payment: Payment) {
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
    console.log('same as shipping');

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

    this.shippingService.getShippingList().subscribe(
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

    this.paymentService.getPaymentList().subscribe(
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
