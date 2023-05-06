import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import  { UserService } from './user.service'
import { AuthGuard } from './../auth/guard/index';
import { getUser } from 'src/auth/decorator';
import { Users } from '@prisma/client';
import { ChangeInDto, EditUserDto, EmailDto } from 'src/auth/dto';
import { Request } from 'express';

@Controller('user')
export class UserController {

    constructor(

        private userService : UserService
        
    ){}

    
    @Patch('recover')
    recover(@Body('email') email : EmailDto, @Req()  req : Request){

        const hosts = req.headers.host
        
        return this.userService.recover(email, hosts)

    }

    @Get('reset/:token')
    getReset(){

        return this.userService.getReset()

    }
    
    @Patch('reset/:token')
    reset(@Param('token', ParseIntPipe) token: string, @Body() passwordDto : ChangeInDto,){

        return this.userService.reset(passwordDto, token)

    }
    
    @Patch('change/password')
    @UseGuards(AuthGuard)
    changPassword(@Body() passwordDto : ChangeInDto, @getUser('email') email : string){

        return this.userService.changPassword(email, passwordDto)

    }

    @Patch('change/detail')
    @UseGuards(AuthGuard)
    updateInfo(@Body() info : EditUserDto, @getUser('email') email : string,){

        return this.userService.updateInfo(email, info)

    }

}
