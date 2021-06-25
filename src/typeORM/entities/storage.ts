import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import User from '../entities/user';
import Ingredient from '../entities/ingredient';

@Entity('storage')
class Storage {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('uuid')
  public user_id!: string;

  @Column('uuid')
  public ingredient_id!: string;

  @Column('integer')
  public amount!: number;

  @ManyToOne(() => User, user => user.storage)
  public user!: User;
  
  @ManyToOne(() => Ingredient, ingredient => ingredient.storage)
  public ingredient!: Ingredient;
}

export default Storage;