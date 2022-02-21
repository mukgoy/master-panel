import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/globals/modules/mail/mail.service';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { SignupDto } from '../dto/singup.dto';
import { SocialDto } from '../dto/social.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(payload: any) {
    return {
      ...payload,
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(signupDto: SignupDto) {
    const user = await this.userService.create(signupDto);
    return user;
  }

  async socialLogin(socialDto: SocialDto) {
    const user = await this.userService.socialLogin(socialDto);
    return {
      ...user,
      access_token: this.jwtService.sign({...user}),
    };;
  }

  async forgotPassword(username: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user) {
      const { password, ...result } = user;
      let access_token = this.jwtService.sign(result)
      await this.mailService.sendForgotPassword(user, access_token);
      return user
    }
    throw new NotFoundException();
  }

  async resetPassword(dto: ResetPasswordDto): Promise<any> {
    return this.userService.resetPassword(dto);
  }
}