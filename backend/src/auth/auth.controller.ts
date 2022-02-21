
import { Controller, Request, Post, UseGuards, Body, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './services/auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './services/local-auth.guard';
import { SignupDto } from './dto/singup.dto';
import { SocialDto } from './dto/social.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Auth } from './services';

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto).catch(err => {
      if (err.writeErrors) {
        throw new BadRequestException(
          'Account with this email already exists.',
        );
      }
    });
  }

  @Post("social-login")
  async socialLogin(@Body() socialDto: SocialDto) {
    return this.authService.socialLogin(socialDto).catch(err=>{
      console.log(err)
      return err
      if(err.code == "ER_DUP_ENTRY"){
        throw new BadRequestException(
          'Account with this email already exists.',
        );
      }
    });
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @ApiBearerAuth("access_token")
  @Auth()
  @Post('reset-password')
  async resetPassword(@Request() req, @Body() dto: ResetPasswordDto) {
    dto.req = req
    return this.authService.resetPassword(dto);
  }

}
