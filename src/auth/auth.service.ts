import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginResponse } from './interfaces/login-response.interface';

import { LoginDto, CreateUserDto, UpdateAuthDto, RegisterUserDto } from './dto';

@Injectable()
export class AuthService {
 

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService:JwtService
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponse> {

    const {email, password} = loginDto;

    const user = await this.userModel.findOne({email});

    if(!user || !bcryptjs.compareSync(password, user.password)){
      throw new UnauthorizedException('Not valid credentials');
    }

    const { password:_, ...rest} = user.toJSON();

    return {
      user: rest,
      token:this.getJwt({id:user.id})
    };
    
  }

  async registerUser(registerUserDto: RegisterUserDto): Promise<LoginResponse> {
    const user = await this.create(registerUserDto);
    return {
      user,
      token: this.getJwt({id:user._id})
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {

    try{
      const { password, ...userData } = createUserDto;
      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      });
      await newUser.save();
      const { password:_, ...user} = newUser.toJSON();
      return user;
    }catch(error){
      if(error.code===11000){
        throw new BadRequestException(`${createUserDto.email} already exists!` );
      }
      throw new InternalServerErrorException(`ERROR: ${error.description}`)
    }
  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  private getJwt(payload:JwtPayload){
    return this.jwtService.sign(payload);
  }

  findOne(id: number) {
    return `Find an object with the id: ${id}`;
  }

  findById(id:string){
    return this.userModel.findById(id);
  }
}
