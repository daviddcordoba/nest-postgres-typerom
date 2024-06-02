import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Breed]),AuthModule],
  controllers: [BreedsController],
  providers: [BreedsService],
  exports:[TypeOrmModule] // porque el modulo de cat necesita acceder al repository para poder funcionar
})
export class BreedsModule {}
