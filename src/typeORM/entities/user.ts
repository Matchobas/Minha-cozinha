import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('user')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  personal_filters: string;
}

export default User;