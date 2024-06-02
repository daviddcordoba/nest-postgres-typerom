import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Role } from 'src/common/enums/rol.enum';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>
  ){}

  async create(createCatDto: CreateCatDto, user: UserActiveInterface) {
    const breed = await this.validateBreedExist(createCatDto.breed)

    return await this.catRepository.save({
      ...createCatDto,
      breed,
      userEmail:user.email
    }); // aca si guardo
  
  }

  async findAll(user: UserActiveInterface) {
    if(user.role === Role.ADMIN) {
      return await this.catRepository.find();
    }
    return await this.catRepository.find({
      where:{userEmail:user.email}
    });
  }

  async findOne(id: number,user:UserActiveInterface) {
    const cat = await this.catRepository.findOneBy({id});

    if(!cat) throw new BadRequestException('Cat not found')
    
    this.validateOwnerShip(cat,user)//principio solid
    
    return cat
  }

  async update(id: number, updateCatDto: UpdateCatDto,user:UserActiveInterface) {

    await this.findOne(id,user)
    const breed = await this.validateBreedExist(updateCatDto.breed)

    return await this.catRepository.update(id,{
      ...updateCatDto,
      breed:breed,
      userEmail: user.email
    });
  }

  async remove(id: number,user:UserActiveInterface) {
    await this.findOne(id,user); // con esto ya valido al owner o si es admin porque el metodo esta dentro de .findOne()

    return await this.catRepository.softDelete({id})
  }
  private validateOwnerShip(cat:Cat,user:UserActiveInterface){// principio solid
    if(user.role !== Role.ADMIN && cat.userEmail !== user.email){
      throw new UnauthorizedException('You dont have permissions')
    }
  }

  private async validateBreedExist(breed:string){ // idem al de arriba
    const breed_db = await this.breedRepository.findOneBy({name: breed})

    if(!breed_db){
      throw new BadRequestException('Breed not found') // lanza un error de exepcion
    }

    return breed_db
  }
}
