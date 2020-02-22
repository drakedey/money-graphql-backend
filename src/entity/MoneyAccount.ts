import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MoneyAccountUser } from './MoneyAccountUser';
import User from './User';

enum CurrencyType {
  Usd = 'USD',
  Cop = 'COP',
  Vef = 'VEF'
}

@Entity({
  name: 'money_account',
})
class MoneyAccount {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({
    name: 'amount',
  })
  ammount: number;

  @Column({
    length: 3,
  })
  currency: CurrencyType = CurrencyType.Usd;

  @OneToMany(() => MoneyAccountUser, (moneyAccountUser) => moneyAccountUser.account)
  users: User[];
}

export { MoneyAccount, CurrencyType };
