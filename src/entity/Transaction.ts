/* eslint-disable import/no-cycle */
import {
  ManyToOne,
  JoinColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

import { MoneyAccountUser } from './MoneyAccountUser';

enum TransactionStatus {
  Pending = 'PENDING',
  InProcess = 'IN PROCESS',
  Failed = 'FAILED',
  Completed = 'COMPLETED'
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
  status: TransactionStatus = TransactionStatus.Pending;

  @ManyToOne(
    () => MoneyAccountUser,
    (moneyAccountUser) => moneyAccountUser.transactions,
  )
  @JoinColumn({ name: 'money_account_user_id', referencedColumnName: 'id' })
  account!: MoneyAccountUser;
}

export { Transaction, TransactionStatus };
