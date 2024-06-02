import { Breed } from "src/breeds/entities/breed.entity"
import { User } from "src/users/entities/user.entity"
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne} from "typeorm"

// REPOSITORY PATTERN with typeorm(orm que se encarga de todo lo pesado con la db)

@Entity() //decorador
export class Cat {

    @Column({primary:true, generated:true})
    id:number  

    @Column()
    name:string

    @Column()
    age:number


    @DeleteDateColumn() // eliminacion y le pone la fecha en que se elimino
    deletedAt: Date

    @ManyToOne(()=>Breed,(breed)=> breed.id,{
        eager:true // para que traiga la raza con un findOne
    })
    breed:Breed;

    @ManyToOne(() => User)
    @JoinColumn({name:'userEmail',referencedColumnName:'email'})
    user:User;
    
    @Column()
    userEmail: string;
}

/*cada vez que queramos trabajr con db en nest, atacamos aca. 
van a ser cada una de las propiedades e informacion de los gatos que se va a guardar en la db 
vamos a usar typeorm -> es como sequelize.. */