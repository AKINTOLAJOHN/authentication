import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './../auth/guard/index';
import SecretGenerator from './otp/secret-generator';
import OtpGenerator from './otp/otp-generator';
import OtpValidator from './otp/otp-validator';

@Global()
@Module({
  imports : [JwtModule.register({
    global: true,
    
})],
controllers: [AuthController],

providers: [AuthService, AuthGuard, SecretGenerator,OtpGenerator, OtpValidator],

  exports : [AuthGuard]
})
export class AuthModule {}
