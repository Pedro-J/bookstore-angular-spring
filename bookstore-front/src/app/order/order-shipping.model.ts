import {Order} from './order.model';
import {Address} from '../core/address.model';

export class OrderShipping extends Address {
  public order: Order;
}
