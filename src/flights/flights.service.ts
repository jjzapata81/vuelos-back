import { Injectable } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FlightsService {

  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>
  ){

  }

  async create(createFlightDto: CreateFlightDto) {
    const flight = this.flightRepository.create(createFlightDto);
    return this.flightRepository.save(flight);
  }

  async findAll() {
    return this.flightRepository.find();
  }

  findOne(id: number) {
    return this.flightRepository.findBy({id});
  }

  update(id: number, updateFlightDto: UpdateFlightDto) {
    return `This action updates a #${id} flight`;
  }

  remove(id: number) {
    return `This action removes a #${id} flight`;
  }
}
