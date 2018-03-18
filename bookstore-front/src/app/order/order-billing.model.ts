import {Order} from './order.model';
import {Address} from '../core/address.model';

export class OrderBilling extends Address {
  public order: Order;
}
