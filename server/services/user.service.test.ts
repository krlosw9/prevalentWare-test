import { describe, expect, it, mock, beforeEach } from "bun:test";
import { UserService } from "./user.service";
import { IUserRepository } from "../repositories/interfaces";
import { User, Role } from "@prisma/client";

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: IUserRepository;

  const mockUser: User = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    emailVerified: true,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: Role.ADMIN,
    phone: '123456789',
  };

  beforeEach(() => {
    mockUserRepository = {
      findAll: mock(() => Promise.resolve([mockUser])),
      findById: mock((id: string) => Promise.resolve(id === '1' ? mockUser : null)),
      findByEmail: mock(() => Promise.resolve(null)),
      create: mock((data: any) => Promise.resolve({ id: '1', ...data } as any)),
      update: mock((id, data) => Promise.resolve({ ...mockUser, ...data } as any)),
      delete: mock(() => Promise.resolve(mockUser)),
    } as unknown as IUserRepository;

    userService = new UserService(mockUserRepository);
  });

  it('should return all users', async () => {
    const users = await userService.getUsers();

    expect(users).toHaveLength(1);
    expect(users[0]).toEqual(mockUser);
    expect(mockUserRepository.findAll).toHaveBeenCalled();
  });

  it('should throw error if user not found by id', async () => {
    expect(userService.getUserById('non-existent')).rejects.toThrow('Usuario no encontrado');
  });

  it('should update user name and role', async () => {
    const result = await userService.updateUser('1', { name: 'Updated Name', role: Role.USER });

    expect(result.name).toBe('Updated Name');
    expect(result.role).toBe(Role.USER);
    expect(mockUserRepository.update).toHaveBeenCalled();
  });

  it('should throw error if update name is empty', async () => {
    expect(userService.updateUser('1', { name: '   ' })).rejects.toThrow('El nombre no puede estar vacío');
  });
});
