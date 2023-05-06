import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {

  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendMail(
    
                @Body('email') email: string, 

                @Body('subject') subject: string, 
                
                @Body('body') body: string,

                
                ): Promise<string> {

    await this.mailService.sendMail(email,subject, body);

    return 'Email sent!';

  }

}
