import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import Storage from '../entities/storage';

@Entity('ingredient')
class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('real')
  kcal_value: number;

  @Column()
  type: string;

  @Column()
  info: string;

  @OneToMany(() => Storage, storage => storage.ingredient)
  public storage!: Storage[];
}

export default Ingredient;