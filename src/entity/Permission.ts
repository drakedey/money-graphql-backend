import {
  Entity, PrimaryColumn, Column, ManyToMany,
} from 'typeorm';
import Role from './Role';


enum PermissionType {
  View = 'VIEW',
  Execute = 'EXECUTE'
}

@Entity({
  name: 'permission',
})
class Permission {
  @PrimaryColumn({
    name: 'id',
  })
  id!: string;

  @Column({
    name: 'type',
  })
  type: PermissionType = PermissionType.View;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 200,
  })
  description!: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles!: Role[];
}

export { Permission, PermissionType };
