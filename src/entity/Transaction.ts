/* eslint-disable import/no-cycle */
import {
  ManyToOne,
  JoinColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

import { MoneyAccountUser } from './MoneyAccountUser';

enum TransactionType {
  Add = 'ADD',
  Substract = 'SUBSTRACT'
}

@Entity({
  name: 'transaction',
})
class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ammount!: number;

  @Column()
  type: TransactionType = TransactionType.Add;

  @Column({ name: 'created_date' })
  createdDate: Date = new Date();

  @ManyToOne(
    () => MoneyAccountUser,
    (moneyAccountUser) => moneyAccountUser.transactions,
    { eager: true },
  )
  @JoinColumn({ name: 'money_account_user_id', referencedColumnName: 'id' })
  account!: MoneyAccountUser;
}

export { Transaction, TransactionType };
