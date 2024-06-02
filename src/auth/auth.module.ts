import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({ //ahora es asincrono y va a esperar a configservice lea las var de entorno
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "1d" },
        global: true,
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[JwtModule] // porque cada ruta protegida accede a este auth guard
})
export class AuthModule {}
