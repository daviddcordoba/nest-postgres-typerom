import { IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateCatDto { // aca va info que voy a recibir
    
    @IsString()
    @MinLength(1)
    name: string;

    @IsInt()
    @IsPositive()
    age:number;

    @IsString()
    @IsOptional()
    breed?:string;
}


//un dto(data transfer object) es la info que vmos a permitir que me llegue, es la data que se esta gestionando desde el client hacia el controlador, es como mapear la info que le va a llegar, para que yo no tenga que estar preparado para lo que me llegue
