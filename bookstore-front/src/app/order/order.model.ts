import { ShoppingCartItem } from '../shopping-cart/shopping-cart-item.model';
import {OrderShipping} from './order-shipping.model';
import {OrderPayment} from './order-payment.model';
import {OrderBilling} from './order-billing.model';

export class Order {
  public id: number;
  public orderDate: string;
  public shippingDate: string;
  public shippingMethod: string;
  public orderStatus: string;
  public orderTotal: number;
  public cartItemList: ShoppingCartItem[];
  public orderPayment: OrderPayment;
  public orderShipping: OrderShipping;
  public orderBilling: OrderBilling;
}
