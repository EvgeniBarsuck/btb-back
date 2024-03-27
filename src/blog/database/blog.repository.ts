import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RepositoryBase } from '../../../libs/base/repository.base';
import { BlogEntity } from './blog.entity';
import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import {
  EntityProps,
  IDomainEntityBase,
} from '../../../libs/base/domain.entity.base';
import { BlogMapper } from './blog.mapper';

@Injectable()
export class BlogRepository implements RepositoryBase<BlogEntity> {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly _blogRepository: Repository<BlogEntity>,
    private readonly _mapper: BlogMapper,
  ) {}

  async save(
    props: IDomainEntityBase<BlogEntity>,
  ): Promise<IDomainEntityBase<BlogEntity>> {
    return this._blogRepository.manager.transaction(async (manager) => {
      const entity = await manager.save(this._mapper.toOrmProps(props));

      return this._mapper.toDomainProps(entity);
    });
  }
  async findOneById(id: string): Promise<IDomainEntityBase<BlogEntity>> {
    const entity = await this._blogRepository.findOne({
      where: { id },
      relations: ['posts'],
    });

    return entity ? this._mapper.toDomainProps(entity) : null;
  }

  async update(
    conditions: FindOptionsWhere<BlogEntity>,
    fields: Partial<EntityProps<BlogEntity>>,
  ): Promise<UpdateResult> {
    return this._blogRepository.update(conditions, fields);
  }

  delete(id: string): Promise<DeleteResult> {
    return this._blogRepository.delete(id);
  }

  async find(query?: FindManyOptions<BlogEntity>) {
    const entities = await this._blogRepository.find(query);

    return entities.map((entity) => this._mapper.toDomainProps(entity));
  }
}
