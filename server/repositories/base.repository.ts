import { IBaseRepository } from './interfaces';

/**
 * Interfaz que define los métodos estándar y nativos de Prisma para un modelo.
 * Actúa como contrato entre la clase base y los modelos de Prisma.
 * 
 * @template T - El tipo de la entidad (ej: User, Movement)
 * @template CreateInput - El tipo de datos para crear la entidad
 * @template UpdateInput - El tipo de datos para actualizar la entidad
 */
type PrismaDelegate<T, CreateInput, UpdateInput> = {
  findMany: (args?: any) => Promise<T[]>;
  findUnique: (args: { where: { id: string } }) => Promise<T | null>;
  create: (args: { data: CreateInput }) => Promise<T>;
  update: (args: { where: { id: string }; data: UpdateInput }) => Promise<T>;
  delete: (args: { where: { id: string } }) => Promise<T>;
};

/**
 * Clase base abstracta que proporciona operaciones CRUD estándar.
 * Toda entidad (User, Movement, etc.) debe extender esta clase.
 * 
 * @template T - Tipo de la entidad
 * @template CreateInput - Tipo para creación
 * @template UpdateInput - Tipo para actualización
 */
export abstract class BaseRepository<T, CreateInput, UpdateInput>
  implements IBaseRepository<T, CreateInput, UpdateInput> {
  /**
   * @param delegate - Referencia a los métodos de Prisma del modelo específico
   */
  constructor(protected delegate: PrismaDelegate<T, CreateInput, UpdateInput>) { }

  /**
   * Obtiene todas las entidades.
   * @returns Array de todas las entidades
   */
  async findAll(): Promise<T[]> {
    return this.delegate.findMany();
  }

  /**
   * Busca una entidad por ID.
   * @param id - ID único de la entidad
   * @returns La entidad encontrada o null si no existe
   */
  async findById(id: string): Promise<T | null> {
    return this.delegate.findUnique({
      where: { id },
    });
  }

  /**
   * Crea una nueva entidad.
   * @param data - Datos para crear la entidad
   * @returns La entidad creada con ID asignado
   */
  async create(data: CreateInput): Promise<T> {
    return this.delegate.create({
      data,
    });
  }

  /**
   * Actualiza una entidad existente.
   * @param id - ID de la entidad a actualizar
   * @param data - Datos a actualizar (campos parciales permitidos)
   * @returns La entidad actualizada
   */
  async update(id: string, data: UpdateInput): Promise<T> {
    return this.delegate.update({
      where: { id },
      data,
    });
  }

  /**
   * Elimina una entidad.
   * @param id - ID de la entidad a eliminar
   * @returns La entidad eliminada
   */
  async delete(id: string): Promise<T> {
    return this.delegate.delete({
      where: { id },
    });
  }
}
