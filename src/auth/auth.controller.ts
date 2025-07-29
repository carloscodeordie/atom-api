import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/dtos/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create a new user' })
  signup(@Body() user: UserDto) {
    return this.authService.signup(user);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Login user and return JWT' })
  signin(@Body() user: UserDto) {
    return this.authService.signin(user);
  }
}
