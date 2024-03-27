import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';

import { RepositoryBase } from '../../../libs/base/repository.base';
import {
  EntityProps,
  IDomainEntityBase,
} from '../../../libs/base/domain.entity.base';
import { PostEntity } from './post.entity';
import { PostMapper } from './post.mapper';

@Injectable()
export class PostRepository implements RepositoryBase<PostEntity> {
  constructor(
    @InjectRepository(PostEntity)
    private readonly _userRepository: Repository<PostEntity>,
    private readonly _mapper: PostMapper,
  ) {}

  async save(
    props: IDomainEntityBase<PostEntity>,
  ): Promise<IDomainEntityBase<PostEntity>> {
    return this._userRepository.manager.transaction(async (manager) => {
      const entity = await manager.save(this._mapper.toOrmProps(props));

      return this._mapper.toDomainProps(entity);
    });
  }
  async findOneById(id: string): Promise<IDomainEntityBase<PostEntity>> {
    const entity = await this._userRepository.findOne({
      where: { id },
      relations: ['comments'],
    });

    return entity ? this._mapper.toDomainProps(entity) : null;
  }

  async update(
    conditions: FindOptionsWhere<PostEntity>,
    fields: Partial<EntityProps<PostEntity>>,
  ): Promise<UpdateResult> {
    return this._userRepository.update(conditions, fields);
  }

  delete(id: string): Promise<DeleteResult> {
    return this._userRepository.delete(id);
  }

  async find(query?: FindManyOptions<PostEntity>) {
    const entities = await this._userRepository.find(query);

    return entities.map((entity) => this._mapper.toDomainProps(entity));
  }
}
