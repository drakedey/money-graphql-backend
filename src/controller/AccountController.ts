/* eslint-disable no-plusplus */
import {
  Controller, Mutation, Query, Authorized,
} from 'vesper';
import { EntityManager, createQueryBuilder } from 'typeorm';
import { MoneyAccount } from '../entity/MoneyAccount';
import User from '../entity/User';
import { MoneyAccountUser } from '../entity/MoneyAccountUser';
import CreateAccountPayload from '../payload/CreateAccountPayload';

@Controller()
class AccountController {
  constructor(
    private entityManager: EntityManager,
    private currentUser: User
  ) {}

  @Authorized()
  @Mutation()
  async createAccount(args: CreateAccountPayload): Promise<MoneyAccount> {
    const account = new MoneyAccount();
    account.ammount = args.ammount;
    account.currency = args.currency;
    const createdAccount = this.entityManager.create(MoneyAccount, account);
    const savedAccount = await this.entityManager.save(
      MoneyAccount,
      createdAccount
    );
    const accountRelation = new MoneyAccountUser();
    accountRelation.account = savedAccount;
    accountRelation.user = this.currentUser;
    const createdRelation = this.entityManager.create(
      MoneyAccountUser,
      accountRelation
    );
    await this.entityManager.save(MoneyAccountUser, createdRelation);
    return this.entityManager.findOneOrFail(MoneyAccount, {
      id: savedAccount.id,
    });
  }

  @Query()
  accounts(): Promise<MoneyAccount[]> {
    return this.entityManager.find(MoneyAccount);
  }

  @Authorized()
  @Query({ name: 'userAccounts' })
  // eslint-disable-next-line class-methods-use-this
  async userAccounts(): Promise<MoneyAccount[]> {
    const result = await createQueryBuilder(MoneyAccount)
      .leftJoinAndSelect('MoneyAccount.users', 'userAccount')
      .leftJoin('userAccount.user', 'user')
      .where('user.id = :userId', { userId: this.currentUser?.id })
      .getMany();
    return result;
  }

  @Query({ name: 'getCurrentUser' })
  async getCurrentUser(): Promise<User> {
    return this.currentUser;
  }
}


export default AccountController;
