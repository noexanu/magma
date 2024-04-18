import { Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column('text')
  name!: string;

  @Column('text')
  email!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
