import { Injectable } from "@nestjs/common"
import { IsEmail,  IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

@Injectable()
export class AuthDto{
    
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password : string
    
    @IsNotEmpty()
    @IsString()
    firstName : string
    
    @IsNotEmpty()
    @IsString()
    lastName : string
    
    @IsEmail()
    @IsNotEmpty()
    email : string

}


export class EmailDto{
  
    @IsEmail()
    @IsNotEmpty()
    email : string

}