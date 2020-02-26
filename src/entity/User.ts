import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

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
    name: 'name',
  })
  name!: string;

  @Column({
    length: 44,
    name: 'last_name',
  })
  lastName!: string;

  @Column('text')
  email!: string;

  @Column('text')
  password!: string;

  @OneToMany(() => MoneyAccountUser, (moneyAccountUser) => moneyAccountUser.user, { eager: true })
  accounts!: MoneyAccountUser[];

  checkPassword(password: string): Promise<boolean> {
    const validPassword = bcrypt.compare(password, this.password);
    return validPassword;
  }

  setEncriptedPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
}

export default User;
