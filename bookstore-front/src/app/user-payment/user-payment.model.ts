import {UserBilling} from './user-billing.model';

export class UserPayment {
  public id: number;
  public type: string;
  public cardName: string;
  public cardNumber: string;
  public expiryMonth: string;
  public expiryYear: string;
  public cvc: number;
  public holderName: string;
  public default: boolean;
  public userBilling: UserBilling;

  constructor() {
    this.default = false;
  }
}
