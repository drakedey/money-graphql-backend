import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { MoneyAccountUser } from './MoneyAccountUser';

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
  ammount!: number;

  @Column({
    length: 3,
  })
  currency: CurrencyType = CurrencyType.Usd;

  @OneToMany(
    () => MoneyAccountUser,
    (moneyAccountUser) => moneyAccountUser.account,
    { eager: true },
  )
  users!: MoneyAccountUser[];
}

export { MoneyAccount, CurrencyType };
