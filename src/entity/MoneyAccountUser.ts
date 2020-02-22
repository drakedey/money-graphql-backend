import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, JoinColumn,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import User from './User';
import { MoneyAccount } from './MoneyAccount';

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

  @ManyToOne(() => User, (user) => user.accounts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => MoneyAccount, (account) => account.users)
  @JoinColumn({ name: 'money_account_id', referencedColumnName: 'id' })
  account: MoneyAccount;
}

export { MoneyAccountUser, AccountUserType };
