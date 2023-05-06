import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from './../auth/guard/index';
import { MailService } from 'src/mail/mail.service';
import { MailController } from 'src/mail/mail.controller';

@Module({
  imports : [
    
    ConfigModule.forRoot({

      isGlobal : true

    }),

  ],

  providers: [UserService, AuthService, MailService],

  controllers: [UserController, MailController]
})
export class UserModule {}

