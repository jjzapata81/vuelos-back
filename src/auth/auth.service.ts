import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';

@Injectable()
export class AuthService {
  
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async findById(id: number) {
    const { password, ...user } = await this.userRepository.findOneBy({id});
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    try{
      const {password, ...userData} = createUserDto;
      const newUser = this.userRepository.create({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      });
      await this.userRepository.save(newUser);
      const {password:_, ...user} = newUser
      return user;
    }catch(error){
      if(error.code==='23505'){
        throw  new BadRequestException(`${createUserDto.email} already exists!!`);
      }
      throw new InternalServerErrorException('Something was wrong, please contact with support!');
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOneBy({email})
    if(!user){
      throw new UnauthorizedException('Not valid credentials!');
    }
    if( !bcryptjs.compareSync(password, user.password)){
      throw new UnauthorizedException('Not valid credentials!');
    }

    const { password:_, ...rest} = user;
    const token = this.getJwtToken({id:user.id, email:user.email});
    return {
      user: rest,
      token: token
    }

  }

  findAll() {
    return `This action returns all auth`;
  }

  async findOne(email:string) {
    const user = await this.userRepository.findOneBy({email});
    if(!user){
      throw new NotFoundException(`No existe un usuario con el email ${email}`)
    }
    return user;
  }

  private getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;

  }
}
