/* eslint-disable import/no-cycle */
import {
  Entity, Column, OneToMany, PrimaryColumn, ManyToMany, JoinTable,
} from 'typeorm';

import User from './User';
import { Permission } from './Permission';

@Entity({
  name: 'role',
})
class Role {
  @PrimaryColumn({ name: 'id' })
  id!: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 40,
  })
  name!: string;

  @OneToMany(() => User, (user) => user.role, { lazy: true })
  users!: User[];


  @ManyToMany(() => Permission, (permission) => permission.roles, { lazy: true })
  @JoinTable({
    name: 'permission_role',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions!: Permission[];
}

export default Role;
