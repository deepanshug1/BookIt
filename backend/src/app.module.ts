import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Booking } from './bookings/bookings.entity';
import { BookingsModule } from './bookings/bookings.module';
import { Event } from './reports/event.entity';
import { ReportsModule } from './reports/events.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    BookingsModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb+srv://devgarg880:Zvve3D6MzPqCoqVA@cluster0.dchjvr4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
      database: 'bookitdb',
      entities: [User, Event, Booking],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
