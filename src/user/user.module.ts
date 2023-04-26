import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import SecretGenerator from 'src/auth/otp/secret-generator';
import OtpGenerator from 'src/auth/otp/otp-generator';
import OtpValidator from 'src/auth/otp/otp-validator';
import { AuthGuard } from './../auth/guard/index';

@Module({
  imports : [
    ConfigModule.forRoot({
      isGlobal : true
    }),
  ],
  providers: [UserService, AuthService,SecretGenerator, OtpGenerator, OtpValidator],
  controllers: [UserController, ]
})
export class UserModule {}
