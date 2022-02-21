import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from '../dto/singup.dto';
import { UserEntity } from '../../globals/entities/user.entity';
import { Permission } from '../enums';
import { UserRepository } from 'src/globals/repository/user.repository';
import { SocialDto } from '../dto/social.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'username',
      password: 'password',
      permissions: [Permission.CREATE_CAT, Permission.UPDATE_CAT]
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      permissions: [Permission.CREATE_CAT, Permission.UPDATE_CAT]
    },
  ];

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) { }

  async findOne(username: string): Promise<UserEntity> {
    return await this.userRepository.findByEmail(username)
  }

  async create(signupDto: SignupDto): Promise<UserEntity> {
    return this.userRepository.createUser(signupDto);
  }

  async resetPassword(dto: ResetPasswordDto): Promise<UserEntity> {
    if(dto.password !== dto.cpassword){
      throw new BadRequestException();
    }
    console.log(dto.req.user);
    const user = await this.userRepository.findOne(dto.req.user.userId);
    if (user) {
      user.password = dto.password;
      return user.save();
    }
    throw new UnauthorizedException();
  }

  async socialLogin(socialDto: SocialDto): Promise<UserEntity> {
    return this.userRepository.socialLogin(socialDto);
  }
}