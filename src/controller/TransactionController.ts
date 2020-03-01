import { Controller, Authorized, Mutation } from 'vesper';
import { EntityManager, createQueryBuilder } from 'typeorm';
import CreateTransactionPayload from '../payload/CreateTransacionPayload';
import { Transaction, TransactionType } from '../entity/Transaction';
import { MoneyAccountUser, AccountUserType } from '../entity/MoneyAccountUser';
import User from '../entity/User';

@Controller()
class TransactionController {
  constructor(
    private entityManager: EntityManager,
    private currentUser?: User,
  ) {}

  @Mutation({ name: 'createTransaction' })
  @Authorized(['executeTransaction'])
  async createTransaction(
    payload: CreateTransactionPayload,
  ): Promise<Transaction> {
    const baseQuery = createQueryBuilder(MoneyAccountUser, 'mau')
      .where('mau.user_id ::bigint = :userId ::bigint', { userId: this.currentUser?.id })
      .andWhere('mau.money_account_id ::bigint= :accountId::bigint', { accountId: payload.accountId });
    const moneyRelation = await baseQuery.getOne();

    if (!moneyRelation) throw new Error(`Not account with the id: ${payload.accountId} found for this user`);

    if (moneyRelation.userRol === AccountUserType.Viewer) throw new Error('The user doesn\'t have permissions to make transactions on this account');

    let transaction = new Transaction();
    transaction.ammount = payload.ammount;
    transaction.type = payload.type;
    transaction.account = moneyRelation;

    transaction = await this.entityManager.create(Transaction, transaction);
    transaction = await this.entityManager.save(transaction);
    const account = await moneyRelation.account;
    const accountAmmount: number = typeof account.ammount === 'string' ? account.ammount * 1 : account.ammount ;
    const transactionAmmount: number = transaction.ammount;
    const operationResult: number = transaction.type === TransactionType.Add
      ? transactionAmmount + accountAmmount
      : accountAmmount - transactionAmmount;

    account.ammount = operationResult;
    await this.entityManager.save(account);
    return this.entityManager.findOneOrFail(Transaction, { id: transaction.id });
  }
}

export default TransactionController;
