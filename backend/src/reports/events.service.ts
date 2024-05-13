import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { EventDto } from './dtos/Event.dto';
import { Event } from './event.entity';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Event) private repo: Repository<Event>) {}

  createEvent(event: EventDto, user: User) {
    const Event = this.repo.create(event);
    return this.repo.save(Event);
  }

  async createAllEvents(events: EventDto[], user: User): Promise<Event[]> {
    const createdEvents: Event[] = [];

    for (const event of events) {
      const newEvent = this.repo.create(event);
      const createdEvent = await this.repo.save(newEvent);
      createdEvents.push(createdEvent);
    }

    return createdEvents;
  }

  async findAllEvents() {
    return await this.repo.find();
  }

  // async approveEvent(id: number, approval: boolean) {
  //   const Event = await this.repo.findOneBy({ id });
  //   if (!Event) {
  //     throw new NotFoundException('Vehicle not Found with specified id');
  //   }

  //   Event.approved = approval;
  //   return this.repo.save(Event);
  // }

  // getEvent({ make, model, year, lng, lat, mileage }: GetEventDto) {
  //   return this.repo
  //     .createQueryBuilder()
  //     .select('AVG(price)', 'price')
  //     .where('approved IS TRUE')
  //     .andWhere('model = :model', { model })
  //     .andWhere('make = :make', { make })
  //     .andWhere('year - :year BETWEEN -3 AND 3', { year })
  //     .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
  //     .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
  //     .orderBy('ABS(mileage- :mileage)', 'DESC')
  //     .setParameters({ mileage })
  //     .limit(3)
  //     .getRawMany();
  // }
}
