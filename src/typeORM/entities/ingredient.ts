import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}

export default Ingredient;