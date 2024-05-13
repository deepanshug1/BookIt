import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Event {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column({ default: 'assets/1.jpg' })
  imagePath: string;

  @Column()
  date: string;

  @Column()
  location: string;

  @Column()
  openBooking: boolean;
}
