import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]) // importante para que aparezca en la db
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService] // para que otro modulo lo pueda usar, como vendria a ser el de auth
})
export class UsersModule {}
