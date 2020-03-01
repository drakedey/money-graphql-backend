import { TransactionType } from '../entity/Transaction';

class CreateTransactionPayload {
  accountId!: number;

  ammount!: number;

  type!: TransactionType;
}

export default CreateTransactionPayload;
