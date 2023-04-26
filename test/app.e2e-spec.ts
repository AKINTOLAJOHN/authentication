import { Controller } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { appendFile } from "fs";
import { AppModule } from "src/app.module";
import { AuthController } from "src/auth/auth.controller";
import { AuthService } from "src/auth/auth.service";

describe('App e2e', ()=>{

  beforeAll(async ()=> {
    
    const moduleRef = await Test.createTestingModule({

      controllers : [AuthController],

      providers : [AuthService]

    }).compile();

    let app = moduleRef.createNestApplication()

    await app.init();

  })

  it.todo('we are testing our app')
});


