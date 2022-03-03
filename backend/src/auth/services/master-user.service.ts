import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from '../dto/singup.dto';
import { MasterUserEntity } from '../../globals/entities/master-user.entity';
import { Permission } from '../enums';
import { MasterUserRepository } from 'src/globals/repository/master-user.repository';
import { SocialDto } from '../dto/social.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

export type User = any;

@Injectable()
export class MasterUserService {
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
    @InjectRepository(MasterUserRepository)
    private readonly userRepository: MasterUserRepository
  ) { }

  async findOne(username: string): Promise<MasterUserEntity> {
    return await this.userRepository.findByEmail(username)
  }

  async create(signupDto: SignupDto): Promise<MasterUserEntity> {
    return this.userRepository.createUser(signupDto);
  }

  async resetPassword(dto: ResetPasswordDto): Promise<MasterUserEntity> {
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

  async socialLogin(socialDto: SocialDto): Promise<MasterUserEntity> {
    return this.userRepository.socialLogin(socialDto);
  }
}