/* eslint-disable import/no-cycle */
import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { MoneyAccountUser } from './MoneyAccountUser';
import Role from './Role';
import CreateUserPayload from '../payload/CreateUserPayload';

@Entity({
  name: 'money_user',
})
class User {
  constructor(userPayload: CreateUserPayload, role: Role) {
    this.name = userPayload?.name;
    this.lastName = userPayload?.lastName;
    this.email = userPayload?.email;
    this.password = userPayload?.password;
    this.role = role;
  }

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

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ referencedColumnName: 'id', name: 'role_id' })
  role!: Role;

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
