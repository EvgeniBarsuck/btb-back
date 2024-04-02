import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from '@app/auth/auth.service';
import jwt from '@app/config/jwt';

@Module({
  imports: [JwtModule.register(jwt())],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
