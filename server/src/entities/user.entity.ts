import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserInterface } from '../types/user';
@Entity()
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
