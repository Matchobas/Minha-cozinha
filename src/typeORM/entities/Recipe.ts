import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recipes')
class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  ingredients: string;
}

export default Recipe;