import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';

@Module({
  controllers: [FlightsController],
  providers: [FlightsService],
  imports:[
    TypeOrmModule.forFeature([
      Flight
    ])
  ]
})
export class FlightsModule {}
