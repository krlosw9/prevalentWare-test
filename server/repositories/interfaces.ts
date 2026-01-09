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
