import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

import Storage from '../entities/Storage';

@Entity('user')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  personal_filters: string;

  @Column()
  username: string;

  @OneToMany(() => Storage, storage => storage.user)
  storage: Storage[];
}

export default User;