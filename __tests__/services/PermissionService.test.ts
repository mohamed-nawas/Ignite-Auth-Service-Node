import Permission from "../../src/entities/Permission";
import { EntityProperty } from "../../src/enums/EntityProperty";
import { PermissionAlreadyExistsException } from "../../src/exceptions/PermissionAlreadyExistsException";
import { PermissionNotFoundException } from "../../src/exceptions/PermissionNotFoundException";
import { PermissionRepository } from "../../src/repository/PermissionRepository";
import { PermissionService } from "../../src/services/PermissionService";



jest.mock('../../src/repository/PermissionRepository', () => {
    return {
        PermissionRepository: jest.fn(),
    }
});



const permission = new Permission();
permission.setProperty(EntityProperty.ID, "pid-123");
let mockedPermissionRepository: jest.Mock;
let PermissionServiceInstance: PermissionService;
mockedPermissionRepository = PermissionRepository as jest.Mock;



describe('PermissionService, createPermission method test', () => {
    let mockedFindByPermission: jest.Mock;
    let mockedSave: jest.Mock;

    beforeEach(() => {
        mockedFindByPermission = jest.fn();
        mockedSave = jest.fn();
        mockedPermissionRepository.mockReturnValue({
            save: mockedSave,
            findByPermission: mockedFindByPermission,
        });
        PermissionServiceInstance = new PermissionService();
    });

    test('Should create permission, when creating permission is successful', async () => {
        mockedFindByPermission.mockResolvedValue(null);

        await PermissionServiceInstance.createPermission(permission);
        expect(mockedFindByPermission).toHaveBeenNthCalledWith<[String]>(1, permission.getProperty(EntityProperty.PERMISSION));
        expect(mockedSave).toHaveBeenNthCalledWith<[Permission]>(1, permission);
        // expect(mockedFindByPermission).toHaveBeenCalledBefore(mockedSave);
    });

    test('Should throw PermissionAlreadyExistsException, when creating permission for permission already exists', async () => {
        mockedFindByPermission.mockResolvedValue(permission);

        await expect(PermissionServiceInstance.createPermission(permission))
        .rejects.toThrow(new PermissionAlreadyExistsException("Permission already exists"));
        expect(mockedFindByPermission).toHaveBeenNthCalledWith<[String]>(1, permission.getProperty(EntityProperty.PERMISSION));
        expect(mockedSave).not.toBeCalled();
    })
})

describe('PermissionService, findByPermission method test', () => {
    let mockedFindByPermission: jest.Mock;

    beforeEach(() => {
        mockedFindByPermission = jest.fn();
        mockedPermissionRepository.mockReturnValue({
            findByPermission: mockedFindByPermission,
        });
        PermissionServiceInstance = new PermissionService();
    });

    test('Should find by permission, when finding by permission is successful', async () => {
        mockedFindByPermission.mockResolvedValue(permission);

        await PermissionServiceInstance.findByPermission(permission.getProperty(EntityProperty.PERMISSION));
        expect(mockedFindByPermission).toHaveBeenNthCalledWith<[String]>(1, permission.getProperty(EntityProperty.PERMISSION));
    });

    test('Should throw PermissionNotFoundException, when finding by permission for permission not found', async () => {
        mockedFindByPermission.mockResolvedValue(null);

        await expect(PermissionServiceInstance.findByPermission(permission.getProperty(EntityProperty.PERMISSION)))
        .rejects.toThrow(new PermissionNotFoundException("Permission not found for the given permission name: " + permission.getProperty(EntityProperty.PERMISSION)));
        expect(mockedFindByPermission).toHaveBeenNthCalledWith<[String]>(1, permission.getProperty(EntityProperty.PERMISSION));
    })
})