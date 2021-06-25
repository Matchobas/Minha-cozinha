import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

import Storage from '../entities/storage';

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
  public storage!: Storage[];
}

export default User;