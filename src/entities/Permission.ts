import { Column, Entity, PrimaryColumn } from "typeorm";
import { PermissionCreateRequestDto } from "../dto/request/PermissionCreateRequestDto";
import { DtoProperty } from "../enums/DtoProperty";
import { randomUUID } from "crypto";
import { EntityProperty } from "../enums/EntityProperty";


/**
 * Permission entity
 */
@Entity()
class Permission {

    private PERMISSION_ID_PREFIX: string = "pid-";

    @PrimaryColumn()
    private id: string;
    @Column({nullable: false})
    private permission: string;

    public constructor(...args: any[]) {
        if (args.length === 0)
            return;
        if (args.length === 1) {
            if (args[0] instanceof PermissionCreateRequestDto) {
                let requestDto = args[0];
                this.id = this.PERMISSION_ID_PREFIX + randomUUID();
                this.permission = requestDto.getProperty(DtoProperty.PERMISSION);
            } else if (typeof args[0] === 'string') {
                this.id = this.PERMISSION_ID_PREFIX + randomUUID();
                this.permission = args[0];
            }
        }
    }

    public getProperty(property: EntityProperty): string {
        if (property === EntityProperty.ID)
            return this.id;
        if (property === EntityProperty.PERMISSION)
            return this.permission;
        throw new Error(`No such entity property as ${property.toString()} exists in Permission`);
    }

    public setProperty(property: EntityProperty, value: any): void {
        if (property === EntityProperty.ID && typeof value === 'string') {
            this.id = value;
            return;
        }
        throw new Error(`Set property on Permission for given args combination don't match`);
    }
}

export default Permission;