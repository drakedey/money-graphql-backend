import { CurrencyType } from '../entity/MoneyAccount';

class CreateAccountPayload {
  ammount!: number;

  currency!: CurrencyType;

  userId!: number;
}

export default CreateAccountPayload;
