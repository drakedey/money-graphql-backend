import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import User from './User';
// eslint-disable-next-line import/no-cycle
import { MoneyAccount } from './MoneyAccount';

// eslint-disable-next-line import/no-cycle
import { Transaction } from './Transaction';

enum AccountUserType {
  Owner = 'OWNER',
  Viewer = 'VIEWER',
  Contributor = 'CONTRIBUTOR',
}

@Entity({
  name: 'money_account_user',
})
class MoneyAccountUser {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({
    name: 'user_rol',
  })
  userRol: AccountUserType = AccountUserType.Owner;

  @ManyToOne(() => MoneyAccount, (moneyAccount) => moneyAccount.users, { lazy: true })
  @JoinColumn({ name: 'money_account_id', referencedColumnName: 'id' })
  account!: MoneyAccount;

  @ManyToOne(() => User, (user) => user.accounts, { lazy: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: User;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions!: Transaction[];
}

export { MoneyAccountUser, AccountUserType };
