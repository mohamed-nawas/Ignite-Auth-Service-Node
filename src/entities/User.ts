import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { UserCreateRequestDto } from "../dto/request/UserCreateRequestDto";
import { DtoProperty } from "../enums/DtoProperty";
import { randomUUID } from "crypto";
import { EntityProperty } from "../enums/EntityProperty";
import Role from "./Role";


/**
 * User entity
 */
@Entity()
class User {

    private USER_ID_PREFIX: string = "uid-";

    @PrimaryColumn()
    private id: string;
    @Column({nullable: false, length: 15})
    private firstname: string;
    @Column({nullable: false, length: 15})
    private lastname: string;
    @Column({nullable: false, unique: true, length: 50})
    private email: string;
    @Column({nullable: false})
    private password: string;
    @ManyToMany((type) => Role)
    @JoinTable({
        name: "user_role",
        joinColumn: {
            name: "userId",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "roleId",
            referencedColumnName: "id",
        }
    })
    roles: Role[];

    public constructor(...args: any[]) {
        if (args.length === 0)
            return;
        if (args.length === 1) {
            if (args[0] instanceof UserCreateRequestDto) {
                let requestDto = args[0];
                this.id = this.USER_ID_PREFIX + randomUUID();
                this.firstname = requestDto.getProperty(DtoProperty.FIRSTNAME);
                this.lastname = requestDto.getProperty(DtoProperty.LASTNAME);
                this.email = requestDto.getProperty(DtoProperty.EMAIL);
                this.password = requestDto.getProperty(DtoProperty.PASSWORD);
            }
        }
        if (args.length === 2) {
            if (args[0] instanceof UserCreateRequestDto && Array.isArray(args[1]) && args[1].every(e => e instanceof Role)) {
                let requestDto = args[0];
                this.id = this.USER_ID_PREFIX + randomUUID();
                this.firstname = requestDto.getProperty(DtoProperty.FIRSTNAME);
                this.lastname = requestDto.getProperty(DtoProperty.LASTNAME);
                this.email = requestDto.getProperty(DtoProperty.EMAIL);
                this.password = requestDto.getProperty(DtoProperty.PASSWORD);
                this.roles = args[1];
            }
        }
    }

    public getProperty(property: EntityProperty): any {
        if (property === EntityProperty.ID)
            return this.id;
        if (property === EntityProperty.FIRSTNAME)
            return this.firstname;
        if (property === EntityProperty.LASTNAME)
            return this.lastname;
        if (property === EntityProperty.EMAIL)
            return this.email;
        if (property === EntityProperty.PASSWORD)
            return this.password;
        if (property === EntityProperty.ROLES)
            return this.roles;
        throw new Error(`No such entity property as ${property.toString()} exists in User`);
    }

    public setPassword(password: string): void {
        this.password = password;
    }
}

export default User;