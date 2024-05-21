import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';
import { Repository } from 'typeorm';
import { SEATS } from './constants/seats.constants';
import { Seat } from './entities/seats.entity';

@Injectable()
export class FlightsService {

  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>
  ){}

  async create(createFlightDto: CreateFlightDto) {
    try{
      const flight = this.flightRepository.create({
        ...createFlightDto,
        seats: SEATS.map( seat => this.seatRepository.create(seat))
      });
      return await this.flightRepository.save(flight);
    }catch(error){
      throw new BadRequestException();
    }
  }

  async findAll() {
    return this.flightRepository.find();
  }

  async findOne(code: string) {
    return this.flightRepository.findBy({code});
  }

  update(id: number, updateFlightDto: UpdateFlightDto) {
    return `This action updates a #${id} flight`;
  }

  remove(id: number) {
    return `This action removes a #${id} flight`;
  }
}
