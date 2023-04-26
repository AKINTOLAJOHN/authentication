import { Injectable } from "@nestjs/common"
import { Equals, IsEmail,  IsNotEmpty, IsOptional, IsString, IsStrongPassword, Matches } from "class-validator"

@Injectable()
export class AuthInDto{
    
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password : string

    
    @IsEmail()
    @IsNotEmpty()
    email : string

}

export class ChangeInDto{
    
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password : string

}


export class EditUserDto {
  
    @IsString()
    @IsOptional()
    firstName: string;
  
    @IsString()
    @IsOptional()
    lastName: string;
  }
