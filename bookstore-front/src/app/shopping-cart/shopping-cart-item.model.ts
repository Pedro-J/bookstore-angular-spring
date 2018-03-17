import {Book} from '../book/book.model';
import {ShoppingCart} from './shopping-cart.model';

export class ShoppingCartItem {
  public id: number;
  public qty: number;
  public subtotal: number;
  public book: Book;
  public shoppingCart: ShoppingCart;
  public toUpdate: boolean;
}
