import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto, AuthInDto } from './dto';
import { ConfigService } from '@nestjs/config';
import  { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2'


@Injectable()
export class AuthService {

    constructor(
        
        private prisma : PrismaService,

        private jwt : JwtService,

        private config : ConfigService,

    ){}

    async login(dtoin : AuthInDto){

        const { password, email } = dtoin;

        const user = await this.validateUser(email)

        if(!user){

            throw new ForbiddenException(

                'Credentials incorrect',
            )

        }

        const pwMatches = await argon.verify(

            user.hash, password,

        )

        if (!pwMatches){
            
            throw new ForbiddenException(

                'Credentials incorrect',

            )

        }

        return this.signtoken(user.id, user.email);
        
    }

    async signup(dto : AuthDto){
        
        const { firstName, lastName, password, email } = dto;

        const userinDto = await this.validateUser(email)

        if (userinDto){

            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

        }

        const hash = await argon.hash(password);

        await this.prisma.users.create({

                data : {

                firstName,
    
                lastName,
    
                email,
    
                hash
                
                }
            })
    
        throw new HttpException('success', HttpStatus.OK);
    

    }

    async signtoken(userId, email){

        const secret = this.config.get('jwt_secret')


        const info = { 

            email,

            userId

        };

        const token = await this.jwt.sign(info, {

            expiresIn : '60m',

            secret : secret

        })      

        return {

            access_token : token

        }
        
    }


    async validateUser(email : string) {

        const user = await this.prisma.users.findUnique({

            where : {

                email : email

            },

        })
        

        return user

    }

}
