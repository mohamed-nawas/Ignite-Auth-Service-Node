import Permission from "../../src/entities/Permission";
import { EntityProperty } from "../../src/enums/EntityProperty";
import { AuthServiceException } from "../../src/exceptions/AuthServiceException";
import { PermissionRepository } from "../../src/repository/PermissionRepository";
import { getRepository } from "../../src/repository/Repository";



jest.mock('../../src/repository/Repository', () => {
    return {
        getRepository: jest.fn(),
    }
});



const permission = new Permission();
permission.setProperty(EntityProperty.ID, "pid-123");
let mockedGetRepository: jest.Mock;
let PermissionRepositoryInstance: PermissionRepository;
mockedGetRepository = getRepository as jest.Mock;



describe('PermissionRepository, save method test', () => {
    let mockedSave: jest.Mock;

    beforeEach(() => {
        mockedSave = jest.fn();
        mockedGetRepository.mockReturnValue({
            save: mockedSave,
        });
        PermissionRepositoryInstance = new PermissionRepository();
    });

    test('Should save permission, when saving permission is successful', async () => {
        mockedSave.mockResolvedValue(permission);

        await PermissionRepositoryInstance.save(permission);

        expect(mockedSave).toHaveBeenNthCalledWith<[Permission]>(1, permission);
    });

    test('Should throw AuthServiceException, when saving permission is failed', async () => {
        mockedSave.mockRejectedValue('');

        await expect(PermissionRepositoryInstance.save(permission))
        .rejects.toThrow(new AuthServiceException("Error occurred when saving a permission to DB"));

        expect(mockedSave).toHaveBeenNthCalledWith<[Permission]>(1, permission);
    })
})



describe('PermissionRepository, findByPermission method test', () => {
    let createQueryBuilderSpy: jest.Mock;
    let selectSpy: jest.Mock;
    let whereSpy: jest.Mock;
    let findByPermissionSpy: jest.Mock;

    beforeEach(() => {
        createQueryBuilderSpy = jest.fn().mockReturnThis();
        selectSpy = jest.fn().mockReturnThis();
        whereSpy = jest.fn().mockReturnThis();
        findByPermissionSpy = jest.fn();
        mockedGetRepository.mockReturnValue({
            createQueryBuilder: createQueryBuilderSpy,
            select: selectSpy,
            where: whereSpy,
            getOne: findByPermissionSpy,
        });
        PermissionRepositoryInstance = new PermissionRepository();
    });

    test('Should find by permission, when finding by permission is successful', async () => {
        findByPermissionSpy.mockResolvedValue(permission);

        const result = await PermissionRepositoryInstance.findByPermission(permission.getProperty(EntityProperty.PERMISSION));
        expect(result).toBe(permission);
        expect(result).not.toBe(null)
        // expect(result.getProperty(EntityProperty.ID)).toBe("pid-123");
        expect(createQueryBuilderSpy).toHaveBeenNthCalledWith<[]>(1);
        expect(selectSpy).toHaveBeenNthCalledWith<[String]>(1, "Permission");
        expect(whereSpy).toHaveBeenNthCalledWith<[String, Object]>(1, "permission.permission=:permission", {permission: permission.getProperty(EntityProperty.PERMISSION)});
        expect(findByPermissionSpy).toHaveBeenNthCalledWith<[]>(1);
    });

    test('Should throw AuthServiceException, when finding by permission is failed', async () => {
        findByPermissionSpy.mockRejectedValue('');

        await expect(PermissionRepositoryInstance.findByPermission(permission.getProperty(EntityProperty.PERMISSION)))
        .rejects.toThrow(new AuthServiceException("Error occurred when finding Permission by permission from DB"));
        expect(createQueryBuilderSpy).toHaveBeenNthCalledWith<[]>(1);
        expect(selectSpy).toHaveBeenNthCalledWith<[String]>(1, "Permission");
        expect(whereSpy).toHaveBeenNthCalledWith<[String, Object]>(1, "permission.permission=:permission", {permission: permission.getProperty(EntityProperty.PERMISSION)});
        expect(findByPermissionSpy).toHaveBeenNthCalledWith<[]>(1);
    })
})