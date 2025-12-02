import { General } from '../business/interfaces/core.interface';

export abstract class IGenericRepository<T> {
  get?(id: number): Promise<T>;
  create?(item: T): Promise<T>;
  update?(id: number, item: T): Promise<T>;
  getAll?(page?: number, limit?: number): Promise<T[]>;
  softDelete?(id: string | number): Promise<T>;
  delete?(id: number): Promise<void>;
  findBy?(filter: General): Promise<T[]>;
}