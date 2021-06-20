import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('user')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('simple-array')
  personal_filters: string[];
}

export default User;