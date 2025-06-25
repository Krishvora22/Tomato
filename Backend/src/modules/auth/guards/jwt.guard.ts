import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    let payload: any;
    try {
      payload = this.jwtService.verify(token); // Ensure JwtModule is properly configured
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    const prisma = new PrismaClient();
    // const user = await prisma.user.findUnique({
    //   where: { id: payload.sub }, // or use email/username depending on your token
    // });

    const user = await prisma.user.findUnique({
  where: { id: payload.id }, // ✅ use 'id', not 'sub'
});


    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    request.user = user; // attach user to request object
    return true;
  }
}
