import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { ChangeInDto, EditUserDto, EmailDto } from 'src/auth/dto';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as crypto from 'crypto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
    constructor (

        private authservice : AuthService,

        private  prisma : PrismaService,

        private mailservice : MailService

    ){}

    async getReset(){

        return 'getReset'
    }

    async recover(emailAddress,hosts){

        const user = this.authservice.validateUser(emailAddress)

        if(!user){
            
            throw new ForbiddenException(
    
                'Credentials incorrect',
    
            )

        }

        const resetPasswordToken = await crypto.randomBytes(64).toString('hex')

        const resetPasswordExpires = `${Date.now() + 360000}`
        
        await this.prisma.users.update({

            where : {

                id : (await user).id,

            },
            data: {

                resetPasswordToken,

                resetPasswordExpires

            }

        });

        let link = `http://${hosts}/user/reset/${resetPasswordToken}`

        let email =  (await user).email

        const subject = 'Request to Reset Password ✔'

        const body =  `

        <div>Reset Password</div>

        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >

        <div>Dear user, <br>
        You are trying to reset the password linked with your account.</div><br>

          <p> follow this link ${link} </p>
  
          <p style="margin-bottom: 30px;">tThe verification code will be valid for 30 minutes. Please do not share your code with anyone. </b></p>
  
        </div>` 

        await this.mailservice.sendMail(email,subject, body)
        
    }

    async reset(password : ChangeInDto, token: string){

        const verify = await this.prisma.users.findFirst({

            where: {
              
                resetPasswordToken : token
              
            },

          });

          if(!verify){

            throw new ForbiddenException(
    
                'Credentials incorrect',
    
            )

          }

          const dates = parseInt(verify.resetPasswordExpires)
          
          if (verify.resetPasswordExpires == null || dates < Date.now() ){
              
            throw new ForbiddenException(

              dates,
    
                'Credentials incorrect',
    
            )
              
        }
        const hash = await argon.hash(password.password)

        await this.prisma.users.update({
            where: {

              email : verify.email

            },
            data: {

                hash,
                
                resetPasswordExpires : null,

                resetPasswordToken : null

            },

          });

          let email =   verify.email

          const subject = `Reset Password success ✔`
  
          const body =  `
  
          <div>Reset Password success</div>
  
          <div
            class="container"
            style="max-width: 90%; margin: auto; padding-top: 20px"
          >
  
          <div>Dear user, <br>
          Your reset password linked with your account. is success</div><br>

    
          </div>` 
  
          await this.mailservice.sendMail(email,subject, body)

    }

    async changPassword(email : string, password : ChangeInDto){

        const hash = await argon.hash(password.password)

        await this.prisma.users.update({
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

        await this.prisma.users.update({

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
