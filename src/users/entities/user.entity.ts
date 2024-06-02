import { Role } from "../../common/enums/rol.enum"; // a veces es mejor no usar el src porque nos puede tirar errores en el deploy
import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class User {//como se va a comportar el usuario en la db, que propidades y valores va a tenrer
    @Column({primary:true,generated:true})
    id:number;

    @Column()
    name:string;

    @Column({unique:true,nullable:false})
    email:string;

    @Column({nullable:false, select:false})
    password:string;

    @Column({type:'enum',default:Role.USER,enum:Role})
    role:Role;

    @DeleteDateColumn()
    deletedAt:Date;
}
