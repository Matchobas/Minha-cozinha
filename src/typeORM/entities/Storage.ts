import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

import User from '../entities/User';
import Ingredient from '../entities/Ingredient';

@Entity('storage')
class Storage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  ingredient_id: string;

  @Column('integer')
  amount: number;

  @ManyToOne(() => User, (user: User) => user.storage)
  @JoinColumn({ name: 'user_id' })
  user: User;
  
  @ManyToOne(() => Ingredient, (ingredient: Ingredient) => ingredient.storage)
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;
}

export default Storage;