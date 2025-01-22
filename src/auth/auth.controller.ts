import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/signupUserDto';
import { LoginUserDto } from './dto/loginUserDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUpUser(
    @Body() signupUserDto: SignupUserDto,
  ): Promise<{ token: string }> {
    console.log('Signup DTO:', signupUserDto);
    return this.authService.signUpUser(signupUserDto);
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
    return this.authService.login(loginUserDto);
  }
}
