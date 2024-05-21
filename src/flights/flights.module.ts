import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';
import { Seat } from './entities/seats.entity';
import { Ticket } from './entities/ticket.entity';
import { User } from 'src/auth/entities/user.entity';

@Module({
  controllers: [FlightsController],
  providers: [FlightsService],
  imports:[
    TypeOrmModule.forFeature([
      Flight,
      Seat,
      Ticket,
      User
    ])
  ]
})
export class FlightsModule {}
