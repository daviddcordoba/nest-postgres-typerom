import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Auth(Role.USER)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto, @ActiveUser() user : UserActiveInterface) { // aca veo que pasa por el dto, si no pasa -> error
    return this.catsService.create(createCatDto,user);
  }

  @Get()
  async findAll(@ActiveUser() user : UserActiveInterface) {
    return this.catsService.findAll(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: number,@ActiveUser() user : UserActiveInterface) {
    return this.catsService.findOne(id,user);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto,@ActiveUser() user : UserActiveInterface) { 
    return this.catsService.update(id, updateCatDto,user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number,@ActiveUser() user : UserActiveInterface) {
    return this.catsService.remove(id,user);
  }
}

//el patch podemos hacer modificaciones parciales