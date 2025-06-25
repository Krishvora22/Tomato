import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { LastSessionDto, LoginDto, SignUpDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

@ApiTags('user-auth')
@Controller('user/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'user sign-up' })
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'user login' })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }


  @Post('reset-password')
  @ApiOperation({ summary: 'reset-password' })
  async resetPaassword(@Body() loginDto: LoginDto) {
    return await this.authService.resetPassword(loginDto);
  }

  

  @Get(':userId')
  @ApiOperation({ summary: 'get user by ID' })
  async getUserById(@Param('userId') userId: string) {
    return await this.authService.getUserById(userId);
  }
}
