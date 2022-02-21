import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { config } from 'src/globals/config';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: any, token: string) {
    const url = config.frontend+`auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: user.name,
        url,
      },
    });
  }

  async sendForgotPassword(user: any, token: string) {
    const url = config.frontend+`auth/reset-password?token=${token}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Reset Password Notification',
      template: 'forgot-password',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
