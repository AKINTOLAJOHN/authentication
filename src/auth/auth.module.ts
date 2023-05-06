import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './../auth/guard/index';

@Global()
@Module({

  imports : [JwtModule.register({

    global: true,
    
  })],

  controllers: [AuthController],

  providers: [AuthService, AuthGuard,],

})
export class AuthModule {}
