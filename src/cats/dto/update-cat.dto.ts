import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';


//toma el dto de cat y los deja opcionales
export class UpdateCatDto extends PartialType(CreateCatDto) {}
