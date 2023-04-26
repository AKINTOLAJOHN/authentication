import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { ChangeInDto, EditUserDto } from 'src/auth/dto';
import { AuthService } from 'src/auth/auth.service';
import SecretGenerator from 'src/auth/otp/secret-generator';
import OtpGenerator from 'src/auth/otp/otp-generator';
import OtpValidator from 'src/auth/otp/otp-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor (
        private otpValidator : OtpValidator,

        private  prisma : PrismaService
    ){

    }

    async validateToken(secret: string, token: string): Promise<any> {
        const result = this.otpValidator.validateOtp(secret, token);
        return result;
      }

    async activate(){

        return 'activate'
    }

    async recover(){

        return 'recover'
    }

    async reset(){
        return 'reset'
    }

    async changPassword(email : string, password : ChangeInDto){

        const hash = await argon.hash(password.password)

        const user = await this.prisma.users.update({
            where: {

              email 

            },
            data: {

                hash 

            },

          });

          throw new HttpException('success', HttpStatus.OK);

        
    }

    async  updateInfo(email : string, info : EditUserDto){

        const user = await this.prisma.users.update({
            where: {

              email 

            },
            data: {

                ...info

            },

          });

          throw new HttpException('success', HttpStatus.OK);


    }
    
}
