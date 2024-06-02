import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),forwardRef(()=>AuthModule) // importante para que aparezca en la db || necesitan el authmodule ||
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService] // para que otro modulo lo pueda usar, como vendria a ser el de auth
})
export class UsersModule {}


/* Dependencia circular : cuando un modulo depende de otro modulo, solucionn forwardRef(), 
en este caso authService depende de usuarios y usuarios depende de la autorizacion y atutentifi..
quizas los usuarios se podrian mover a la carpeta de auth y asi evitar esto.
*/
