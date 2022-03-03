import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/globals/modules/mail/mail.module';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { AuthService, JwtStrategy, LocalStrategy, MasterUserService } from './services';

@Module({
  controllers: [AuthController],
  imports: [
    MailModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 60*60 + 's' },
    })
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    AuthService,
    MasterUserService,
  ],
  exports: [

  ],
})
export class AuthModule {}
