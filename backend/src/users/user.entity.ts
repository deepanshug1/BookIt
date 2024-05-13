import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ default: true })
  admin: boolean;

  @Column()
  email: string;

  @Column()
  password: string;

  // @OneToMany(() => Event, (event) => event.user)
  // events: Event[];

  // @AfterInsert()
  // logInsert() {
  //   console.log('User created with email: ', this.email);
  // }

  // @AfterUpdate()
  // logUpdate() {
  //   console.log('User updated with email: ', this.email);
  // }

  // @AfterRemove()
  // logRemove() {
  //   console.log('User removed with email: ', this.email);
  // }
}
