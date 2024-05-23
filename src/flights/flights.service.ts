import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';
import { Repository } from 'typeorm';
import { SEATS } from './constants/seats.constants';
import { Seat } from './entities/seats.entity';
import { TicketDto } from './dto/ticket.dto';
import { TicketAction } from 'src/enums/ticket-action.enum';
import { User } from 'src/auth/entities/user.entity';
import { Ticket } from './entities/ticket.entity';
import { TicketState } from 'src/enums/ticket-state.enum';
import { SeatState } from 'src/enums/seat-state.enum';

@Injectable()
export class FlightsService {
  

  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>
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
    const flight = await this.flightRepository.findOne({
      where:{code}
    });
    if(!flight){
      throw new NotFoundException(`No existe un vuelo con el código ${code}`);
    }
    return flight;
  }

  async findByCity(from: string, to:string) {
    const flight = await this.flightRepository.find({
      where:{from, to},
    });
    if(flight.length===0){
      throw new NotFoundException(`No existe un vuelo con los criterios de búsqueda`);
    }
    return flight;
  }

  async update(action: TicketAction, code: string, ticketDto: TicketDto) {
    const { seat, ...flight } = await this.findOneWithSeat(code, ticketDto.seatCode);
    const user = await this.findUser(ticketDto.email);
    seat.state = action===TicketAction.BUY ? SeatState.PURCHASED : SeatState.RESERVED
    const ticket = this.ticketRepository.create({
      price: ticketDto.price,
      ticketType:ticketDto.ticketType,
      state: action===TicketAction.BUY ? TicketState.PAID : TicketState.RESERVED,
      flight,
      user,
      seat
    });
    try{
      return await this.ticketRepository.save(ticket);
    }catch(error){
      console.log(error);
      throw new InternalServerErrorException(error);
    }

  }

  private async findOneWithSeat(code: string, seatCode:string){
    const {tickets:_, seats, ...flight} = await this.findOne(code);
    const seat = seats.find(seat => seat.code===seatCode);
    if(!seat || seat.state!==SeatState.AVAILABLE){
      throw new BadRequestException(`El asiento ${seatCode} no está disponible`)
    }
    return {
      ...flight,
      seat
    }
  }

  private async findUser(email:string){
    const {password, ...user} = await this.userRepository.findOneBy({email});
    if(!user){
      throw new NotFoundException(`No existe un usuario con el email ${email}`)
    }
    return user;
  }

}
