import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';


import { PostEntity } from '@app/post/database/post.entity';
import { PostMapper } from '@app/post/database/post.mapper';
import { RepositoryBase } from '@libs/base/repository.base';
import { IDomainEntityBase, EntityProps } from '@libs/base/domain.entity.base';

@Injectable()
export class PostRepository implements RepositoryBase<PostEntity> {
  constructor(
    @InjectRepository(PostEntity)
    private readonly _postRepository: Repository<PostEntity>,
    private readonly _mapper: PostMapper,
  ) {}

  async save(
    props: IDomainEntityBase<PostEntity>,
  ): Promise<IDomainEntityBase<PostEntity>> {
    return this._postRepository.manager.transaction(async (manager) => {
      const entity = await manager.save(this._mapper.toOrmProps(props));

      return this._mapper.toDomainProps(entity);
    });
  }
  async findOneById(id: string): Promise<IDomainEntityBase<PostEntity>> {
    const entity = await this._postRepository.findOne({
      where: { id },
      relations: ['comments'],
    });

    return entity ? this._mapper.toDomainProps(entity) : null;
  }

  async update(
    conditions: FindOptionsWhere<PostEntity>,
    fields: Partial<EntityProps<PostEntity>>,
  ): Promise<UpdateResult> {
    return this._postRepository.update(conditions, fields);
  }

  delete(id: string): Promise<DeleteResult> {
    return this._postRepository.delete(id);
  }

  async find(query?: FindManyOptions<PostEntity>) {
    const entities = await this._postRepository.find(query);

    return entities.map((entity) => this._mapper.toDomainProps(entity));
  }
}
