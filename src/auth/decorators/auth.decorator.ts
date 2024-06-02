import { UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "../../common/enums/rol.enum";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";

export function Auth(role:Role){
    return applyDecorators(
        Roles(role), // decorador que no existe en next -> lo tengo que crear
        UseGuards(AuthGuard,RolesGuard) // es como un middleware de express
        
    )
}