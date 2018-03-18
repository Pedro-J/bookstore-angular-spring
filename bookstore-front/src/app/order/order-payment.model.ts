import {OrderBilling} from './order-billing.model';

export class OrderPayment {
  public id: number;
  public type: string;
  public cardName: string;
  public cardNumber: string;
  public expiryMonth: string;
  public expiryYear: string;
  public cvc: number;
  public holderName: string;
  public defaultPayment: boolean;
  public orderBilling: OrderBilling;
}
