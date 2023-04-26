import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import  { UserService } from './user.service'
import { AuthGuard } from './../auth/guard/index';
import { getUser } from 'src/auth/decorator';
import { Users } from '@prisma/client';
import { ChangeInDto, EditUserDto } from 'src/auth/dto';

@Controller('user')
export class UserController {

    constructor(
        private userService : UserService
    ){}

    
    @Post('recover')
    recover(){
        
        return this.userService.recover()
    }
    
    @Patch('reset/:token')
    reset(){
        return this.userService.reset()
    }
    
    @Patch('change/password')
    @UseGuards(AuthGuard)
    changPassword(

        @Body() passwordDto : ChangeInDto,

        @getUser('email') email : string,

    ){

        return this.userService.changPassword(email, passwordDto)

    }

    @Patch('change/detail')
    @UseGuards(AuthGuard)
    updateInfo(

        @Body() info : EditUserDto,

        @getUser('email') email : string,

    ){

        return this.userService.updateInfo(email, info)

    }

}
