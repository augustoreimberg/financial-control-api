import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '@/domain/user/application/repositories/user-repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.userRepository.findById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      return {
        id: user.id.toString(),
        email: user.email,
        role: user.role,
      };
    } catch (error) {
      console.error('Error in JwtStrategy:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
