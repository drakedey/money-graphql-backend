import { Controller, Mutation } from 'vesper';
import { EntityManager } from 'typeorm';
import { MoneyAccount } from '../entity/MoneyAccount';
import User from '../entity/User';
import { MoneyAccountUser } from '../entity/MoneyAccountUser';

@Controller()
class AccountController {
  constructor(
    private entityManager: EntityManager,
  ) { }

  @Mutation()
  async createAccount(args: any): Promise<MoneyAccount> {
    const account = new MoneyAccount();
    account.ammount = args.ammount;
    account.currency = args.currency;
    const createdAccount = this.entityManager.create(MoneyAccount, account);
    const savedAccount = await this.entityManager.save(MoneyAccount, createdAccount);
    const user = await this.entityManager.findOne(User, { id: args.userId });
    if (user) {
      const accountRelation = new MoneyAccountUser();
      accountRelation.account = savedAccount;
      accountRelation.user = user;
      const createdRelation = this.entityManager.create(MoneyAccountUser, accountRelation);
      await this.entityManager.save(MoneyAccountUser, createdRelation);
    }
    return savedAccount;
  }
}


export default AccountController;
