import { Body, Controller, Post, Request, UnauthorizedException, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signDto } from './dtos/sign.dto';
import { AuthModule } from './auth.module';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signDto: signDto){
    const user = await this.authService.validateUser(signDto.email, signDto.password)

    if(!user){
      throw new UnauthorizedException('incorrect email or passowrd')
    }

    return this.authService.login(user)
  }
  
  @UseGuards()
  @Get('profile')
  getProfile(@Request()req){
    return req.user
  }
}
