import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { TicketDto } from './dto/ticket.dto';
import { TicketAction } from 'src/enums/ticket-action.enum';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Post()
  create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightsService.create(createFlightDto);
  }

  @Get()
  findAll() {
    return this.flightsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightsService.findOne(id);
  }

  @Put(':action/:code')
  update(@Param('action') action: TicketAction, @Param('code') code: string, @Body() ticketDto: TicketDto){
    if(action!==TicketAction.BUY && action!==TicketAction.RESERVE){
      throw new NotFoundException();
    }
    return this.flightsService.update(action, code, ticketDto);
  }
  
}
