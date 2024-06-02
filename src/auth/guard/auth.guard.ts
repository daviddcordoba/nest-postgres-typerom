import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { jwtConstants } from 'src/auth/constants/jwt.constant';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService:JwtService
  ){}

  async canActivate(context: ExecutionContext): | Promise<boolean>  {

      const request = context.switchToHttp().getRequest();
      
      const token = this.extractTokenFromHeader(request)

      if(!token) throw new UnauthorizedException()

      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        )
        request['user'] = payload // el request le podemos agregar info, en este caso le agrego el usuario // elpayload tiene info publica
      } catch (error) {
        throw new UnauthorizedException()
      }

      return true;
    }

    private extractTokenFromHeader(request:Request) :string | undefined { // bearer es un estandar
      const [type,token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined
    }
} 
