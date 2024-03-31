import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindOptionsWhere,
  UpdateResult,
  DeleteResult,
  FindManyOptions,
} from 'typeorm';

import { IDomainEntityBase, EntityProps } from '@libs/base/domain.entity.base';
import { RepositoryBase } from '@libs/base/repository.base';
import { BlogEntity } from '@app/blog/database/blog.entity';
import { BlogMapper } from '@app/blog/database/blog.mapper';

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
  async findOneById(
    id: string,
    userId?: string,
  ): Promise<IDomainEntityBase<BlogEntity>> {
    const query: { id: string; user?: { id: string } } = {
      id,
    };

    if (userId) {
      query.user.id = userId;
    }
    const entity = await this._blogRepository.findOne({
      where: query,
      relations: ['posts', 'users'],
    });

    return entity ? this._mapper.toDomainProps(entity) : null;
  }

  async update(
    conditions: FindOptionsWhere<BlogEntity>,
    fields: Partial<EntityProps<BlogEntity>>,
  ): Promise<UpdateResult> {
    return this._blogRepository.update(conditions, fields);
  }

  delete(id: string, userId: string): Promise<DeleteResult> {
    return this._blogRepository.delete({ id, user: { id: userId } });
  }

  async find(query?: FindManyOptions<BlogEntity>) {
    const entities = await this._blogRepository.find(query);

    return entities.map((entity) => this._mapper.toDomainProps(entity));
  }
}
