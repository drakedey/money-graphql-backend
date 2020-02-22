import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import { MoneyAccountUser } from './MoneyAccountUser';

@Entity({
  name: 'money_user',
})
class User {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({
    length: 44,
    name: 'name'
  })
  name: string;

  @Column({
    length: 44,
    name: 'last_name',
  })
  lastName: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @OneToMany(() => MoneyAccountUser, (moneyAccountUser) => moneyAccountUser.user)
  accounts: MoneyAccountUser[];
}

export default User;
