import { Movement, Prisma, User } from "@prisma/client";

/**
 * Interfaz base que define las operaciones CRUD estándar para cualquier repositorio.
 * Toda entidad debe implementar estos métodos.
 * 
 * @template T - Tipo de la entidad (ej: User, Movement)
 * @template CreateInput - Tipo de datos requerido para crear la entidad
 * @template UpdateInput - Tipo de datos requerido para actualizar la entidad
 */
export interface IBaseRepository<T, CreateInput, UpdateInput> {
  /** Obtiene todas las entidades */
  findAll(): Promise<T[]>;

  /** Busca una entidad por su ID */
  findById(id: string): Promise<T | null>;

  /** Crea una nueva entidad */
  create(data: CreateInput): Promise<T>;

  /** Actualiza una entidad existente */
  update(id: string, data: UpdateInput): Promise<T>;

  /** Elimina una entidad */
  delete(id: string): Promise<T>;
}

/**
 * Interfaz específica para el repositorio de Movement.
 * Extiende IBaseRepository con métodos de búsqueda específicos de movimientos.
 */
export interface IMovementRepository extends IBaseRepository<Movement, Prisma.MovementCreateInput, Prisma.MovementUpdateInput> {
  /** Busca todos los movimientos de un usuario específico, ordenados por fecha descendente */
  findByUserId(userId: string): Promise<Movement[]>;

  /** Obtiene los totales agregados (balance total y conteo) */
  getTotals(): Promise<{ totalBalance: number; totalCount: number }>;
}
/**
 * Interfaz específica para el repositorio de User.
 */
export interface IUserRepository extends IBaseRepository<User, Prisma.UserCreateInput, Prisma.UserUpdateInput> {
  /** Busca un usuario por su correo electrónico */
  findByEmail(email: string): Promise<User | null>;
}
