import {ShoppingCartItem} from '../shopping-cart/shopping-cart-item.model';

export class Checkout {
  public id: number;
  public orderDate: string;
  public shippingDate: string;
  public shippingMethod: string;
  public orderStatus: string;
  public orderTotal: number;
  public cartItemList: ShoppingCartItem[];
}
