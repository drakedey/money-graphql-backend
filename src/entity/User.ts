import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'money_user',
})
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 44,
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
}

export default User;
