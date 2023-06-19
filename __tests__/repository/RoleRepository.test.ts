import { getRepository } from "../../src/repository/Repository";
import Role from "../../src/entities/Role";
import { EntityProperty } from "../../src/enums/EntityProperty";
import { AuthServiceException } from "../../src/exceptions/AuthServiceException";
import { RoleType } from "../../src/enums/RoleType";
import { RoleRepository } from "../../src/repository/RoleRepository";



jest.mock('../../src/repository/Repository', () => {
    return {
        getRepository: jest.fn(),
    }
});



const role = new Role();
role.setProperty(EntityProperty.ID, "rid-123");
let mockedGetRepository: jest.Mock;
let RoleRepositoryInstance: RoleRepository;
mockedGetRepository = getRepository as jest.Mock;



describe('RoleRepository, save method test', () => {
    let mockedSave: jest.Mock;

    beforeEach(() => {
        mockedSave = jest.fn();
        mockedGetRepository.mockReturnValue({
            save: mockedSave,
        });
        RoleRepositoryInstance = new RoleRepository();
    });

    test('Should save role, when saving role is successful', async () => {
        mockedSave.mockResolvedValue(role);

        const result = await RoleRepositoryInstance.save(role);
        expect(result).toBe(role);
        expect(result.getProperty(EntityProperty.ID)).toBe("rid-123");
        expect(mockedSave).toHaveBeenNthCalledWith<[Role]>(1, role);
    });

    test('Should throw AuthServiceException, when saving role is failed', async () => {
        mockedSave.mockRejectedValue('');

        await expect(RoleRepositoryInstance.save(role))
        .rejects.toThrow(new AuthServiceException("Error occurred when saving a role to DB"));
        expect(mockedSave).toHaveBeenNthCalledWith<[Role]>(1, role);
    })
})



describe('RoleRepository, findByRole method test', () => {
    let createQueryBuilderSpy: jest.Mock;
    let selectSpy: jest.Mock;
    let whereSpy: jest.Mock;
    let mockedFindByRoleSpy: jest.Mock;

    beforeEach(() => {
        createQueryBuilderSpy = jest.fn().mockReturnThis();
        selectSpy = jest.fn().mockReturnThis();
        whereSpy = jest.fn().mockReturnThis();
        mockedFindByRoleSpy = jest.fn();
        mockedGetRepository.mockReturnValue({
            createQueryBuilder: createQueryBuilderSpy,
            select: selectSpy,
            where: whereSpy,
            getOne: mockedFindByRoleSpy,
        });
        RoleRepositoryInstance = new RoleRepository();
    });

    test('Should return role, when finding by role is successful', async () => {

        mockedFindByRoleSpy.mockResolvedValue(role);

        const result = await RoleRepositoryInstance.findByRole(RoleType.USER);
        expect(result).toBe(role);
        // expect(result.getProperty(EntityProperty.ID)).toBe("rid-123");
        expect(createQueryBuilderSpy).toHaveBeenNthCalledWith<[]>(1);
        expect(selectSpy).toHaveBeenNthCalledWith<[String]>(1, "Role");
        expect(whereSpy).toHaveBeenNthCalledWith<[String, Object]>(1, "role.role=:role", {role: RoleType.USER});
        expect(mockedFindByRoleSpy).toHaveBeenNthCalledWith<[]>(1);
    });

    test('Should throw AuthServiceException, when finding by role is failed', async () => {
        mockedFindByRoleSpy.mockRejectedValue('');

        await expect(RoleRepositoryInstance.findByRole(RoleType.USER))
        .rejects.toThrow(new AuthServiceException("Error occurred when finding role by rolename from DB"));
        expect(createQueryBuilderSpy).toHaveBeenNthCalledWith<[]>(1);
        expect(selectSpy).toHaveBeenNthCalledWith<[String]>(1, "Role");
        expect(whereSpy).toHaveBeenNthCalledWith<[String, Object]>(1, "role.role=:role", {role: RoleType.USER});
        expect(mockedFindByRoleSpy).toHaveBeenNthCalledWith<[]>(1);
    })
})