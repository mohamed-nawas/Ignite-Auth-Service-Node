import Role from "../../src/entities/Role";
import { EntityProperty } from "../../src/enums/EntityProperty";
import { RoleType } from "../../src/enums/RoleType";
import { RoleAlreadyExistsException } from "../../src/exceptions/RoleAlreadyExistsException";
import { RoleNotFoundException } from "../../src/exceptions/RoleNotFoundException";
import { RoleRepository } from "../../src/repository/RoleRepository";
import { RoleService } from "../../src/services/RoleService";



jest.mock('../../src/repository/RoleRepository', () => {
    return {
        RoleRepository: jest.fn(),
    }
});



const role = new Role();
role.setProperty(EntityProperty.ID, "rid-123");
let mockedRoleRepository: jest.Mock;
let RoleServiceInstance: RoleService;
mockedRoleRepository = RoleRepository as jest.Mock;



describe('RoleService, createRole method test', () => {
    let mockedFindByRole: jest.Mock;
    let mockedSave: jest.Mock;

    beforeEach(() => {
        mockedFindByRole = jest.fn();
        mockedSave = jest.fn();
        mockedRoleRepository.mockReturnValue({
            save: mockedSave,
            findByRole: mockedFindByRole,
        });
        RoleServiceInstance = new RoleService();
    });

    test('Should create role, when creating role is successful', async () => {
        mockedFindByRole.mockResolvedValue(null);
        mockedSave.mockResolvedValue(role);

        await RoleServiceInstance.createRole(role);
        expect(mockedFindByRole).toHaveBeenNthCalledWith<[RoleType]>(1, role.getProperty(EntityProperty.ROLE));
        expect(mockedSave).toHaveBeenNthCalledWith<[Role]>(1, role);
        // expect(mockedFindByRole).toHaveBeenCalledBefore(mockedSave);
    })

    test('Should throw RoleAlreadyExistsException, when creating role for role already exists', async () => {
        mockedFindByRole.mockResolvedValue(role);

        await expect(RoleServiceInstance.createRole(role))
        .rejects.toThrow(new RoleAlreadyExistsException("Role already exists"));
        expect(mockedFindByRole).toHaveBeenNthCalledWith<[RoleType]>(1, role.getProperty(EntityProperty.ROLE));
    })
})



describe('RoleService, findByRole method test', () => {
    let mockedFindByRole: jest.Mock;

    beforeEach(() => {
        mockedFindByRole = jest.fn();
        mockedRoleRepository.mockReturnValue({
            findByRole: mockedFindByRole,
        });
        RoleServiceInstance = new RoleService();
    });

    test('Should return role, when finding by role is successful', async () => {
        mockedFindByRole.mockResolvedValue(role);

        const result = await RoleServiceInstance.findByRole(RoleType.USER);
        expect(result).toBe(role);
        expect(result.getProperty(EntityProperty.ID)).toBe("rid-123")
    })

    test('Should throw RoleNotFoundException, when finding by role for role not found', async () => {
        mockedFindByRole.mockResolvedValue(null);

        await expect(RoleServiceInstance.findByRole(RoleType.USER))
        .rejects.toThrow(new RoleNotFoundException("Role not found for the given role type: " + RoleType.USER.toString()));
    })
})