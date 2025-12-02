import { Inject, Injectable } from '@nestjs/common';
import { General } from '../business/interfaces/core.interface';
import { DataSource, EntityManager, QueryBuilder } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CoreService {
  @Inject(CACHE_MANAGER) cacheManager: Cache;
  protected filter: General = {};
  protected appDataSource: DataSource;
  private resetFilter() {
    this.filter = {};
  }

  public filterBy(filter: General) {
    this.resetFilter();
    this.filter = {
      where: {
        ...filter,
      },
    };

    return this;
  }

  public relationBy(relation: General) {
    this.filter = {
      ...this.filter,
      relations: {
        ...relation,
      },
    };

    return this;
  }

  public relationByV1(relation: General, filter: General) {
    this.filter = {
      ...filter,
      relations: {
        ...relation,
      },
    };

    return this;
  }

  public nestedRelationBy(relations: General) {
    if (!this.filter.where) {
      this.resetFilter();
    }
    this.filter = {
      ...this.filter,
      relations: relations
    }

    return this;
  }

  public selectBy(selection: String[]) {
    if (!this.filter.where) {
      this.resetFilter();
    }
    this.filter = {
      ...this.filter,
      select: selection,
    };

    return this;
  }

  public orderBy(order: General) {
    this.filter = {
      ...this.filter,
      order: {
        ...order,
      },
    };

    return this;
  }

  public take(count: number) {
    if (!this.filter.where) {
      this.resetFilter();
    }
    this.filter = {
      ...this.filter,
      take: count,
    };
    return this;
  }

  public skip(count: number) {
    if (!this.filter.where) {
      this.resetFilter();
    }
    this.filter = {
      ...this.filter,
      skip: count,
    };
    return this;
  }

  public async find(entity: any) {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const response: any = await queryRunner.manager.find(entity, this.filter);
      return response;
    } catch (error) {
      throw error;
    } finally {
      if (!this.filter.where) {
        this.resetFilter();
      }
      await queryRunner.release();
    }
  }

  public async findV1(entity: any, filter: General) {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const response: any = await queryRunner.manager.find(entity, { order: { created_at: 'DESC' }, ...filter });
      return response;
    } catch (error) {
      throw error;
    } finally {
      this.resetFilter();
      await queryRunner.release();
    }
  }

  public async findUnordered(entity: any, filter: General) {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const response: any = await queryRunner.manager.find(entity, filter);
      return response;
    } catch (error) {
      throw error;
    } finally {
      this.resetFilter();
      await queryRunner.release();
    }
  }

  public async findOne(entity: any) {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const response: any = await queryRunner.manager.findOne(
        entity,
        this.filter,
      );
      return response;
    } catch (error) {
      throw error;
    } finally {
      this.resetFilter();
      await queryRunner.release();
    }
  }

  public async findOneV1(entity: any, filter: General) {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const response: any = await queryRunner.manager.findOne(
        entity,
        filter,
      );
      return response;
    } catch (error) {
      throw error;
    } finally {
      this.resetFilter();
      await queryRunner.release();
    }
  }

  public async findAndCount(entity: any, filter: General) {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const response: any = await queryRunner.manager.findAndCount(entity, filter);
      return response;
    } catch (error) {
      throw error;
    } finally {
      this.resetFilter();
      await queryRunner.release();
    }
  }

  public async save(entity: any, data: any) {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const response: any = await queryRunner.manager.save(entity, data);
      return response;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async update(entity: any, id: number, data: any) {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const response: any = await queryRunner.manager.update(entity, id, data);
      return response;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async remove(entity: any, id: number) {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const response: any = await queryRunner.manager.delete(entity, id);
      return response;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async runTransaction(execute: (manager: EntityManager) => void) {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const response: any = await execute(queryRunner.manager);
      await queryRunner.commitTransaction();
      return response;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async runQuery(query: string) {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const response: any = await queryRunner.query(query);
      return response;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async fetchCacheKey(key: string) {
    console.log('fetching cache key :', key);
    return this.cacheManager.get(key);
  }

  public async setCacheKey(key: string, data: any, expirySeconds?: number) {
    // console.log('setting cache key :', key, data);
    return this.cacheManager.set(
      key,
      data,
      expirySeconds ? expirySeconds * 1000 : 60 * 60 * 1000,
    );
  }

  public async getColumnsValue(entity: any, columns: string[]) {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const query = `SELECT ${columns.join(', ')} FROM ${entity};`;
      const response: any = await queryRunner.query(query);
      return response;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async deleteCacheKey(key: string) {
    console.log(`deleting cache key : ${key} `);
    return this.cacheManager.del(key);
  }

  public async fetchAllCacheKeys(pattern?: string) {
    return this.cacheManager.store.keys(pattern);
  }

  public async fetchBulkCachedData(...keys: string[]) {
    return this.cacheManager.store.mget(...keys);
  }

  public async deleteBulkCachedData(...keys: string[]) {
    return this.cacheManager.store.mdel(...keys);
  }

  async checkForNextPage(entity: any, filter: General, page: number, limit: number) {
    const offset = (page - 1) * limit;

    return this.findAndCount(entity, {
      ...filter,
      ...(!!offset && { skip: offset }),
      ...(!!limit && { take: Number(limit) + 1 }),
    });
  }

  async findPaginated(entity: any, filter: General, page: number, limit: number): Promise<any> {
    const offset = (page - 1) * limit;

    const [nextPageData] = await this.checkForNextPage(entity, filter, page, limit);

    const [paginatedData, count] = await this.findAndCount(entity, {
      order: {
        created_at: 'DESC'
      },
      ...filter,
      ...(!!offset && { skip: offset }),
      ...(!!limit && { take: limit }),
    });

    return ([
      paginatedData,
      count,
      nextPageData.length > paginatedData.length
    ])
  }

  async paginatedResult<T>(queryBuilder: any, page: number, limit: number): Promise<[T[], number, boolean]> {
    const take = limit ? limit : null;
    const skip = page ? (page - 1) * take : null;

    // Pagination
    queryBuilder.take(take).skip(skip);

    // Execute the query
    const data = await queryBuilder.getMany();
    const count = await queryBuilder.getCount();

    // Get one more data to check if next page exist
    queryBuilder.take(Number(take) + 1).skip(skip)
    const nextPageData = await queryBuilder.getMany()

    const hasNextPage = nextPageData.length > data.length;

    return [data, count, hasNextPage]
  }

  async paginatedResultV2(queryBuilder: any, page: number = 1, limit: number = 10): Promise<[any, number, boolean]> {
    const offset = (page - 1) * limit;
    const paginatedQueryBuilder = queryBuilder.clone();
    paginatedQueryBuilder.limit(limit).offset(offset);

    const data = await paginatedQueryBuilder.getRawMany();
    const countQueryBuilder = queryBuilder.clone();
    const count = await countQueryBuilder.getCount();
    const nextPageQueryBuilder = queryBuilder.clone();
    nextPageQueryBuilder.limit(Number(limit) + 1).offset(offset);
    const nextPageData = await nextPageQueryBuilder.getRawMany();
    const hasNextPage = nextPageData.length > data.length;

    return [data, count, hasNextPage];
  }

}
