import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Booking {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  tickets: number;

  @Column()
  event: string;
}
