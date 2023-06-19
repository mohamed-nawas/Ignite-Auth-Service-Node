import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { RoleCreateRequestDto } from "../dto/request/RoleCreateRequestDto";
import { DtoProperty } from "../enums/DtoProperty";
import { randomUUID } from "crypto";
import { EntityProperty } from "../enums/EntityProperty";
import Permission from "./Permission";


/**
 * Role entity
 */
@Entity()
class Role {

    private ROLE_ID_PREFIX: string = "rid-";

    @PrimaryColumn()
    private id: string;
    @Column({nullable: false})
    private role: string;
    @ManyToMany((type) => Permission)
    @JoinTable({
        name: "role_permission",
        joinColumn: {
            name: "roleId",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "permissionId",
            referencedColumnName: "id",
        }
    })
    permissions: Permission[];

    public constructor(...args: any[]) {
        if (args.length === 0)
            return;
        if (args.length === 1) {
            if (args[0] instanceof RoleCreateRequestDto) {
                let requestDto = args[0];
                this.id = this.ROLE_ID_PREFIX + randomUUID();
                this.role = requestDto.getProperty(DtoProperty.ROLE);
            }
        }
        if (args.length === 2) {
            if (args[0] instanceof RoleCreateRequestDto && Array.isArray(args[1]) && args[1].every(e => e instanceof Permission)) {
                let requestDto = args[0];
                this.id = this.ROLE_ID_PREFIX + randomUUID();
                this.role = requestDto.getProperty(DtoProperty.ROLE);
                this.permissions = args[1];
            }
        }
    }

    public getProperty(property: EntityProperty): any {
        if (property === EntityProperty.ID)
            return this.id;
        if (property === EntityProperty.ROLE)
            return this.role;
        if (property === EntityProperty.PERMISSIONS)
            return this.permissions;
        throw new Error(`No such entity property as ${property.toString()} exists in Role`);
    }

    public setProperty(property: EntityProperty, value: any): void {
        if (property === EntityProperty.ID && typeof value === 'string') {
            this.id = value;
            return;
        }
        if (property === EntityProperty.PERMISSIONS && Array.isArray(value) && value.every(e => e instanceof Permission)) {
            this.permissions = value;
            return;
        }
        throw new Error(`Set property on Role for given args combination don't match`);
    }
}

export default Role;