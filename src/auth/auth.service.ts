import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

/* Esto se podria modularizar pero no tengo ganas ahora.. */
import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UsersService,
        private readonly jwtService: JwtService
    ){}

    async register({name,email,password}:RegisterDto){

        const user =await this.userService.findOneByEmail(email)

        if(user) throw new BadRequestException('User already exist') // esto esta en la documentacion en la parte de excepciones de errores

        await this.userService.create({
            name,
            email,
            password: await bcryptjs.hash(password,10) // 10 tiene que ver con las palabras aleatorias q puede usar para encriptar
        })

        return {
            name,
            email
        }
    }

    
    async login({email,password}:LoginDto){
        const user =await this.userService.findByEmailWhitPassword(email) 

        if(!user) throw new UnauthorizedException('email is wrong')
        
        const isPasswordValid = await bcryptjs.compare(password,user.password)

        if(!isPasswordValid) throw new UnauthorizedException('password is wrong')

            
        const payload = {email:user.email , role:user.role}

        const token = await this.jwtService.signAsync(payload)


        return {
            email:user.email,
            token
        }
    }

    async profile({email,role}:{email:string,role:string}){
        return await this.userService.findOneByEmail(email)
    }

}
