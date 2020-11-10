import { Column, Entity, PrimaryColumn } from "typeorm";
import { IUser } from "../../core/entities/user";

@Entity('user')
export class User implements IUser {
 @PrimaryColumn()
 name: string;

 @Column()
 email: string;
}