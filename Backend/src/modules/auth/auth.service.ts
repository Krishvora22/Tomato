import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, encrypt } from 'src/shared/module/bcrypt/bcrypt';

import { authMessages, passwordMessages, userMessages } from 'src/shared/keys/user.key';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { UserCoreService } from 'src/Core/user-core/user-core.service';

@Injectable()
export class AuthService {
  constructor(
    private userCoreService: UserCoreService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    console.log('SIGNUP DTO:', JSON.stringify(signUpDto, null, 2));

    const { firstName, lastName, email, password } = signUpDto;

    const isExist = await this.userCoreService.findFirst({
      where: { email, isDeleted: false },
    });

    if (isExist) {
      throw new BadRequestException(userMessages.USER_ALREADY_EXIST);
    }

    const encryptedPassword = await encrypt(password);

    const user = await this.userCoreService.create({
      data: {
        fristName: firstName,   // ✅ match Prisma schema property
        LastName: lastName,
        email,
        password: encryptedPassword,  // store password directly in user record
      },
    });

    console.log('User created:', user);

    const authToken = this.jwtService.sign({ id: user.id });

    return {
      user,
      authToken,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userCoreService.findFirst({
      where: { email, isDeleted: false },
    });

    if (!user) {
      throw new BadRequestException(userMessages.USER_NOT_FOUND);
    }

    if (!user.password) {
      throw new BadRequestException(passwordMessages.PASSWORD_SETUP);
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException(authMessages.INVALID_TOKEN);
    }

    const authToken = this.jwtService.sign({ id: user.id });

    return { user, authToken };
  }

  async resetPassword(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userCoreService.findFirst({
      where: { email, isDeleted: false },
    });

    if (!user) {
      throw new BadRequestException(userMessages.USER_NOT_FOUND);
    }

    const encryptedPassword = await encrypt(password);

    // Update password directly on the user entity
    await this.userCoreService.update({
      where: { id: user.id },
      data: { password: encryptedPassword },
    });

    return {
      success: true,
      message: passwordMessages.PASSWORD_UPDATED,
    };
  }

  async getUserById(userId: string) {
    const user = await this.userCoreService.findFirst({
      where: { id: userId, isDeleted: false },
    });

    if (!user) {
      throw new BadRequestException(userMessages.USER_NOT_FOUND);
    }

    return user;
  }
}
